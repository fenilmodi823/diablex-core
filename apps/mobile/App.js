import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PatientHome from "./src/screens/PatientHome";
import AIAssistant from "./src/screens/AIAssistant";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={PatientHome} />
                <Tab.Screen name="AI" component={AIAssistant} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
