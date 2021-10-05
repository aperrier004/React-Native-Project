import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import Artist from "../services/artist.model";
import React from "react";

interface ArtistProps {
  artist: Artist;
  rang: number;
  navigation: any;
}

//Item pour la liste des artistes
class ArtistItem extends React.Component<ArtistProps, {}> {
  constructor(props: ArtistProps) {
    super(props);
  }
  _displayDetail = (id, name, images, popularity, genres) => {
    this.props.navigation.navigate("DetailArtist", {
      id: id,
      name: name,
      images: images,
      popularity: popularity,
      genres: genres,
    });
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this._displayDetail(
            this.props.artist.id,
            this.props.artist.name,
            this.props.artist.images,
            this.props.artist.popularity,
            this.props.artist.genres
          );
        }}
      >
        <Text style={styles.rang}>{this.props.rang}</Text>
        <Image
          source={{ uri: Object.values(this.props.artist.images[0])[1] }}
          style={styles.image}
        />
        <View
          style={{
            marginLeft: 10,
            flex: 3,
          }}
        >
          <Text style={styles.titre}>{this.props.artist.name}</Text>
          <Text
            style={{
              fontSize: 15,
              color: "white",
            }}
          >
            Popularité : {this.props.artist.popularity}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default ArtistItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 15,
    borderRadius: 20,
    marginLeft: 5,
  },
  titre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  rang: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 15,
  },
});
