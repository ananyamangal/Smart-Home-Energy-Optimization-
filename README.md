# SYNERGY: Smart Home Energy Optimization System

SYNERGY is a data-driven smart home energy optimization system that leverages real-time IoT sensing, machine learning, and intelligent recommendations to reduce energy waste and promote sustainable living.

## 🚀 Features

- **Real-Time Monitoring**  
  Uses a network of IoT sensors to track energy usage, occupancy, and environmental conditions (temperature, humidity, etc.).

- **Predictive Analytics**
  - **Energy Forecasting**: Predicts future energy usage of individual appliances.
  - **Peak Load Detection**: Identifies high-consumption periods and suggests load balancing strategies.
  - **Anomaly Detection**: Detects unusual energy behavior (e.g., unused devices consuming power).

- **AI-Powered Recommendations**  
  Provides intelligent, context-aware suggestions for reducing energy consumption, powered by integration with large language models.

- **Interactive Dashboard**  
  Real-time web interface (built with Next.js) that visualizes energy data and system insights.
<img width="408" alt="Screenshot 2025-06-15 at 3 02 20 PM" src="https://github.com/user-attachments/assets/340e5349-d293-4dc2-9005-472ad3bddd54" /><img width="440" alt="Screenshot 2025-06-15 at 3 02 53 PM" src="https://github.com/user-attachments/assets/0325d82a-1b16-4619-8db5-557f58934cf1" />
<img width="432" alt="Screenshot 2025-06-15 at 3 03 10 PM" src="https://github.com/user-attachments/assets/7fb6430b-3a3c-4230-829f-8f243e719086" />



## 🧠 System Architecture

- **Data Collection**  
  IoT sensors feed continuous data into a central MySQL database.

- **Machine Learning Backend**  
  Models built using Scikit-learn and XGBoost (serialized with Joblib) handle forecasting, anomaly detection, and optimization.

- **API Layer**  
  RESTful APIs connect the backend, ML models, and frontend for seamless data flow.

- **Frontend**  
  Built with Next.js to display real-time visualizations and user interactions.
  <img width="924" alt="Screenshot 2025-06-15 at 3 02 37 PM" src="https://github.com/user-attachments/assets/ca6e599f-7838-4689-89b3-a44ad0802c36" />


- Multi-language support for accessibility.
- Integration with Alexa, Google Home, and other smart assistants.

## 📂 Project Structure

