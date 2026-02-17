import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceArea
} from "recharts";

export default function GlucoseChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-100 text-gray-400">
                Waiting for data...
            </div>
        );
    }

    // Calculate domain padding
    const minVal = Math.min(...data.map(d => d.value));
    const maxVal = Math.max(...data.map(d => d.value));
    const domainMin = Math.max(40, minVal - 10);
    const domainMax = Math.min(400, maxVal + 10);

    return (
        <div className="h-96 w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Glucose Trend (Last 24h)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="timeStr"
                        minTickGap={60}
                        tick={{ fontSize: 12, fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        domain={[domainMin, domainMax]}
                        hide={false}
                        tick={{ fontSize: 12, fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                    />

                    {/* Safe Zone Shading */}
                    <ReferenceArea y1={70} y2={180} fill="#22c55e" fillOpacity={0.05} />

                    <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'Low (70)', fill: '#ef4444', fontSize: 10 }} />
                    <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'High (180)', fill: '#f59e0b', fontSize: 10 }} />

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
