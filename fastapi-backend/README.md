# FastAPI Backend for Smart Home Energy Optimization

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Copy `.env.example` to `.env` and fill in your MySQL credentials:
   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```

3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at http://localhost:8000

## Endpoints

- `GET /api/devices`
- `GET /api/rooms`
- `GET /api/environmental_data`
- `GET /api/device_info`
- `GET /api/external_weather_log`
- `GET /api/user_preferences`
- `GET /api/occupancy_log`
- `POST /api/device_usage_log` (with JSON body `{ "type": ... }`)

See `main.py` for details. 