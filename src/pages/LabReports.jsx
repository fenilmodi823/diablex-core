import React from 'react';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/Card';

export function LabReports({ onBack }) {
  // Mock data for lab reports
  const reports = [
    { id: 1, date: '2024-03-15', test: 'HbA1c', result: '7.2%', range: '4.0-5.6%', status: 'High' },
    { id: 2, date: '2024-03-15', test: 'Fasting Glucose', result: '126 mg/dL', range: '70-100 mg/dL', status: 'High' },
    { id: 3, date: '2024-03-15', test: 'Lipid Profile', result: 'Normal', range: '-', status: 'Normal' },
    { id: 4, date: '2024-02-10', test: 'HbA1c', result: '7.5%', range: '4.0-5.6%', status: 'High' },
    { id: 5, date: '2024-01-05', test: 'Kidney Function', result: 'Normal', range: '-', status: 'Normal' },
  ];

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={18} /> Back to Patient
      </button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-800">Lab Reports</div>
            <button className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100">
              <Download size={16} /> Download All
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-500 bg-gray-50">
                <tr>
                  <th className="p-3 rounded-tl-lg">Date</th>
                  <th className="p-3">Test Name</th>
                  <th className="p-3">Result</th>
                  <th className="p-3">Reference Range</th>
                  <th className="p-3 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-gray-600">{r.date}</td>
                    <td className="p-3 font-medium text-gray-800">{r.test}</td>
                    <td className="p-3">{r.result}</td>
                    <td className="p-3 text-gray-500">{r.range}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          r.status === 'Normal'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
