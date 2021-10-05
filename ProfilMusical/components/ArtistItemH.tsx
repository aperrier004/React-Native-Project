import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import Artist from "../services/artist.model";
import React from "react";

interface ArtistProps {
  artist: Artist;
}

//Item pour la liste des artistes affcihée à l'horizontale
class ArtistItem extends React.Component<ArtistProps, {}> {
  constructor(props: ArtistProps) {
    super(props);
  }

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: Object.values(this.props.artist.images[0])[1] }}
          style={styles.image}
        />
        <Text style={styles.titre}>{this.props.artist.name}</Text>
      </View>
    );
  }
}
export default ArtistItem;

const styles = StyleSheet.create({
  container: {
    //height: 40,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#12100e",
    marginVertical: 3,
  },
  image: {
    height: 170,
    width: 170,
    margin: 15,
    borderRadius: 100,
  },
  titre: {
    fontSize: 17,
    color: "white",
  },
});
