import { useState, useEffect } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import StatsCards from "../components/StatsCards";
import GlucoseChart from "../components/GlucoseChart";
import { useGlucoseData } from "../hooks/useGlucoseData";

const API_URL = "http://localhost:5050/api/patients";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [loadingPatients, setLoadingPatients] = useState(true);

  // Fetch Patients
  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          setPatients(Array.isArray(data) ? data : []);

          // Select first patient by default if none selected
          if (data.length > 0 && !selectedPatientId) {
            setSelectedPatientId(data[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch patients", err);
      } finally {
        setLoadingPatients(false);
      }
    }
    fetchPatients();
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId);
  const deviceId = selectedPatient?.device_id;

  const { data, status, latest } = useGlucoseData(deviceId);

  // Find previous reading for trend calculation
  const previous = data.length > 1 ? data[data.length - 2] : null;

  if (loadingPatients) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  if (patients.length === 0) {
    return (
      <div className="max-w-7xl mx-auto text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">No Patients Found</h2>
        <p className="text-gray-500 mt-2">Please go to the Patients page to add a patient.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 mt-1">Real-time monitoring</p>
        </div>

        {/* Patient Selector */}
        <div className="relative">
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 pr-8 shadow-sm cursor-pointer outline-none"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <ChevronDown size={16} />
          </div>
        </div>
      </header>

      {/* Patient Info Banner */}
      {selectedPatient && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-blue-600 font-medium">Active Patient</div>
            <div className="text-lg font-bold text-gray-900">{selectedPatient.name}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-500 uppercase font-semibold tracking-wide">Device ID</div>
            <div className="font-mono text-gray-700">{selectedPatient.device_id || 'No Device Linked'}</div>
          </div>
        </div>
      )}

      {status === "error" ? (
        <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg border border-red-100">
          Failed to load data for device {deviceId}.
        </div>
      ) : !deviceId ? (
        <div className="p-8 mb-6 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-100 text-center">
          This patient does not have a linked device. Please update their profile in the Patients tab.
        </div>
      ) : (
        <>
          <StatsCards latest={latest} previous={previous} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <GlucoseChart data={data} />
            </div>

            <div className="space-y-6">
              {/* Sidebar Widgets */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Recent Alerts</h3>
                <div className="space-y-4">
                  <AlertItem type="hypo" time="10:30 AM" msg="Low Glucose (68 mg/dL)" />
                  <AlertItem type="info" time="08:00 AM" msg="Sensor Calibration Complete" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AlertItem({ type, time, msg }) {
  const colors = type === 'hypo' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100';
  return (
    <div className={`p-3 rounded-lg border ${colors} text-sm flex justify-between items-start`}>
      <span>{msg}</span>
      <span className="text-xs opacity-70 ml-2 whitespace-nowrap">{time}</span>
    </div>
  )
}
