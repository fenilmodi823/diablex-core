import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

export default function KPICard({ label, value, subtext, color = "black" }) {
    return (
        <Card>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, { color }]}>{value}</Text>
            {subtext && <Text style={styles.subtext}>{subtext}</Text>}
        </Card>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748b',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    value: {
        fontSize: 24,
        fontWeight: '800',
    },
    subtext: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 4,
    },
});
