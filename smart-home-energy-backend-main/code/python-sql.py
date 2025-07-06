import mysql.connector
import pandas as pd




conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='mysql',
    database='SmartHomeEnergyUsageDB'
)
cursor = conn.cursor()

tables=['rooms','devices',"device_usage_log",'environmental_data','occupancy_log','user_preferences','external_weather_log']

try:
    for table in tables:
        df = pd.read_csv(f'{table}.csv')
        
        cols = df.columns.tolist()
        placeholders = ', '.join(['%s'] * len(cols))  # Generates the correct number of %s placeholders
        columns_str = ', '.join([f"`{col}`" for col in cols])  # Properly format column names
        
        insert_query = f"""
            INSERT INTO `{table}` ({columns_str})
            VALUES ({placeholders})
        """
        
        # Convert DataFrame rows to list of tuples
        data = [tuple(row) for row in df.values]

        # Execute many inserts at once
        cursor.executemany(insert_query, data)
        conn.commit()

        print(f"✅ Inserted {cursor.rowcount} rows into table {table} successfully!")
except Exception as e:
    print(e)

# Cleanup
cursor.close()
conn.close()
