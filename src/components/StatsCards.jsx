import { TrendingUp, TrendingDown, Minus, Battery, Activity, Droplet } from 'lucide-react';

function getTrendIcon(current, previous) {
    if (!previous) return <Minus className="w-5 h-5 text-gray-400" />;
    const diff = current - previous;
    if (diff > 2) return <TrendingUp className="w-5 h-5 text-red-500" />;
    if (diff < -2) return <TrendingDown className="w-5 h-5 text-green-500" />;
    return <Minus className="w-5 h-5 text-gray-400" />;
}

function getStatusColor(val) {
    if (val < 70) return 'text-red-500 bg-red-50 border-red-100';
    if (val > 180) return 'text-amber-500 bg-amber-50 border-amber-100';
    return 'text-green-600 bg-green-50 border-green-100';
}

export default function StatsCards({ latest, previous }) {
    if (!latest) return null;

    const statusClass = getStatusColor(latest.value);
    const trendIcon = getTrendIcon(latest.value, previous?.value);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Main Glucose Card */}
            <div className={`p-6 rounded-2xl border ${statusClass} flex flex-col justify-between shadow-sm`}>
                <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold opacity-70">CURRENT GLUCOSE</span>
                    <span className="p-2 bg-white rounded-full bg-opacity-60">{trendIcon}</span>
                </div>
                <div className="mt-2">
                    <span className="text-5xl font-bold tracking-tight">{latest.value.toFixed(0)}</span>
                    <span className="ml-2 text-sm opacity-70">mg/dL</span>
                </div>
            </div>

            {/* Device Status */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-500">DEVICE STATUS</span>
                    <Battery className={`w-5 h-5 ${latest.battery < 20 ? 'text-red-500' : 'text-gray-400'}`} />
                </div>
                <div className="mt-2">
                    <div className="text-2xl font-bold text-gray-800">{latest.battery}%</div>
                    <div className="text-xs text-gray-400 mt-1">Mode: {latest.mode}</div>
                </div>
            </div>

            {/* Last Sync */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-500">LAST SYNC</span>
                    <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div className="mt-2">
                    <div className="text-xl font-bold text-gray-800">{latest.timeStr}</div>
                    <div className="text-xs text-gray-400 mt-1">{new Date().toLocaleDateString()}</div>
                </div>
            </div>

            {/* Insulin / Active */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-500">INSULIN ON BOARD</span>
                    <Droplet className="w-5 h-5 text-purple-400" />
                </div>
                <div className="mt-2">
                    <div className="text-2xl font-bold text-gray-800">--</div>
                    <div className="text-xs text-gray-400 mt-1">Active Units</div>
                </div>
            </div>
        </div>
    );
}
