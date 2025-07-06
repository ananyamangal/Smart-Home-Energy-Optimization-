from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS for local dev and deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "mysql"),
        database=os.getenv("DB_NAME", "SmartHomeEnergyUsageDB"),
        port=int(os.getenv("DB_PORT", 3306)),  # <-- Add this line!
    )
# --- Simple GET endpoints ---

@app.get("/api/devices")
def get_devices():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM devices")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/api/rooms")
def get_rooms():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM rooms")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/api/environmental_data")
def get_environmental_data():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM environmental_data")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/api/device_info")
def get_device_info():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM device_info")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/api/external_weather_log")
def get_external_weather_log():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM external_weather_log")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/api/user_preferences")
def get_user_preferences():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user_preferences")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/api/occupancy_log")
def get_occupancy_log():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM occupancy_log")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

# --- Complex POST endpoint ---

@app.post("/api/device_usage_log")
def post_device_usage_log(request: Request):
    import asyncio
    return asyncio.run(_handle_device_usage_log(request))

def _parse_row(row):
    # Helper to convert Decimal, bytes, etc. to JSON-serializable
    import decimal
    return {k: float(v) if isinstance(v, decimal.Decimal) else v for k, v in row.items()}

async def _handle_device_usage_log(request: Request):
    body = await request.json()
    type_ = body.get("type")
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        if type_ == "total_today":
            cursor.execute("SELECT SUM(power_consumption) AS result FROM device_usage_log WHERE DATE(timestamp) = '2024-01-01';")
            row = cursor.fetchone()
            return JSONResponse({"result": row["result"] if row else 0})
        elif type_ == "average_usage":
            cursor.execute("SELECT AVG(power_consumption) AS result FROM device_usage_log;")
            row = cursor.fetchone()
            return JSONResponse({"result": row["result"] if row else 0})
        elif type_ == "total_week":
            cursor.execute("SELECT SUM(power_consumption) AS result FROM device_usage_log WHERE YEARWEEK(timestamp, 1) = YEARWEEK(CURDATE(), 1);")
            row = cursor.fetchone()
            return JSONResponse({"result": row["result"] if row else 0})
        elif type_ == "peak_hour":
            cursor.execute("""
                SELECT HOUR(timestamp) AS hour, SUM(power_consumption) AS total_power
                FROM device_usage_log
                WHERE DATE(timestamp) = '2024-01-01'
                GROUP BY hour
                ORDER BY total_power DESC
                LIMIT 1;
            """)
            row = cursor.fetchone()
            if row:
                return JSONResponse({"hour": row["hour"], "power": row["total_power"]})
            else:
                return JSONResponse({"error": "No peak hour data available"}, status_code=404)
        elif type_ == "active_devices":
            cursor.execute("SELECT COUNT(DISTINCT device_id) AS total_devices FROM devices;")
            total_devices = cursor.fetchone()["total_devices"]
            cursor.execute("""
                SELECT COUNT(DISTINCT device_id) AS active_devices
                FROM device_usage_log
                WHERE DATE(timestamp) = '2024-01-01' AND device_status = 1;
            """)
            active_devices = cursor.fetchone()["active_devices"]
            return JSONResponse({"totalDevices": total_devices, "activeDevices": active_devices})
        elif type_ == "estimated_cost":
            cursor.execute("""
                SELECT power_consumption, 
                       CASE WHEN HOUR(timestamp) BETWEEN 18 AND 23 THEN 1 ELSE 0 END AS is_peak_hour
                FROM device_usage_log
                WHERE DATE(timestamp) = '2024-01-01';
            """)
            rows = cursor.fetchall()
            total_cost = 0
            for row in rows:
                rate = 10 if row["is_peak_hour"] == 1 else 5
                total_cost += row["power_consumption"] * rate
            return JSONResponse({"estimatedCost": f"{total_cost:.2f}"})
        elif type_ == "hourly_usage":
            cursor.execute("""
                SELECT HOUR(timestamp) AS hour, SUM(power_consumption) AS consumption
                FROM device_usage_log
                WHERE DATE(timestamp) = CURDATE()
                GROUP BY hour
                ORDER BY hour;
            """)
            rows = cursor.fetchall()
            hourly_data = [{
                "hour": f"{row['hour'] % 12 or 12} {'AM' if row['hour'] < 12 else 'PM'}",
                "consumption": row["consumption"] or 0
            } for row in rows]
            return JSONResponse({"hourlyData": hourly_data})
        elif type_ == "usage_by_room":
            cursor.execute("""
                SELECT r.room_name AS room, ROUND(SUM(dul.power_consumption), 2) AS consumption
                FROM device_usage_log dul
                JOIN devices d ON dul.device_id = d.device_id
                JOIN rooms r ON d.room_id = r.room_id
                WHERE DATE(dul.timestamp) = '2024-01-01'
                GROUP BY r.room_name
                ORDER BY consumption DESC;
            """)
            rows = cursor.fetchall()
            return JSONResponse({"roomData": rows})
        elif type_ == "usage_by_device":
            cursor.execute("""
                SELECT d.device_name AS device, ROUND(SUM(dul.power_consumption), 2) AS consumption
                FROM device_usage_log dul
                JOIN devices d ON dul.device_id = d.device_id
                WHERE DATE(dul.timestamp) = '2024-01-01'
                GROUP BY d.device_name
                ORDER BY consumption DESC;
            """)
            rows = cursor.fetchall()
            return JSONResponse({"deviceData": rows})
        elif type_ == "latest_devices":
            cursor.execute("""
                SELECT d.device_id AS id, d.device_name AS name, r.room_name AS room,
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
            """)
            rows = cursor.fetchall()
            return JSONResponse({"devices": rows})
        elif type_ == "monthly_usage":
            cursor.execute("""
                SELECT DATE_FORMAT(timestamp, '%b') AS month, SUM(power_consumption) AS usage
                FROM device_usage_log
                GROUP BY MONTH(timestamp)
                ORDER BY MONTH(timestamp)
            """)
            rows = cursor.fetchall()
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            usage_map = {row["month"]: round(row["usage"] or 0) for row in rows}
            monthly_data = [{"name": month, "usage": usage_map.get(month, 0)} for month in months]
            return JSONResponse({"monthlyData": monthly_data})
        else:
            return JSONResponse({"error": "Unknown query type"}, status_code=400)
    except Exception as e:
        print(e)
        return JSONResponse({"error": "Database error"}, status_code=500)
    finally:
        cursor.close()
        conn.close() 