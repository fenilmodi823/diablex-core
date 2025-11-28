import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from './Card';

export function WeeklyChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-semibold text-gray-800">
          Patient Weekly Report
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis domain={[70, 180]} stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#2563eb"
                strokeWidth={3}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
