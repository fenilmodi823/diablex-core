import React from 'react';
import { Card, CardHeader, CardContent } from './Card';
import { cls } from '../lib/utils';

export function PatientDetails({ patients }) {
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-semibold text-gray-800">
          Patient Details
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
                <th className="py-2 pr-4">Glycemic Index</th>
                <th className="py-2 pr-4">Risk</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p._id || p.id} className="border-t border-gray-100">
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4">{p.age}</td>
                  <td className="py-2 pr-4">{p.type}</td>
                  <td className="py-2 pr-4">{p.gi}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={cls(
                        'px-2 py-1 text-xs rounded-full',
                        p.risk === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : p.risk === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                      )}
                    >
                      {p.risk}
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
