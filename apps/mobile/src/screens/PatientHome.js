import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, RefreshControl, StyleSheet, SafeAreaView } from "react-native";
import { fetchReadings } from "../lib/api";
import { classify } from "../lib/classification";
import KPICard from "../components/KPICard";
import AlertBox from "../components/AlertBox";
import GlucoseChart from "../components/GlucoseChart";

export default function PatientHome() {
    const [rows, setRows] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [err, setErr] = useState("");

    async function load() {
        try {
            setErr("");
            const r = await fetchReadings(60); // fetch last 60 points (3 hours approx)
            // Backend usually returns DESC, we want ASC for charts
            setRows(r.reverse());
        } catch (e) {
            setErr(e.message);
        }
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        load();
        const id = setInterval(load, 5000); // 5s auto refresh
        return () => clearInterval(id);
    }, []);

    const latest = useMemo(() => (rows.length ? rows[rows.length - 1] : null), [rows]);
    const cls = classify(latest?.value);

    // Stats calculation
    const timeInRange = useMemo(() => {
        if (!rows.length) return 0;
        const inRange = rows.filter(r => r.value >= 70 && r.value <= 180).length;
        return Math.round((inRange / rows.length) * 100);
    }, [rows]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text style={styles.headerTitle}>Diablex Monitor</Text>
                <Text style={styles.headerSubtitle}>{err ? `Error: ${err}` : "Live System Active"}</Text>

                {/* 1. Alert Banner */}
                <AlertBox latest={latest} />

                {/* 2. Main KPI Grid */}
                <View style={styles.grid}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <KPICard
                            label="Current Glucose"
                            value={latest ? `${latest.value.toFixed(0)}` : "—"}
                            subtext="mg/dL"
                            color={cls.color}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <KPICard
                            label="Time In Range"
                            value={`${timeInRange}%`}
                            subtext="Last 3 Hours"
                            color="#2563eb"
                        />
                    </View>
                </View>

                {/* 3. Secondary Stats */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
                    <View style={{ width: 120, marginRight: 8 }}>
                        <KPICard label="Status" value={cls.label} color={cls.color} />
                    </View>
                    <View style={{ width: 120, marginRight: 8 }}>
                        <KPICard label="Mode" value={latest?.mode || "—"} />
                    </View>
                    <View style={{ width: 120 }}>
                        <KPICard label="Battery" value={latest?.battery ? `${latest.battery}%` : "—"} />
                    </View>
                </ScrollView>

                {/* 4. Chart */}
                <GlucoseChart data={rows} title="3 Hour Trend" />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0f172a',
        marginTop: 20
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4
    }
});
