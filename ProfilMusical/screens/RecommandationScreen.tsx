import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { HomeScreenProps } from "../navigation/app-stacks";
import Artist from "../services/artist.model";
import SpotifyApi from "../services/spotifyapi.service";
import Track from "../services/track.model";
import TrackList from "../components/TrackList";
import { Ionicons } from "@expo/vector-icons";
import AudioFeatures from "../services/audiofeatures.model";

export default class RecommandationScreen extends React.Component<
  HomeScreenProps,
  {}
> {
  state = {
    recommandations: null,
    tracks: null,
    artists: null,
    idartists: "",
    idtracks: "",
    idtracks2: "",

    nbrecommandations: 20,
    acousticness: 0,
    danceability: 0,
    energy: 0,
    instrumentalness: 0,
    popularity: 0,
    valence: 0,
  };

  getAudioFeatures() {
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

        this.setState({ danceability: meanDanceability });
        this.setState({ valence: meanValence });
        this.setState({ energy: meanEnergy });
        this.setState({ acousticness: meanAcousticness }, () =>
          this.chargerPage()
        );
      }
    );
  }

  getTopTracks() {
    return (
      //Recuperation du top 3 des tracks et artistes de l'utilisateur
      SpotifyApi.getFavoriteTracks(3).then((tracks: Array<Track>) => {
        this.setState({ tracks: tracks }, () => {
          if (this.state.tracks != null) {
            var idtracks = "";
            var idtracks2 = "";
            for (let i = 0; i < this.state.tracks.length; i++) {
              idtracks = idtracks + this.state.tracks[i].id + ",";
              if (i < this.state.tracks.length - 1) {
                idtracks2 = idtracks2 + this.state.tracks[i].id + ",";
              }
            }
            this.setState({ idtracks2 });
            this.setState({ idtracks }, () => this.getAudioFeatures());
          }
        });
      })
    );
  }

  //Récuperation des artistes les plus écoutés
  getTopArtists() {
    return SpotifyApi.getFavoriteArtistes(3).then((artists: Array<Artist>) => {
      this.setState({ artists: artists }, () => {
        if (this.state.artists != null) {
          var idartists = "";
          for (let i = 0; i < this.state.artists.length; i++) {
            idartists = idartists + this.state.artists[i].id + ",";
          }
          this.setState({ idartists }, () => this.chargerPage());
        }
      });
    });
  }

  //Mise à 0 des état quand l'utilisateur efface ses valeurs dans les inputs
  statenull() {
    if (this.state.idartists.toString() == "") {
      this.setState({ idartists: 0 });
    }
    if (this.state.idtracks2.toString() == "") {
      this.setState({ idtracks2: 0 });
    }
    if (this.state.nbrecommandations.toString() == "") {
      this.setState({ nbrecommandations: 10 });
    }
    if (this.state.danceability.toString() == "") {
      this.setState({ danceability: 0 });
    }
    if (this.state.valence.toString() == "") {
      this.setState({ valence: 0 });
    }
    if (this.state.energy.toString() == "") {
      this.setState({ energy: 0 });
    }

    if (this.state.acousticness.toString() == "") {
      this.setState({ acousticness: 0 });
    }
    if (this.state.instrumentalness.toString() == "") {
      this.setState({ instrumentalness: 0 });
    }
    if (this.state.popularity.toString() == "") {
      this.setState({ popularity: 0 });
    }
  }
  //Charger les recommandations à partir des filtres
  chargerRecommandations() {
    this.statenull();
    SpotifyApi.getRecommandationFiltered(
      this.state.idartists,
      this.state.idtracks2,
      this.state.nbrecommandations,
      this.state.danceability,
      this.state.valence,
      this.state.energy,
      this.state.acousticness,
      this.state.instrumentalness,
      this.state.popularity
    ).then(({ tracks }) => {
      if (tracks == undefined) {
        Alert.alert(
          "Erreur",
          "Attention vérifiez d'avoir utilisé seulement des chiffres et d'avoir écrit les décimaux avec des points.",
          [{ text: "Ok" }]
        );
      }

      this.setState({ recommandations: tracks });
    });
  }

  //Récupérer recommandation à partir des éléments du profil
  //Pour l'instant seul les tops 3 sont bien traités le reste ce sont des chiffres au hasard
  chargerPage() {
    SpotifyApi.getRecommandation(
      this.state.idartists,
      this.state.idtracks,
      this.state.danceability,
      this.state.valence,
      this.state.energy,
      this.state.acousticness
    ).then(({ tracks }) => {
      if (tracks != undefined) {
        this.setState({ recommandations: tracks });
      }
    });
  }
  entete = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: "#61A36D",
            paddingBottom: 10,
            paddingTop: 45,
          }}
        >
          <Text style={styles.titre}>Recommandations</Text>
        </View>
        <Text style={styles.texte1}>
          Recommandations basées sur votre profil :
        </Text>
        <TouchableOpacity
          style={styles.detailcontainer}
          onPress={() => this.chargerPage()}
        >
          <Ionicons name={"heart-half"} size={30} color={"white"} />
          <Text style={styles.detail}> Recommandations profil</Text>
        </TouchableOpacity>
        <Text style={styles.texte1}>Possibilité de changer les filtres : </Text>
        <View style={styles.filtre}>
          <Text style={styles.texte}>Nombre de recommandations : </Text>
          <TextInput
            placeholder="Nombre"
            style={styles.recommandation}
            keyboardType="numeric"
            placeholderTextColor="black"
            onChangeText={(nb) =>
              this.setState({ nbrecommandations: nb }, () => this.statenull())
            }
          />
        </View>
        <View style={styles.groupe}>
          <View style={styles.filtre}>
            <Text style={styles.texte}>Acousticness : </Text>
            <TextInput
              placeholder="0-1"
              style={styles.recherche}
              placeholderTextColor="black"
              onChangeText={(acc) =>
                this.setState({ acousticness: acc }, () => this.statenull())
              }
            />
          </View>

          <View style={styles.filtre}>
            <Text style={styles.texte}>Danceability : </Text>
            <TextInput
              placeholder="0-1"
              style={styles.recherche}
              placeholderTextColor="black"
              onChangeText={(dance) =>
                this.setState({ danceability: dance }, () => this.statenull())
              }
            />
          </View>
        </View>

        <View style={styles.groupe}>
          <View style={styles.filtre}>
            <Text style={styles.texte}>Energy : </Text>
            <TextInput
              placeholder="0-1"
              style={styles.recherche}
              placeholderTextColor="black"
              onChangeText={(e) =>
                this.setState({ energy: e }, () => this.statenull())
              }
            />
          </View>
          <View style={styles.filtre}>
            <Text style={styles.texte}>Instruments : </Text>
            <TextInput
              placeholder="0-1"
              style={styles.recherche}
              placeholderTextColor="black"
              onChangeText={(instru) =>
                this.setState({ instrumentalness: instru }, () =>
                  this.statenull()
                )
              }
            />
          </View>
        </View>

        <View style={styles.groupe}>
          <View style={styles.filtre}>
            <Text style={styles.texte}>Popularité : </Text>
            <TextInput
              placeholder="0-100"
              style={styles.recherche}
              keyboardType="numeric"
              placeholderTextColor="black"
              onChangeText={(pop) => {
                this.setState({ popularity: pop }, () => this.statenull());
              }}
            />
          </View>

          <View style={styles.filtre}>
            <Text style={styles.texte}>Valence : </Text>
            <TextInput
              placeholder="0-1"
              style={styles.recherche}
              placeholderTextColor="black"
              onChangeText={(val) =>
                this.setState({ valence: val }, () => this.statenull())
              }
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.detailcontainer}
          onPress={() => this.chargerRecommandations()}
        >
          <Ionicons name={"filter"} size={30} color={"white"} />
          <Text style={styles.detail}> Appliquer filtres</Text>
        </TouchableOpacity>
      </View>
    );
  };
  //initialiser avec les valeurs recuperer du profil
  componentDidMount() {
    this.getTopTracks();
    this.getTopArtists();
  }
  render() {
    return (
      <View style={styles.container}>
        <TrackList
          margin={0}
          entete={this.entete()}
          tracks={this.state.recommandations}
          navigation={this.props.navigation}
        />
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
    fontSize: 16,
    height: 30,
    width: 44,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 5,
  },
  recommandation: {
    fontSize: 16,
    height: 30,
    width: 70,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 5,
  },
  texte: {
    fontSize: 15,
    marginLeft: 10,
    color: "white",
  },
  texte1: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 4,
    color: "white",
    fontWeight: "bold",
  },
  filtre: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  groupe: {
    flexDirection: "row",
  },
  detail: {
    color: "white",
    fontSize: 20,
  },
  detailcontainer: {
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 100,
    height: 45,
  },
});
