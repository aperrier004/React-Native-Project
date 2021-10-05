import React from "react";
import { StyleSheet, Text, View, TextInput, Keyboard } from "react-native";
import { HomeScreenProps } from "../navigation/app-stacks";
import Artist from "../services/artist.model";
import SpotifyApi from "../services/spotifyapi.service";
import Track from "../services/track.model";
import TrackList from "../components/TrackList";
import ArtistList from "../components/ArtistList";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default class HomeScreen extends React.Component<HomeScreenProps, {}> {
  state = {
    recherche: "",
    artists: null,
    nom: "",
    tracks: null,
    nbartistes: 3,
    nbmusiques: 3,
  };

  chargerPage() {
    // On récupère l'utilisateur pour afficher son nom
    SpotifyApi.getUser().then((user: any) => {
      this.setState({ nom: user.display_name });
    });
    this.afficherArtistes(this.state.nbartistes);
    this.afficherMusiques(this.state.nbmusiques);
  }
  afficherMusiques(nb: number) {
    SpotifyApi.getFavoriteTracks(nb).then((tracks: Array<Track>) => {
      this.setState({ tracks: tracks });
    });
  }
  afficherArtistes(nb: number) {
    SpotifyApi.getFavoriteArtistes(nb).then((artists: Array<Artist>) => {
      this.setState({ artists: artists });
    });
  }
  componentDidMount() {
    this.chargerPage();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#8F5069",
              paddingBottom: 10,
              paddingTop: 45,
            }}
          >
            <Text style={styles.titre}>Artistes favoris</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={styles.texte}>Nombre d'artistes : </Text>
            <TextInput
              placeholder="Nombre"
              style={styles.recherche}
              keyboardType="numeric"
              placeholderTextColor="black"
              onChangeText={(nb) => this.setState({ nbartistes: nb })}
            />
            <TouchableOpacity
              style={styles.bouton1}
              onPress={() => {
                this.afficherArtistes(this.state.nbartistes);
                Keyboard.dismiss();
              }}
            >
              <Ionicons name={"search-outline"} size={30} color={"white"} />
            </TouchableOpacity>
          </View>
          <ArtistList
            artists={this.state.artists}
            navigation={this.props.navigation}
          />
        </View>

        <View style={{ flex: 1, marginTop: 50 }}>
          <View
            style={{
              backgroundColor: "#654F88",
              justifyContent: "center",
              height: 50,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Text style={styles.titre}>Musiques favorites</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={styles.texte}>Nombre de musiques : </Text>
            <TextInput
              placeholder="Nombre"
              style={styles.recherche}
              keyboardType="numeric"
              placeholderTextColor="black"
              onChangeText={(nb) => {
                this.setState({ nbmusiques: nb });
              }}
            />
            <TouchableOpacity
              style={styles.bouton2}
              onPress={() => {
                this.afficherMusiques(this.state.nbmusiques);
                Keyboard.dismiss();
              }}
            >
              <Ionicons name={"search-outline"} size={30} color={"white"} />
            </TouchableOpacity>
          </View>

          <TrackList
            margin={90}
            entete={null}
            tracks={this.state.tracks}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B1B",
  },
  titre: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "bold",
    color: "white",
  },
  recherche: {
    fontSize: 15,
    height: 26,
    width: 70,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 5,
    padding: 3,
    marginRight: 7,
  },
  texte: {
    fontSize: 15,
    marginLeft: 10,
    color: "white",
  },
  bouton1: {
    backgroundColor: "#8F5069",
    borderRadius: 5,
    padding: 4,
  },
  bouton2: {
    backgroundColor: "#654F88",
    borderRadius: 5,
    padding: 4,
  },
});
