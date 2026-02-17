import { useState, useEffect } from 'react';
import { Search, UserPlus, MoreVertical, Trash2, X, Save, AlertCircle } from 'lucide-react';

const API_URL = 'http://localhost:5050/api/patients';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // New Patient Form State
  const [formData, setFormData] = useState({
    name: '',
    id: '', // e.g. P-001
    age: '',
    type: 'T1D',
    deviceId: 'DX-SIM-001' // Default for demo
  });

  // Fetch Patients
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setPatients(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch patients", err);
    } finally {
      setLoading(false);
    }
  };

  // Add Patient
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Basic validation
    if (!formData.name || !formData.id) {
      setSubmitError("Name and ID are required");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to create');
      }

      // Success
      await fetchPatients();
      setIsModalOpen(false);
      setFormData({ name: '', id: '', age: '', type: 'T1D', deviceId: 'DX-SIM-001' }); // Reset
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  // Delete Patient
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}? This will remove all their data.`)) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchPatients(); // Refresh list
      } else {
        alert("Failed to delete patient");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Logic
  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center text-gray-500">Loading patients...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Patients</h2>
          <p className="text-gray-500 mt-1">Manage patient profiles and devices</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <UserPlus size={18} />
          <span>Add Patient</span>
        </button>
      </header>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search patients by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm font-medium">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Device ID</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            ) : (
              filteredPatients.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div>{u.name}</div>
                    {u.age && <div className="text-xs text-gray-400">{u.age} yrs</div>}
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{u.id}</td>
                  <td className="px-6 py-4 text-gray-500">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {u.type || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{u.device_id || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${u.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {u.status || 'Offline'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end space-x-2">
                    <button
                      onClick={() => handleDelete(u.id, u.name)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Patient"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Add New Patient</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              {submitError && (
                <div className="flex items-center p-3 text-sm text-red-800 bg-red-50 rounded-lg">
                  <AlertCircle size={16} className="mr-2" />
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g. Sarah Connor"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                  <input
                    required
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="e.g. P-100"
                    value={formData.id}
                    onChange={e => setFormData({ ...formData, id: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="e.g. 35"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diabetes Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="T1D">Type 1</option>
                    <option value="T2D">Type 2</option>
                    <option value="Gestational">Gestational</option>
                    <option value="Prediabetes">Prediabetes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device ID</label>
                  {/* Dropdown for Device Selection (Mocked for now) */}
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                    value={formData.deviceId}
                    onChange={e => setFormData({ ...formData, deviceId: e.target.value })}
                  >
                    <option value="DX-SIM-001">DX-SIM-001 (Simulator)</option>
                    <option value="DX-PRO-099">DX-PRO-099 (Prototype)</option>
                    <option value="">No Device</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  <Save size={18} />
                  <span>Save Patient</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
