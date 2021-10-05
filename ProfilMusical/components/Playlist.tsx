import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ImageProfilProps {
  idplaylist: string;
  presente: boolean;
  fonction: any;
}
class ImageProfil extends React.Component<ImageProfilProps, {}> {
  constructor(props: ImageProfilProps) {
    super(props);
  }
  render() {
    if (this.props.idplaylist != "") {
      if (!this.props.presente) {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => this.props.fonction()}
          >
            <Ionicons name={"musical-notes"} size={30} color={"white"} />
            <Text style={styles.texte}> + Ajouter à ProfilMusical</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <View style={styles.container}>
            <Ionicons name={"headset"} size={30} color={"white"} />
            <Text style={styles.texte}> ProfilMusical sur Spotify</Text>
          </View>
        );
      }
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.fonction()}
        >
          <Ionicons name={"radio"} size={40} color={"white"} />
          <Text style={styles.texte}> + Créer playlist ProfilMusical</Text>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  texte: {
    color: "white",
    fontSize: 20,
  },
  container: {
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 0.2,
    borderRadius: 100,
    height: 60,
  },
});

export default ImageProfil;
