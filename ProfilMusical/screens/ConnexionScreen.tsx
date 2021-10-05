import * as React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import getToken from "../services/spotify.token";

var [request, response, promptAsync] = [null, null, null];

function ConnexionScreen({ navigation }) {
  //Recuperation de la clé
  [request, response, promptAsync] = getToken();
  if (response?.type === "success") {
    navigation.navigate("Accueil");
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../Images/spotify.png")}
        style={{ height: 100, width: 100, marginVertical: 50 }}
      />
      <TouchableOpacity
        disabled={!request}
        style={styles.btn}
        onPress={() => {
          promptAsync({});
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>
          Connexion à Spotify
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1B1B",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  btn: {
    backgroundColor: "#02c360",
    borderRadius: 30,
    height: 50,
    width: 300,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginVertical: 25,
    color: "white",
  },
  titre: {
    fontSize: 20,
    marginVertical: 25,
  },
  dialog: {
    height: 200,
    width: 350,
  },
});

export default ConnexionScreen;
