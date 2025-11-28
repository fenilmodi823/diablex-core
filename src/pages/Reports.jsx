import React from 'react';
import { FileText, UploadCloud, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/Card';

export function ReportsPage() {
  const items = [
    {
      title: 'Visit Summary PDF',
      desc: 'Vitals, meds, CGM trends, clinician notes.',
      icon: FileText,
    },
    {
      title: 'CSV Export',
      desc: 'De-identified dataset for cohort analysis.',
      icon: UploadCloud,
    },
    {
      title: 'E-Sign & Share',
      desc: 'Send to patient portal & email.',
      icon: ShieldCheck,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-semibold text-gray-800">Reports</div>
        <div className="text-sm text-gray-500">
          Generate PDF summaries for patient visits, export CSV for research,
          and sign digitally.
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-3 gap-3">
          {items.map((x) => {
            const Icon = x.icon;
            return (
              <div
                key={x.title}
                className="p-4 rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-2 font-medium text-gray-800">
                  <Icon size={16} /> {x.title}
                </div>
                <div className="text-sm text-gray-500 mt-1">{x.desc}</div>
                <button className="mt-3 rounded-xl bg-blue-600 text-white px-3 py-1.5 text-sm hover:bg-blue-700">
                  Start
                </button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
