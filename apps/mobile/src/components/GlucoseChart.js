import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart as KitLineChart } from 'react-native-chart-kit';
import Card from './Card';

const screenWidth = Dimensions.get("window").width;

export default function GlucoseChart({ data, title }) {
    if (!data || data.length === 0) {
        return (
            <Card>
                <Text style={{ textAlign: 'center', opacity: 0.5 }}>No data for chart</Text>
            </Card>
        );
    }

    // Extract values and simplified labels
    const values = data.map(d => d.value);
    const labels = data.map((d, i) => {
        if (i % 6 === 0) { // Show every 6th label
            const date = new Date(d.ts);
            return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
        return "";
    });

    return (
        <Card>
            <Text style={{ fontWeight: '800', marginBottom: 12, fontSize: 16 }}>{title || "Glucose Trend"}</Text>
            <KitLineChart
                data={{
                    labels: labels,
                    datasets: [{ data: values }]
                }}
                width={screenWidth - 64} // Card padding calculation
                height={220}
                yAxisSuffix=""
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, // Blue
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: "3", strokeWidth: "1", stroke: "#2563eb" }
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </Card>
    );
}
