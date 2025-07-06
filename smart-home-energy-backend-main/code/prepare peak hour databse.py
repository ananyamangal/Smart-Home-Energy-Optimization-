import mysql.connector
import pandas as pd
from datetime import datetime

def add_peak_hour_label(df_peak):
    # Compute total power consumption per timestamp (hour)
    hourly_consumption = df_peak.groupby('timestamp')['total_power_consumption'].first().reset_index()

    # Calculate 80th percentile threshold
    threshold = hourly_consumption['total_power_consumption'].quantile(0.8)

    # Map peak hours
    hourly_consumption['is_peak_hour'] = (hourly_consumption['total_power_consumption'] >= threshold).astype(int)

    # Merge label back to original DataFrame
    df_peak_labeled = df_peak.merge(hourly_consumption[['timestamp', 'is_peak_hour']], on='timestamp', how='left')
    return df_peak_labeled


db = mysql.connector.connect(
    host="localhost",       
    user="root",
    password="mysql",
    database="SmartHomeEnergyUsageDB"
)

cursor = db.cursor(dictionary=True)

query = """
SELECT
    d.device_id,
    d.device_type,
    d.room_id,
    dul.timestamp,
    dul.power_consumption,
    dul.device_status,
    ed.temperature,
    ed.humidity,
    ed.weather_condition,
    ol.occupancy_count
FROM device_usage_log AS dul
JOIN devices AS d ON dul.device_id = d.device_id
JOIN environmental_data AS ed ON d.room_id = ed.room_id AND DATE(dul.timestamp) = DATE(ed.timestamp) AND HOUR(dul.timestamp) = HOUR(ed.timestamp)
JOIN occupancy_log AS ol ON d.room_id = ol.room_id AND DATE(dul.timestamp) = DATE(ol.timestamp) AND HOUR(dul.timestamp) = HOUR(ol.timestamp)
"""

cursor.execute(query)
rows = cursor.fetchall()

df = pd.DataFrame(rows)

# Derived Features
df['timestamp'] = pd.to_datetime(df['timestamp'])
df['day_of_week'] = df['timestamp'].dt.day_name()
df['hour'] = df['timestamp'].dt.hour
df['is_weekend'] = df['day_of_week'].isin(['Saturday', 'Sunday']).astype(int)

# Calculate avg_device_power, total_power_consumption, and device_usage_count per timestamp
agg_df = df.groupby(['timestamp']).agg(
    avg_device_power=('power_consumption', 'mean'),
    total_power_consumption=('power_consumption', 'sum'),
    device_usage_count=('device_status', 'sum')  # count devices ON
).reset_index()

# Merge back into original dataframe
final_df = pd.merge(df, agg_df, on='timestamp', how='left')

final_df = final_df[[
    'timestamp', 'device_id', 'device_type', 'room_id',
    'power_consumption', 'occupancy_count', 'temperature', 'humidity',
    'weather_condition', 'day_of_week', 'hour', 'is_weekend',
    'avg_device_power', 'total_power_consumption', 'device_usage_count'
]]

final_df.rename(columns={'occupancy_count': 'occupancy'}, inplace=True)

print(final_df.head())

peak_hour_df=add_peak_hour_label(final_df)

# Export to CSV if needed
peak_hour_df.to_csv("peak_hour_dataset.csv", index=False)
print("code executed")
cursor.close()
db.close()
