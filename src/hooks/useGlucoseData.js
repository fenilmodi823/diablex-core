import { useState, useEffect } from 'react';

const API = "http://localhost:5050";

export function useGlucoseData(deviceId = "DX-SIM-001", limit = 288) { // 288 = 24 hours of 5-min readings
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('loading');
    const [latest, setLatest] = useState(null);

    useEffect(() => {
        if (!deviceId) return;

        async function fetchData() {
            try {
                const res = await fetch(`${API}/api/readings?deviceId=${deviceId}&limit=${limit}`);
                if (!res.ok) throw new Error('Failed to fetch');

                const json = await res.json();

                // Process data
                const processed = (json.rows || []).map(r => {
                    const val = Number(r.glucose ?? r.value);
                    // Fix Time: Parse UTC string to local Date object
                    // The API sends "2023-10-27T10:00:00Z" (ISO). new Date() handles this correctly as UTC
                    // and .toLocaleTimeString() will convert it to system local time.
                    const date = new Date(r.ts);

                    return {
                        ...r,
                        value: val, // Standardize on 'value' for internal use
                        dateObj: date, // Keep object for sorting/math
                        timeStr: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // "10:30 PM"
                        fullTime: date.toLocaleString(),
                        timestamp: date.getTime()
                    };
                }).reverse(); // Sort oldest to newest for graph

                setData(processed);
                setLatest(processed[processed.length - 1] || null);
                setStatus('ok');
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        }

        fetchData();
        const interval = setInterval(fetchData, 3000); // Poll every 3s
        return () => clearInterval(interval);
    }, [deviceId, limit]);

    return { data, status, latest };
}
