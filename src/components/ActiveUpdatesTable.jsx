import React from 'react';
import { Card, CardHeader, CardContent } from './Card';
import { cls, formatTime } from '../lib/utils';

export function ActiveUpdatesTable({ updates }) {
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-semibold text-gray-800">
          Active Glucose Updates
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2 pr-4">Patient</th>
                <th className="py-2 pr-4">Time</th>
                <th className="py-2 pr-4">Reading (mg/dL)</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((u) => (
                <tr key={u.ts + (u._id || u.id)} className="border-t border-gray-100">
                  <td className="py-2 pr-4">{u.name}</td>
                  <td className="py-2 pr-4">{formatTime(u.ts)}</td>
                  <td className="py-2 pr-4 font-medium">{u.value}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={cls(
                        'px-2 py-1 text-xs rounded-full',
                        u.tag.includes('Post')
                          ? 'bg-amber-100 text-amber-800'
                          : u.tag === 'Fasting'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                      )}
                    >
                      {u.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
