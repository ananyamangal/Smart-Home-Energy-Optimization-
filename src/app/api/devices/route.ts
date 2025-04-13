// app/api/devices/route.ts

import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute('SELECT * FROM devices');
    await connection.end();

    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('MySQL error:', error.message);  // More detailed message
    console.error('Stack trace:', error.stack);   // Stack trace for debugging
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
