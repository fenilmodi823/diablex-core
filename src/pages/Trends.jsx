import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../components/Card';

export function TrendsPage() {
  const [data, setData] = useState(
    Array.from({ length: 24 }, (_, i) => ({
      t: `${i}:00`,
      v: 90 + Math.sin(i / 3) * 25 + (Math.random() * 10 - 5),
    }))
  );
  useEffect(() => {
    const id = setInterval(
      () =>
        setData((d) =>
          d.slice(1).concat({
            t: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            v: 100 + Math.random() * 40,
          })
        ),
      2000
    );
    return () => clearInterval(id);
  }, []);
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-semibold text-gray-800">
          Realtime CGM Stream (clinic aggregate)
        </div>
        <div className="text-sm text-gray-500">
          Live data from connected devices, anonymized and aggregated for
          clinic-level monitoring.
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="t" stroke="#6b7280" />
              <YAxis domain={[60, 200]} stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
