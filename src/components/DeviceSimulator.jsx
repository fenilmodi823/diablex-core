import React, { useState } from 'react';
import { UploadCloud, Power } from 'lucide-react';
import { Card, CardHeader, CardContent } from './Card';
import { DeviceBus } from '../lib/deviceBus';
import { api } from '../lib/api';

export function DeviceSimulator({ patients }) {
  const [form, setForm] = useState({
    patientId: patients[0]?._id ?? '', // Use _id for MongoDB
    value: 120,
    tag: 'Post-Meal',
  });
  const send = async () => {
    const p = patients.find((x) => x._id === form.patientId);
    if (!p) return;
    
    const payload = {
      patientId: p._id,
      value: Number(form.value),
      tag: form.tag,
      ts: Date.now(),
    };

    try {
      await api.sendReading(payload);
      // Also push to bus for immediate UI update
      DeviceBus.push({ 
        type: 'reading', 
        payload: { ...payload, id: Date.now().toString(), name: p.name } 
      });
      alert('Reading sent to database!');
    } catch (err) {
      console.error('Failed to send reading', err);
      alert('Failed to send reading');
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <UploadCloud size={18} /> Device Ingest Simulator
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Use this to simulate your connected glucometer posting encrypted JSON.
          New readings appear instantly across the dashboard.
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-4 gap-3">
          <label className="text-sm">
            Patient
            <select
              className="mt-1 w-full rounded-xl bg-gray-100 px-3 py-2"
              value={form.patientId}
              onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            >
              {patients.map((p) => (
                <option value={p._id || p.id} key={p._id || p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Reading (mg/dL)
            <input
              type="number"
              className="mt-1 w-full rounded-xl bg-gray-100 px-3 py-2"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
            />
          </label>
          <label className="text-sm">
            Tag
            <select
              className="mt-1 w-full rounded-xl bg-gray-100 px-3 py-2"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
            >
              <option>Fasting</option>
              <option>Post-Meal</option>
              <option>Bedtime</option>
            </select>
          </label>
          <div className="flex items-end">
            <button
              onClick={send}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              <Power size={16} /> Send Reading
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
