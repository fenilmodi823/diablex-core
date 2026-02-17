import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { classify } from '../lib/classification';

export default function AlertBox({ latest }) {
    if (!latest) return null;
    const gl = latest.value;
    const c = classify(gl);

    if (c.tone === "good" || c.tone === "neutral") return null;

    let msg = "Glucose is above range. Track meals.";
    if (c.label === "LOW") msg = "Glucose is low. Eat quick carbs (juice/candy).";
    if (c.label === "VERY HIGH") msg = "Glucose is critically high. Hydrate and check ketones.";

    return (
        <View style={[styles.box, { backgroundColor: c.label === "LOW" ? "#fee2e2" : "#ffedd5" }]}>
            <Text style={[styles.title, { color: c.color }]}>Attention: {c.label}</Text>
            <Text style={styles.msg}>{msg}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    title: {
        fontWeight: '800',
        marginBottom: 4,
        fontSize: 14,
    },
    msg: {
        fontSize: 14,
        color: '#334155',
        lineHeight: 20,
    }
});
