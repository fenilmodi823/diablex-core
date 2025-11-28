import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, FileText, Plus, Activity, FlaskConical } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/Card';
import { api } from '../lib/api';
import { formatTime } from '../lib/utils';
import { LabReports } from './LabReports';
import { HealthReports } from './HealthReports';

export function PatientProfile({ patient, onBack }) {
  const [view, setView] = useState('overview'); // overview, lab, health
  const [plan, setPlan] = useState({
    diet: patient.plan?.diet || '',
    meds: patient.plan?.meds || '',
  });
  const [reports, setReports] = useState([]);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch reports and readings
    const id = patient._id || patient.id;
    api.getReports(id).then(setReports).catch(console.error);
    api.getReadings(id).then(setReadings).catch(console.error);
  }, [patient]);

  const savePlan = async () => {
    setLoading(true);
    try {
      await api.updatePlan(patient._id || patient.id, plan);
      alert('Plan updated successfully!');
    } catch {
      alert('Failed to update plan');
    } finally {
      setLoading(false);
    }
  };

  const addMockReport = async () => {
    const title = prompt('Report Title:');
    if (!title) return;
    try {
      const newReport = await api.addReport({
        patientId: patient._id || patient.id,
        title,
        type: 'Visit',
        url: 'http://example.com/report.pdf',
      });
      setReports([newReport, ...reports]);
    } catch {
      alert('Failed to add report');
    }
  };

  if (view === 'lab') return <LabReports onBack={() => setView('overview')} />;
  if (view === 'health') return <HealthReports onBack={() => setView('overview')} />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} /> Back to Patients
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setView('lab')}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium"
          >
            <FlaskConical size={16} /> Lab Reports
          </button>
          <button
            onClick={() => setView('health')}
            className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 text-sm font-medium"
          >
            <Activity size={16} /> Health Reports
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Patient Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="text-lg font-semibold text-gray-800">
              {patient.name}
            </div>
            <div className="text-sm text-gray-500">
              {patient.age} yrs • {patient.type}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Glycemic Index</span>
                <span className="font-medium">{patient.gi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Risk Level</span>
                <span className="font-medium text-amber-600">{patient.risk}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Plan */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-800">
                Custom Plan
              </div>
              <button
                onClick={savePlan}
                disabled={loading}
                className="flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={16} /> Save
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diet Plan
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 p-3 text-sm focus:border-blue-500 outline-none"
                  placeholder="e.g. Low carb, high protein..."
                  value={plan.diet}
                  onChange={(e) => setPlan({ ...plan, diet: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medications
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 p-3 text-sm focus:border-blue-500 outline-none"
                  placeholder="e.g. Metformin 500mg BD..."
                  value={plan.meds}
                  onChange={(e) => setPlan({ ...plan, meds: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Recent Readings */}
        <Card>
          <CardHeader>
            <div className="text-lg font-semibold text-gray-800">
              Recent Readings
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-gray-500 sticky top-0 bg-white">
                  <tr>
                    <th className="py-2">Time</th>
                    <th className="py-2">Value</th>
                    <th className="py-2">Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((r) => (
                    <tr key={r._id || r.id} className="border-t border-gray-100">
                      <td className="py-2">{formatTime(r.ts)}</td>
                      <td className="py-2 font-medium">{r.value}</td>
                      <td className="py-2 text-gray-500">{r.tag}</td>
                    </tr>
                  ))}
                  {readings.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-500">
                        No readings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Reports */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-800">Reports</div>
              <button
                onClick={addMockReport}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <Plus size={18} />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reports.map((r) => (
                <div
                  key={r._id || r.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50"
                >
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{r.title}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(r.date).toLocaleDateString()} • {r.type}
                    </div>
                  </div>
                </div>
              ))}
              {reports.length === 0 && (
                <div className="py-4 text-center text-gray-500 text-sm">
                  No reports available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
