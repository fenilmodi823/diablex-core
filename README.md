# Diablex - Connected Diabetes Care Platform

## Next-Generation Clinical Dashboard for Continuous Glucose Monitoring (CGM)

Diablex is an advanced healthcare platform designed to bridge the gap between patients and clinicians. By leveraging real-time data ingestion, intelligent analytics, and a user-centric dashboard, Diablex empowers healthcare providers to monitor diabetic patients proactively and intervene effectively.

---

## 🚀 Key Features

### 1. **Real-Time Patient Monitoring**

- **Live Glucose Stream**: Visualize glucose levels in real-time with sub-second latency.
- **Dynamic Charts**: Interactive area charts with automatic "Safe Zone" (70-180 mg/dL) highlighting.
- **Instant Alerts**: Immediate visual cues for Hypoglycemia (<70 mg/dL) and Hyperglycemia (>180 mg/dL).

### 2. **Comprehensive Patient Management**

- **Digital Health Records**: Create, update, and manage patient profiles securely.
- **Device Integration**: Link specific monitoring devices (e.g., `DX-SIM-001`) to individual patients.
- **Search & Filter**: Effortlessly find patients by name or ID with instant search.

### 3. **Clinical Analytics**

- **Trend Analysis**: Auto-calculated trends (Stable, Rising, Falling) to predict glucose trajectory.
- **Session History**: Persistent storage of patient readings for historical review.
- **Multi-User Support**: Seamlessly switch between patients to view individual data streams.

---

## 🛠 Technology Stack

Diablex is built on a robust, modern stack designed for performance and scalability.

### **Frontend** (Client-Side)

- **[React 19](https://react.dev/)**: The core UI library for building dynamic interfaces.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for lightning-fast builds.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid, custom UI development.
- **[Recharts](https://recharts.org/)**: Composable charting library for data visualization.
- **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icons.

### **Backend** (Server-Side)

- **[Node.js](https://nodejs.org/)**: JavaScript runtime for scalable network applications.
- **[Express](https://expressjs.com/)**: Minimalist web framework for API routing.
- **[SQLite](https://www.sqlite.org/)**: Lightweight, serverless, zero-configuration database engine.
- **[Socket.io](https://socket.io/)**: Real-time bidirectional event-based communication.

---

## ⚡ Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (Node Package Manager)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/fenilmodi823/diablex-core.git
    cd diablex-core
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

### Running the Application

To run the full stack (Backend + Frontend), open two terminal windows:

#### Terminal 1: Backend Server

This starts the Express API and SQLite database.

```bash
npm run server
```

#### Terminal 2: Frontend Client

This launches the React dashboard.

```bash
npm run dev
```

Open your browser to: **<http://localhost:5173>**

---

## 🧪 Testing & Simulation

Diablex includes a built-in **Device Simulator** to generate synthetic patient data.

1. **Ensure Backend is running** (`npm run server`).
2. **Run the Bridge Simulator**:

    ```bash
    $env:MOCK_MODE="1"
    node server/services/bridge.js
    ```

3. **Control the Simulation**:
    Type commands into the bridge terminal to simulate events:
    - `MEAL 60` (Simulate carb intake)
    - `INSULIN 2` (Simulate insulin dose)
    - `EXERCISE 20` (Simulate activity)

---

## 📂 Project Structure

```bash
diablex-core/
├── src/                # Frontend Source Code
│   ├── components/     # Reusable UI components (Charts, Cards)
│   ├── context/        # React Context (Auth, Global State)
│   ├── hooks/          # Custom Hooks (Data Fetching)
│   ├── pages/          # Application Pages (Dashboard, Patients)
│   └── ...
├── server/             # Backend Source Code
│   ├── api/            # API Route logic
│   ├── lib/            # Shared libraries (DB, Socket)
│   ├── routes/         # Express Routes
│   └── services/       # Microservices (Bridge, Simulator)
└── ...
```

---

## 🤝 Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for details on how to submit pull requests, report issues, and suggest improvements.

---

**Diablex** — Empowering Better Habits through Connected Care.
