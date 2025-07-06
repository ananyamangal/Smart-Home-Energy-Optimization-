import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function POST(req: Request) {
  const body = await req.json()
  const { type } = body

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  try {
    let query = ''

    switch (type) {
      case 'total_today':
        query = `SELECT SUM(power_consumption) AS result FROM device_usage_log WHERE DATE(timestamp) = '2024-01-01';`
        break

      case 'average_usage':
        query = `SELECT AVG(power_consumption) AS result FROM device_usage_log;`
        break

      case 'total_week':
        query = `SELECT SUM(power_consumption) AS result FROM device_usage_log WHERE YEARWEEK(timestamp, 1) = YEARWEEK(CURDATE(), 1);`
        break

      case 'peak_hour':
        query = `
          SELECT 
            HOUR(timestamp) AS hour,
            SUM(power_consumption) AS total_power
          FROM device_usage_log
          WHERE DATE(timestamp) = '2024-01-01'
          GROUP BY hour
          ORDER BY total_power DESC
          LIMIT 1;
        `
        break

      case 'active_devices':
        const totalDevicesQuery = 'SELECT COUNT(DISTINCT device_id) AS total_devices FROM devices;'
        const activeDevicesQuery = `
          SELECT COUNT(DISTINCT device_id) AS active_devices
          FROM device_usage_log
          WHERE DATE(timestamp) = '2024-01-01' AND device_status = 1;
        `

        const [totalDevicesRows] = await connection.execute(totalDevicesQuery)
        const [activeDevicesRows] = await connection.execute(activeDevicesQuery)

        if (totalDevicesRows && activeDevicesRows) {
          const totalDevices = (totalDevicesRows as [{ total_devices: number }])[0]?.total_devices || 0
          const activeDevices = (activeDevicesRows as [{ active_devices: number }])[0]?.active_devices || 0

          return NextResponse.json({ totalDevices, activeDevices })
        } else {
          return NextResponse.json({ error: 'No data found for device counts' }, { status: 404 })
        }

      case 'estimated_cost':
        query = `
          SELECT power_consumption, 
                 CASE 
                   WHEN HOUR(timestamp) BETWEEN 18 AND 23 THEN 1 
                   ELSE 0 
                 END AS is_peak_hour
          FROM device_usage_log
          WHERE DATE(timestamp) = '2024-01-01';
        `

        const [costRows] = await connection.execute(query)
        const typedCostRows = costRows as Array<{ power_consumption: number, is_peak_hour: number }>

        let totalCost = 0
        typedCostRows.forEach((row) => {
          const rate = row.is_peak_hour === 1 ? 10 : 5
          totalCost += row.power_consumption * rate
        })

        await connection.end()
        return NextResponse.json({ estimatedCost: totalCost.toFixed(2) })

      case 'hourly_usage':
        query = `
          SELECT 
            HOUR(timestamp) AS hour, 
            SUM(power_consumption) AS consumption
          FROM device_usage_log
          WHERE DATE(timestamp) = CURDATE()
          GROUP BY hour
          ORDER BY hour;
        `
        const [hourlyRows] = await connection.execute(query)
        const hourlyData = (hourlyRows as Array<{ hour: number; consumption: number }>)
          .map((row) => ({
            hour: `${row.hour % 12 || 12} ${row.hour < 12 ? 'AM' : 'PM'}`,
            consumption: row.consumption || 0,
          }))

        await connection.end()
        return NextResponse.json({ hourlyData })

      case 'usage_by_room':
        query = `
          SELECT r.room_name AS room, 
                 ROUND(SUM(dul.power_consumption), 2) AS consumption
          FROM device_usage_log dul
          JOIN devices d ON dul.device_id = d.device_id
          JOIN rooms r ON d.room_id = r.room_id
          WHERE DATE(dul.timestamp) = '2024-01-01'
          GROUP BY r.room_name
          ORDER BY consumption DESC;
        `
        const [roomUsageRows] = await connection.execute(query)
        await connection.end()
        return NextResponse.json({ roomData: roomUsageRows })

      case 'usage_by_device':
        query = `
          SELECT d.device_name AS device, 
                 ROUND(SUM(dul.power_consumption), 2) AS consumption
          FROM device_usage_log dul
          JOIN devices d ON dul.device_id = d.device_id
          WHERE DATE(dul.timestamp) = '2024-01-01'
          GROUP BY d.device_name
          ORDER BY consumption DESC;
        `
        const [deviceUsageRows] = await connection.execute(query)
        await connection.end()
        return NextResponse.json({ deviceData: deviceUsageRows })

      case 'latest_devices':
        query = `
          SELECT 
            d.device_id AS id,
            d.device_name AS name,
            r.room_name AS room,
            COALESCE(latest.power_consumption, 0) AS consumption,
            CASE WHEN latest.device_status = 1 THEN 'Active' ELSE 'Off' END AS status
          FROM devices d
          JOIN rooms r ON d.room_id = r.room_id
          LEFT JOIN (
            SELECT dul1.device_id, dul1.power_consumption, dul1.device_status, dul1.timestamp
            FROM device_usage_log dul1
            JOIN (
              SELECT device_id, MAX(timestamp) AS max_time
              FROM device_usage_log
              GROUP BY device_id
            ) dul2 ON dul1.device_id = dul2.device_id AND dul1.timestamp = dul2.max_time
          ) latest ON d.device_id = latest.device_id
          ORDER BY RAND()
          LIMIT 8;
        `

        const [latestDevices] = await connection.execute(query)
        await connection.end()
        return NextResponse.json({ devices: latestDevices })

      case 'monthly_usage':
        query = `
          SELECT 
            DATE_FORMAT(timestamp, '%b') AS month,
            SUM(power_consumption) AS usage
          FROM device_usage_log
          GROUP BY MONTH(timestamp)
          ORDER BY MONTH(timestamp)
        `
        const [monthlyRows] = await connection.execute(query)

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const usageMap = new Map((monthlyRows as any[]).map(row => [row.month, Math.round(row.usage || 0)]))

        const monthlyData = months.map(month => ({
          name: month,
          usage: usageMap.get(month) || 0,
        }))

        await connection.end()
        return NextResponse.json({ monthlyData })

      default:
        return NextResponse.json({ error: 'Unknown query type' }, { status: 400 })
    }

    const [rows] = await connection.execute(query)
    await connection.end()

    if (type === 'peak_hour') {
      const peakData = rows as { hour: number; total_power: number }[]
      if (peakData.length > 0) {
        return NextResponse.json({ hour: peakData[0].hour, power: peakData[0].total_power })
      } else {
        return NextResponse.json({ error: 'No peak hour data available' }, { status: 404 })
      }
    }

    const result = (rows as { result: number }[])[0]?.result
    if (result !== undefined) {
      return NextResponse.json({ result })
    } else {
      return NextResponse.json({ error: 'No data found' }, { status: 404 })
    }

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
