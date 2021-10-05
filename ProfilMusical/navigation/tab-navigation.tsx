import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  RootStackParamList,
  HomeStackScreen,
  ProfilStackScreen,
  RecommandationStackScreen,
} from "./app-stacks";
// Define main tab navigator
const Tab = createBottomTabNavigator<RootStackParamList>();
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any; // TODO: find better type
          if (route.name === "Accueil") {
            iconName = focused
              ? "ios-musical-notes"
              : "ios-musical-notes-outline";
          } else if (route.name === "Recommandation") {
            iconName = focused ? "ios-headset" : "ios-headset-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "#2E2E2E",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name="Accueil" component={HomeStackScreen} />
      <Tab.Screen name="Profil" component={ProfilStackScreen} />
      <Tab.Screen name="Recommandation" component={RecommandationStackScreen} />
    </Tab.Navigator>
  );
};
