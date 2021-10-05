import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { ProfilScreenProps } from "../navigation/app-stacks";
import SpotifyApi from "../services/spotifyapi.service";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageProfil from "../components/ImageProfil";
import Track from "../services/track.model";
import Artist from "../services/artist.model";
import AudioFeatures from "../services/audiofeatures.model";
import { Ionicons } from "@expo/vector-icons";

class ProfilScreen extends React.Component<ProfilScreenProps, {}> {
  state = {
    nom: "",
    source: "",
    image: false,
    tracks: null,
    artists: null,
    audiofeatures: null,
    danceability: "",
    energy: "",
    valence: "",
    acousticness: "",
    popularity: "",
    danceabilityPourcentage: 0,
    energyPourcentage: 0,
    valencePourcentage: 0,
    acousticnessPourcentage: 0,
    popularityArtists: 0,
    popularityTracks: 0,
    popularityPourcentage: 0,
  };

  chargerPage() {
    SpotifyApi.getUser().then((user: any) => {
      this.setState({ nom: user.display_name });
      if (user.images.length > 0) {
        this.setState({ image: true });
        this.setState({ source: Object.values(user.images[0])[1] });
      }
    });
  }
  deconnexion = (navigation) => {
    navigation.navigate("Connexion");
  };
  recupererMusiques(nb: number) {
    SpotifyApi.getFavoriteTracks(nb).then((tracks: Array<Track>) => {
      this.setState({ tracks: tracks }, () => this.afficherAudioFeatures(nb));

      // Popularité des 20 sons les plus écoutés
      var meanPopularityTracks = 0;
      tracks.map((element) => {
        meanPopularityTracks += element.popularity;
      });
      meanPopularityTracks = (meanPopularityTracks * 1.0) / tracks.length;
      var meanPopularityArtists = this.state.popularityPourcentage;
      this.setState({
        popularityTracks: meanPopularityTracks,
      });

      if (this.state.popularityArtists != 0) {
        this.calculerMoyennePopularite();
      }
    });
  }
  recupererArtistes(nb: number) {
    SpotifyApi.getFavoriteArtistes(nb).then((artists: Array<Artist>) => {
      this.setState({ artists: artists });

      var meanPopularityArtists = 0;
      artists.map((element) => {
        meanPopularityArtists += element.popularity;
      });
      meanPopularityArtists = (meanPopularityArtists * 1.0) / artists.length;

      this.setState({
        popularityArtists: meanPopularityArtists,
      });
    });
    if (this.state.popularityTracks != 0) {
      this.calculerMoyennePopularite();
    }
  }
  calculerMoyennePopularite() {
    var popularite =
      (this.state.popularityArtists + this.state.popularityTracks) / 2;
    this.setState({ popularityPourcentage: popularite });
    if (this.state.popularityPourcentage / 2 <= 40) {
      this.setState({ popularity: "Traqueur de talents" });
    } else if (this.state.popularityPourcentage / 2 <= 80) {
      this.setState({ popularity: "Étoile montante" });
    } else if (this.state.popularityPourcentage / 2 <= 100) {
      this.setState({ popularity: "Sous les projecteurs" });
    }
  }
  afficherAudioFeatures(nb: number) {
    var meanDanceability = 0;
    var meanEnergy = 0;
    var meanValence = 0;
    var meanAcousticness = 0;

    // Récupération des 10 titres préférés
    const idsTracks = this.state.tracks.map((element) => element.id);

    // Récupération des features de chaques titres préférés
    SpotifyApi.getAudioFeatures(idsTracks).then(
      (audiofeatures: Array<AudioFeatures>) => {
        this.setState({ audiofeatures: audiofeatures });

        audiofeatures.map((element) => {
          meanDanceability += element.danceability;
          meanEnergy += element.energy;
          meanValence += element.valence;
          meanAcousticness += element.acousticness;
        });
        // Calcul des moyennes
        meanDanceability = (meanDanceability * 1.0) / audiofeatures.length;
        meanEnergy = (meanEnergy * 1.0) / audiofeatures.length;
        meanValence = (meanValence * 1.0) / audiofeatures.length;
        meanAcousticness = (meanAcousticness * 1.0) / audiofeatures.length;

        this.setState({ danceabilityPourcentage: meanDanceability * 100 });
        this.setState({ valencePourcentage: meanValence * 100 });
        this.setState({ energyPourcentage: meanEnergy * 100 });
        this.setState({ acousticnessPourcentage: meanAcousticness * 100 });

        // Détermination de la catégorie de l'utilisateur à partir de la moyenne sur 10 titres
        if (meanDanceability <= 0.5) {
          this.setState({ danceability: "Danseur.euse du dimanche" });
        } else if (meanDanceability <= 0.8) {
          this.setState({ danceability: "Enflamme le dancefloor" });
        } else if (meanDanceability <= 1) {
          this.setState({ danceability: "No limit" });
        }

        if (meanEnergy <= 0.5) {
          this.setState({ energy: "Tranquille" });
        } else if (meanEnergy <= 0.8) {
          this.setState({ energy: "Pics d'énergie" });
        } else if (meanEnergy <= 1) {
          this.setState({ energy: "Inarrêtable" });
        }

        if (meanValence <= 0.4) {
          this.setState({ valence: "Mélancolique" });
        } else if (meanValence <= 0.8) {
          this.setState({ valence: "Extraverti.e" });
        } else if (meanValence <= 1) {
          this.setState({ valence: "Ambianceur.euse" });
        }

        if (meanAcousticness <= 0.2) {
          this.setState({ acousticness: "Autotune lover" });
        } else if (meanAcousticness <= 0.7) {
          this.setState({ acousticness: "Plus électro que guitare" });
        } else if (meanAcousticness <= 1) {
          this.setState({ acousticness: "Ambiance feu de camp" });
        }
      }
    );
  }
  componentDidMount() {
    this.chargerPage();
    this.recupererMusiques(10);
    this.recupererArtistes(5);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <ImageProfil uri={this.state.source} image={this.state.image} />
          <Text style={styles.titre}>{this.state.nom}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#749FD7",
              justifyContent: "center",
              height: 50,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginBottom: 10,
            }}
          >
            <Text style={styles.titre}>Profil musical</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Images/projecteur.png")}
              style={styles.image}
            ></Image>
            <Text style={styles.texte}>
              Popularity : {Math.round(this.state.popularityPourcentage)}%{"\n"}
              {this.state.popularity}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 10,
            }}
          >
            <Text style={styles.texte}>
              Danceability : {Math.round(this.state.danceabilityPourcentage)}%
              {"\n"}
              {this.state.danceability}
            </Text>
            <Image
              source={require("../Images/nolimit.png")}
              style={styles.image}
            ></Image>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Images/energy.png")}
              style={styles.image}
            ></Image>
            <Text style={styles.texte}>
              Energy : {Math.round(this.state.energyPourcentage)}%{"\n"}
              {this.state.energy}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <Text style={styles.texte}>
              Valence : {Math.round(this.state.valencePourcentage)}%{"\n"}
              {this.state.valence}
            </Text>
            <Image
              source={require("../Images/valence.png")}
              style={styles.image}
            ></Image>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Images/accous.png")}
              style={styles.image}
            ></Image>
            <Text style={styles.texte}>
              Acousticness : {Math.round(this.state.acousticnessPourcentage)}%
              {"\n"}
              {this.state.acousticness}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 70,
            }}
          >
            <TouchableOpacity
              style={styles.detailcontainer}
              onPress={() =>
                this.props.navigation.navigate("DetailsAudioFeatures")
              }
            >
              <Ionicons name={"information-circle"} size={30} color={"white"} />
              <Text style={styles.detail}> Détails</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailcontainer}
              onPress={() => {
                this.props.navigation.navigate("Connexion");
              }}
            >
              <Ionicons name={"ios-log-out"} size={30} color={"white"} />
              <Text style={styles.detail}> Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B1B",
    paddingTop: 70,
  },
  titre: {
    fontSize: 24,
    marginLeft: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 30,
    borderColor: "white",
    flex: 1,
    margin: 10,
    //borderWidth: 3,
  },
  texte: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    flex: 1,
    margin: 10,
  },
  profil: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    flex: 1,
    margin: 10,
  },
  detail: {
    color: "white",
    fontSize: 20,
  },
  detailcontainer: {
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 100,
    height: 60,
  },
  background: {
    flex: 1,
  },
});

export default ProfilScreen;
