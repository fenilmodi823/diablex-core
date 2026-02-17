import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ children, style }) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.08)',
        // Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
});
