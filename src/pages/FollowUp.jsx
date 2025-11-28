import React, { useState } from 'react';
import { Calendar, Clock, User, Plus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/Card';

export function FollowUpPage() {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', date: '2024-03-20', time: '10:00 AM', type: 'Routine Checkup', status: 'Scheduled' },
    { id: 2, patient: 'Jane Smith', date: '2024-03-21', time: '02:30 PM', type: 'Diet Consultation', status: 'Scheduled' },
    { id: 3, patient: 'Robert Brown', date: '2024-03-18', time: '11:15 AM', type: 'Lab Review', status: 'Completed' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAppt, setNewAppt] = useState({ patient: '', date: '', time: '', type: 'Routine Checkup' });

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!newAppt.patient || !newAppt.date || !newAppt.time) return;
    
    setAppointments([
      ...appointments,
      { ...newAppt, id: Date.now(), status: 'Scheduled' }
    ]);
    setShowForm(false);
    setNewAppt({ patient: '', date: '', time: '', type: 'Routine Checkup' });
  };

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-800">Follow-up Appointments</div>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
            >
              <Plus size={16} /> Schedule New
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <form onSubmit={handleSchedule} className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  placeholder="Patient Name"
                  className="p-2 rounded-lg border border-gray-300"
                  value={newAppt.patient}
                  onChange={e => setNewAppt({...newAppt, patient: e.target.value})}
                />
                <input
                  type="date"
                  className="p-2 rounded-lg border border-gray-300"
                  value={newAppt.date}
                  onChange={e => setNewAppt({...newAppt, date: e.target.value})}
                />
                <input
                  type="time"
                  className="p-2 rounded-lg border border-gray-300"
                  value={newAppt.time}
                  onChange={e => setNewAppt({...newAppt, time: e.target.value})}
                />
                <select
                  className="p-2 rounded-lg border border-gray-300"
                  value={newAppt.type}
                  onChange={e => setNewAppt({...newAppt, type: e.target.value})}
                >
                  <option>Routine Checkup</option>
                  <option>Diet Consultation</option>
                  <option>Lab Review</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {appointments.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${appt.status === 'Completed' ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-blue-600'}`}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{appt.patient}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock size={14} /> {appt.date} at {appt.time}</span>
                      <span className="flex items-center gap-1"><User size={14} /> {appt.type}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appt.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                }`}>
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
