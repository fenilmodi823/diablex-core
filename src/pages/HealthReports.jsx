import React from 'react';
import { ArrowLeft, Activity, Heart, Weight, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/Card';

export function HealthReports({ onBack }) {
  const stats = [
    { label: 'Avg Glucose (30d)', value: '145 mg/dL', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Blood Pressure', value: '128/82', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Weight', value: '78 kg', icon: Weight, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'HbA1c Trend', value: '-0.3%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={18} /> Back to Patient
      </button>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                  <div className="text-xl font-bold text-gray-800">{s.value}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="text-lg font-semibold text-gray-800">Health Summary</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              The patient has shown consistent improvement in glycemic control over the last 30 days. 
              Average glucose levels have dropped by 5% compared to the previous month. 
              Blood pressure remains slightly elevated but stable.
            </p>
            <p>
              <strong>Recommendations:</strong> Continue current medication regimen. 
              Focus on reducing sodium intake to help manage blood pressure. 
              Next HbA1c test scheduled for June.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
