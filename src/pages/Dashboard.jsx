import React, { useMemo, useEffect } from 'react';
import { Users, ShieldCheck, Activity, HeartPulse } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { ActiveUpdatesTable } from '../components/ActiveUpdatesTable';
import { PatientDetails } from '../components/PatientDetails';
import { WeeklyChart } from '../components/WeeklyChart';
import { MonthlyChart } from '../components/MonthlyChart';
import { DeviceSimulator } from '../components/DeviceSimulator';
import { DeviceBus } from '../lib/deviceBus';
import { api } from '../lib/api';

export function Dashboard({ state, setState }) {
  const { patients, updates, weekly, monthly } = state;
  const totals = useMemo(() => {
    const total = patients.length;
    const uncontrolled = patients.filter(
      (p) => (p.last?.value ?? 0) > 180 || p.gi > 8
    ).length;
    const type2 = patients.filter((p) => p.type.includes('2')).length;
    const highRisk = patients.filter((p) => p.risk === 'High').length;
    return { total, uncontrolled, type2, highRisk };
  }, [patients]);

  useEffect(() => {
    // Fetch initial patients
    api.getPatients().then(data => {
      setState(prev => ({ ...prev, patients: data }));
    }).catch(console.error);

    const unsub = DeviceBus.subscribe((msg) => {
      if (msg.type !== 'reading') return;
      const r = msg.payload;
      setState((prev) => {
        const pts = prev.patients.map((p) =>
          (p._id || p.id) === r.patientId
            ? {
                ...p,
                last: { ts: r.ts, value: r.value, tag: r.tag },
                risk: r.value > 200 ? 'High' : p.risk,
              }
            : p
        );
        
        // Find patient name for the update
        const patient = prev.patients.find(p => (p._id || p.id) === r.patientId);
        const updateWithInfo = { ...r, name: patient ? patient.name : 'Unknown' };
        
        const ups = [updateWithInfo, ...prev.updates].slice(0, 6);
        const wk = prev.weekly.map((d) => ({
          ...d,
          avg: Math.max(70, Math.min(180, d.avg + (Math.random() * 8 - 4))),
        }));
        const last = prev.monthly[prev.monthly.length - 1];
        const mo = prev.monthly.map((m) =>
          m.month === last.month ? { ...m, reports: m.reports + 1 } : m
        );
        return {
          ...prev,
          patients: pts,
          updates: ups,
          weekly: wk,
          monthly: mo,
        };
      });
    });
    return unsub;
  }, [setState]);

  return (
    <div className="grid xl:grid-cols-3 gap-5">
      <div className="xl:col-span-3 grid md:grid-cols-4 gap-4">
        <KPICard
          title="Total Patients"
          value={totals.total}
          icon={Users}
          tone="blue"
        />
        <KPICard
          title="Uncontrolled"
          value={totals.uncontrolled}
          icon={ShieldCheck}
          tone="amber"
        />
        <KPICard
          title="Type 2"
          value={totals.type2}
          icon={Activity}
          tone="emerald"
        />
        <KPICard
          title="High Risk"
          value={totals.highRisk}
          icon={HeartPulse}
          tone="rose"
        />
      </div>

      <div className="xl:col-span-2 grid gap-5">
        <ActiveUpdatesTable updates={updates} />
        <PatientDetails patients={patients.slice(0, 6)} />
      </div>

      <div className="grid gap-5">
        <WeeklyChart data={weekly} />
        <MonthlyChart data={monthly} />
        <DeviceSimulator patients={patients} />
      </div>
    </div>
  );
}
