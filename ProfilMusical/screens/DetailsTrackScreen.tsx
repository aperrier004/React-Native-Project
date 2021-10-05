import React, { Component } from "react";
import { Text, ScrollView, StyleSheet, Alert } from "react-native";
import { DetailsTrackScreenProps } from "../navigation/app-stacks";
import ImageArtist from "../components/ImageArtist";
import Playlist from "../components/Playlist";
import SpotifyApi from "../services/spotifyapi.service";

export default class DetailsTrackScreen extends Component<
  DetailsTrackScreenProps,
  {}
> {
  state = {
    source: "",
    stringartists: "",
    idplaylist: "",
    presente: false,
    playlist: "Créer playlist",
    nom: "",
  };

  componentDidMount() {
    this.chargerPage();
    if (this.state.source != undefined) {
      this.setState({
        source: Object.values(this.props.route.params.album.images[0])[1],
      });
    }

    this.getStringArtists();
  }

  //Recuperation de l'utilisateur connecté
  chargerPage() {
    SpotifyApi.getUser().then((user: any) => {
      this.setState({ nom: user.id }, () => {
        this.verifyPlaylist(() =>
          this.getPlaylistTracks(this.props.route.params.id)
        );
      });
    });
  }

  //Verifie la présence ou non de la playlist profilmusical dans le compte spotify
  verifyPlaylist(fonction: any) {
    SpotifyApi.getPlaylistProfilMusicalid(this.state.nom)
      .then((playlists) => {
        for (let i = 0; i < playlists.items.length; i++) {
          if (playlists.items[i].name == "ProfilMusical") {
            this.setState({ idplaylist: playlists.items[i].id }, () =>
              this.setState({ playlist: "Ajouter" }, () => fonction())
            );
          }
        }
      })
      .catch();
  }

  //Choix entre création d'une playlist ou ajout d'une track
  actionPlaylist() {
    if (this.state.idplaylist != "") {
      this.getPlaylistTracks(this.props.route.params.id);
      this.verifyPresente();
    } else {
      this.createPlaylist();
    }
  }

  //Verifie si une musique est présente et l'ajoute dans le cas contraire
  verifyPresente() {
    if (this.state.presente === false) {
      this.trackToPlaylist();
      this.verifyPlaylist(() =>
        this.getPlaylistTracks(this.props.route.params.id)
      );
    }
  }

  //Verifie si une musique est présente dans la playlist
  getPlaylistTracks(track_id: string) {
    SpotifyApi.getPlaylistTracks(this.state.idplaylist).then((tracks) => {
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].track.id === track_id) {
          this.setState({ playlist: "Déjà présent" });
          this.setState({ presente: true }, () => {});
        }
      }
    });
  }

  //Ajout d'une musique dans une playlist
  trackToPlaylist() {
    SpotifyApi.addTrackToPlaylist(
      this.state.idplaylist,
      this.props.route.params.id
    );
    Alert.alert(
      "Morceau ajouté",
      "Vous pouvez désormais retrouver ce morceau dans la playlist ProfilMusical.",
      [
        {
          text: "Ok",
        },
      ]
    );
  }

  //Cree une playlist
  createPlaylist() {
    Alert.alert(
      "Création playlist",
      "Afin de sauvegarder des morceaux nous vous proposons de créer une playlist ProfilMusical.",
      [
        {
          text: "Non",
        },
        {
          text: "Ok",
          onPress: () => {
            SpotifyApi.createPlaylist(this.state.nom);
          },

          style: "cancel",
        },
      ]
    );
    //Minuteur sinon l'état n'a pas le temps de se mettre à jour
    setTimeout(
      () =>
        this.verifyPlaylist(() =>
          this.getPlaylistTracks(this.props.route.params.id)
        ),
      2000
    );
  }

  //Rassemblement de tous les ids des artistes sous un même string
  getStringArtists() {
    var i: number;
    var artists = "";
    for (
      i = 0;
      i < Object.values(this.props.route.params.artists).length;
      i++
    ) {
      const artist = this.props.route.params.artists[i].name;
      artists = artists + artist + ", ";
    }
    this.setState({ stringartists: artists.slice(0, artists.length - 2) });
  }
  applicateActions() {
    if (this.state.presente === true) {
      Alert.alert(
        "Morceau présent",
        "Vous possédez déjà ce morceau dans la playlist ProfilMusical.",
        [
          {
            text: "Ok",
          },
        ]
      );
    }
    if (this.state.idplaylist == "") {
      this.actionPlaylist();
    } else {
      this.verifyPlaylist(() => this.actionPlaylist());
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#1B1B1B" }}>
        <ImageArtist uri={this.state.source} />
        <Text style={styles.titre}>{this.props.route.params.name}</Text>
        <Text style={styles.texte}>Artiste.s : {this.state.stringartists}</Text>
        <Text style={styles.texte}>
          Album : {this.props.route.params.album.name}
        </Text>
        <Text style={styles.texte}>
          Popularité du son : {this.props.route.params.popularity}
        </Text>
        <Playlist
          idplaylist={this.state.idplaylist}
          presente={this.state.presente}
          fonction={() => this.applicateActions()}
        ></Playlist>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titre: {
    fontSize: 35,
    margin: 20,
    fontWeight: "bold",
    color: "white",
  },
  texte: {
    fontSize: 20,
    marginLeft: 20,
    color: "white",
  },
});
