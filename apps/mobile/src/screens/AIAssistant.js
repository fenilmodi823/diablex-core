import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";

export default function AIAssistant() {
    const [msg, setMsg] = useState("");
    const [chat, setChat] = useState([
        { role: "ai", text: "Hi! I can explain your readings and diabetes basics. (AI backend not connected yet.)" },
    ]);

    function send() {
        if (!msg.trim()) return;
        setChat((c) => [...c, { role: "user", text: msg.trim() }, { role: "ai", text: "Stub reply: we'll connect this to /api/ai/chat next." }]);
        setMsg("");
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 22, fontWeight: "800", marginTop: 40 }}>AI Assistant</Text>
            <Text style={{ opacity: 0.7, marginTop: 4 }}>
                Educational support only — not medical advice.
            </Text>

            <ScrollView style={{ flex: 1, marginTop: 12 }}>
                {chat.map((m, i) => (
                    <View
                        key={i}
                        style={{
                            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                            marginBottom: 10,
                            padding: 10,
                            maxWidth: "85%",
                            borderRadius: 14,
                            borderWidth: 1,
                            borderColor: "rgba(0,0,0,0.10)",
                            backgroundColor: m.role === "user" ? "rgba(0,0,0,0.03)" : "white",
                        }}
                    >
                        <Text style={{ fontWeight: "700", marginBottom: 4 }}>
                            {m.role === "user" ? "You" : "Diablex AI"}
                        </Text>
                        <Text>{m.text}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <TextInput
                    value={msg}
                    onChangeText={setMsg}
                    placeholder="Ask about your readings…"
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.15)",
                        padding: 10,
                        borderRadius: 12,
                    }}
                />
                <Pressable
                    onPress={send}
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.15)",
                    }}
                >
                    <Text style={{ fontWeight: "800" }}>Send</Text>
                </Pressable>
            </View>
        </View>
    );
}
