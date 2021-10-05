import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import ConnexionScreen from "../screens/ConnexionScreen";
import ProfilScreen from "../screens/ProfilScreen";
import HomeScreen from "../screens/HomeScreen";
import RecommandationScreen from "../screens/RecommandationScreen";
import DetailsArtistScreen from "../screens/DetailsArtistScreen";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./tab-navigation";
import { Dimensions, Image } from "react-native";
import DetailsTrackScreen from "../screens/DetailsTrackScreen";
import DetailsAudioFeaturesScreen from "../screens/DetailsAudioFeaturesScreen";
// Define view names and associated params
// undefined = no params passed to view
export type RootStackParamList = {
  Profil: undefined;
  Connexion: undefined;
  Accueil: undefined; //page où il y a la liste des albums les plus regardés
  Recommandation: undefined;
  DetailArtist: undefined;
  DetailTrack: undefined;
  DetailsAudioFeatures: undefined;
};

export type RouteProp = {
  id: number;
  name: string;
};
// Define view stack inside connexion tab
const ConnexionStack = createStackNavigator<RootStackParamList>();
export const ConnexionStackScreen = () => {
  return (
    <NavigationContainer>
      <ConnexionStack.Navigator
        screenOptions={{
          headerShown: false,
          headerLeft: null,
        }}
      >
        <ConnexionStack.Screen name="Connexion" component={ConnexionScreen} />
        <ConnexionStack.Screen name="Accueil" component={TabNavigator} />
      </ConnexionStack.Navigator>
    </NavigationContainer>
  );
};

// Define view stack inside home tab
const HomeStack = createStackNavigator<RootStackParamList>();
export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Accueil" component={HomeScreen} />
      <HomeStack.Screen name="Profil" component={ProfilScreen} />
      <HomeStack.Screen
        name="Recommandation"
        component={RecommandationScreen}
      />
      <HomeStack.Screen
        name="DetailArtist"
        component={DetailsArtistScreen}
        options={{
          headerShown: true,
          headerBackTitle: " ",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#1B1B1B",
            shadowColor: "transparent",
          },
        }}
      />
      <HomeStack.Screen
        name="DetailTrack"
        component={DetailsTrackScreen}
        options={{
          headerShown: true,
          headerBackTitle: " ",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#1B1B1B",
            shadowColor: "transparent",
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

// Define view stack inside profil tab
const ProfilStack = createStackNavigator<RootStackParamList>();

export const ProfilStackScreen = () => {
  return (
    <ProfilStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfilStack.Screen name="Profil" component={ProfilScreen} />
      <ProfilStack.Screen name="Accueil" component={HomeScreen} />
      <ProfilStack.Screen
        name="Recommandation"
        component={RecommandationScreen}
      />
      <ProfilStack.Screen
        name="DetailsAudioFeatures"
        component={DetailsAudioFeaturesScreen}
        options={{
          headerShown: true,
          headerBackTitle: " ",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#1B1B1B",
            shadowColor: "transparent",
          },
        }}
      />
      <ProfilStack.Screen name="Connexion" component={ConnexionScreen} />
    </ProfilStack.Navigator>
  );
};

// Define view stack inside profil tab
const RecommandationStack = createStackNavigator<RootStackParamList>();
export const RecommandationStackScreen = () => {
  return (
    <RecommandationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RecommandationStack.Screen
        name="Recommandation"
        component={RecommandationScreen}
      />
      <RecommandationStack.Screen name="Accueil" component={HomeScreen} />
      <RecommandationStack.Screen name="Profil" component={ProfilScreen} />
      <RecommandationStack.Screen
        name="DetailTrack"
        component={DetailsTrackScreen}
        options={{
          headerShown: true,
          headerBackTitle: " ",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#1B1B1B",
            borderColor: "#1B1B1B",
            shadowColor: "transparent",
          },
        }}
      />
    </RecommandationStack.Navigator>
  );
};

export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Accueil">;
  access_token: String;
  route: any;
}

export interface ConnexionScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Connexion">;
  access_token: String;
  route: any;
}

export interface ProfilScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Profil">;
  access_token: String;
  route: any;
}

export interface RecommandationScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Recommandation">;
  access_token: String;
  route: any;
}

export interface DetailsArtistScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "DetailArtist">;
  route: any;
}

export interface DetailsTrackScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "DetailTrack">;
  route: any;
}

export interface DetailsAudioFeaturesScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "DetailsAudioFeatures">;
  route: any;
}
