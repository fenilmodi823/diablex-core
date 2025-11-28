import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/Card';
import { formatTime } from '../lib/utils';
import { api } from '../lib/api';

export function PatientsPage({ state, setState, onPatientClick }) {
  const [q, setQ] = useState('');
  const filtered = state.patients.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );
  const [draft, setDraft] = useState({
    name: '',
    age: 30,
    type: 'Type 2',
    gi: 7.0,
  });
  const add = async () => {
    if (!draft.name.trim()) return;
    try {
      const newPatient = await api.addPatient({
        name: draft.name.trim(),
        age: Number(draft.age),
        type: draft.type,
        gi: Number(draft.gi),
        risk: 'Low',
      });
      setState((s) => ({
        ...s,
        patients: [...s.patients, newPatient],
      }));
      setDraft({ name: '', age: 30, type: 'Type 2', gi: 7.0 });
    } catch (err) {
      console.error('Failed to add patient', err);
      alert('Failed to add patient');
    }
  };
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-800">Patients</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="rounded-xl bg-gray-100 px-3 py-2"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Age</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">GI</th>
                  <th className="py-2 pr-4">Last Reading</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr 
                    key={p._id || p.id} 
                    className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onPatientClick && onPatientClick(p)}
                  >
                    <td className="py-2 pr-4 font-medium text-blue-600">{p.name}</td>
                    <td className="py-2 pr-4">{p.age}</td>
                    <td className="py-2 pr-4">{p.type}</td>
                    <td className="py-2 pr-4">{p.gi}</td>
                    <td className="py-2 pr-4">
                      {p.last
                        ? `${p.last.value} @ ${formatTime(p.last.ts)}`
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="text-lg font-semibold text-gray-800">Add Patient</div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-5 gap-3">
            <input
              placeholder="Full name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="rounded-xl bg-gray-100 px-3 py-2"
            />
            <input
              type="number"
              placeholder="Age"
              value={draft.age}
              onChange={(e) => setDraft({ ...draft, age: e.target.value })}
              className="rounded-xl bg-gray-100 px-3 py-2"
            />
            <select
              value={draft.type}
              onChange={(e) => setDraft({ ...draft, type: e.target.value })}
              className="rounded-xl bg-gray-100 px-3 py-2"
            >
              <option>Type 1</option>
              <option>Type 2</option>
              <option>Gestational</option>
            </select>
            <input
              type="number"
              step="0.1"
              placeholder="Glycemic Index"
              value={draft.gi}
              onChange={(e) => setDraft({ ...draft, gi: e.target.value })}
              className="rounded-xl bg-gray-100 px-3 py-2"
            />
            <button
              onClick={add}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
