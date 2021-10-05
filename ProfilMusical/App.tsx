import React from "react";
import { ConnexionStackScreen } from "./navigation/app-stacks";
import { LogBox } from "react-native";

// Pour ne pas afficher les warning de problèmes de cycle
LogBox.ignoreAllLogs(true);

export default function App() {
  return <ConnexionStackScreen></ConnexionStackScreen>;
}
