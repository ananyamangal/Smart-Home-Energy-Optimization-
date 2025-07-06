import mysql.connector
import pandas as pd

def add_future_usage_label(df_future):
    # Predict next hour's power consumption per device
    df_future = df_future.sort_values(['device_id', 'timestamp'])
    df_future['next_hour_power_consumption'] = df_future.groupby('device_id')['power_consumption'].shift(-1)

    # Drop rows with missing label
    df_future_labeled = df_future.dropna(subset=['next_hour_power_consumption'])
    return df_future_labeled


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

df['timestamp'] = pd.to_datetime(df['timestamp'])
df = df.sort_values(['device_id', 'timestamp'])  

df['day_of_week'] = df['timestamp'].dt.day_name()
df['hour'] = df['timestamp'].dt.hour
df['is_weekend'] = df['day_of_week'].isin(['Saturday', 'Sunday']).astype(int)

df.rename(columns={'occupancy_count': 'occupancy'}, inplace=True)

# prev_hour_usage per device
df['prev_hour_usage'] = df.groupby('device_id')['power_consumption'].shift(1)

# 3-hour rolling average (excluding current hour)
df['rolling_avg_3hr'] = df.groupby('device_id')['power_consumption'].shift(1).rolling(window=3, min_periods=1).mean()

# 24-hour rolling average (excluding current hour)
df['rolling_avg_24hr'] = df.groupby('device_id')['power_consumption'].shift(1).rolling(window=24, min_periods=1).mean()

final_df = df[[
    'timestamp', 'device_id', 'device_type', 'room_id',
    'power_consumption', 'occupancy', 'temperature', 'humidity',
    'weather_condition', 'day_of_week', 'hour', 'is_weekend',
    'prev_hour_usage', 'rolling_avg_3hr', 'rolling_avg_24hr'
]]

final_df = final_df.dropna()

print(final_df.head())

future_cosumption_df=add_future_usage_label(final_df)

# Optionally save to CSV
# future_cosumption_df.to_csv("future_usage_prediction_dataset.csv", index=False)

cursor.close()
db.close()
