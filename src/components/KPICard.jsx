import React from 'react';
import { Card, CardHeader } from './Card';
import { cls } from '../lib/utils';

const toneMap = {
  blue: 'bg-blue-50 text-blue-700',
  amber: 'bg-amber-50 text-amber-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  rose: 'bg-rose-50 text-rose-700',
};

export function KPICard({ title, value, icon: Icon, tone = 'blue' }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">{title}</div>
          <div className={cls('p-2 rounded-xl', toneMap[tone])}>
            <Icon size={16} />
          </div>
        </div>
        <div className="text-3xl font-semibold mt-2 text-gray-900">{value}</div>
      </CardHeader>
    </Card>
  );
}
