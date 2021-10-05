import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { DetailsArtistScreenProps } from "../navigation/app-stacks";
import ImageArtist from "../components/ImageArtist";
import Artist from "../services/artist.model";
import SpotifyApi from "../services/spotifyapi.service";
import Track from "../services/track.model";
import TrackList from "../components/TrackList";
import ArtistListH from "../components/ArtistListH";

export default class DetailsArtistScreen extends Component<
  DetailsArtistScreenProps,
  {}
> {
  state = {
    source: "",
    genres: "",
    tracks: null,
    tracknames: "",
    artists: null,
  };
  //Rassemblement de tous les genres sous un même string
  getStringGenres() {
    var i: number;
    var genres = "";
    for (i = 0; i < this.props.route.params.genres.length; i++) {
      const genre = this.props.route.params.genres[i];
      genres = genres + genre + ", ";
    }
    this.setState({ genres: genres.slice(0, genres.length - 2) });
  }

  //Rassemblement de tous les ids des tracks sous un même string
  getStringTracks() {
    var i: number;
    var tracknames = "";
    for (i = 0; i < this.state.tracks.length; i++) {
      const track = this.state.tracks[i].name;
      tracknames = tracknames + track + ", ";
    }
    this.setState({ tracknames: tracknames.slice(0, tracknames.length - 2) });
  }

  //Recuperation des nb premiers artistes écoutés
  getTopTrack(nb: number) {
    SpotifyApi.getTopTrackArtist(nb).then((tracks: Array<Track>) => {
      this.setState({ tracks: tracks });
    });
  }

  //Recuperation artistes en commun
  getRelatedArtists(nb: number) {
    SpotifyApi.getRelatedArtists(nb).then((artists: Array<Artist>) => {
      this.setState({ artists: artists });
    });
  }
  entete = () => {
    return (
      <View>
        <ImageArtist uri={this.state.source} />
        <Text style={styles.titre}>{this.props.route.params.name}</Text>
        <Text style={styles.texte}>
          Popularité : {this.props.route.params.popularity}
        </Text>
        <Text style={styles.texte}>Genre.s : {this.state.genres}</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.titre2}>
            Artistes associé.e.s : {this.state.tracknames}
          </Text>
          <ArtistListH
            artists={this.state.artists}
            navigation={this.props.navigation}
          />
        </View>
        <View>
          <Text style={styles.titre2}>
            Sons les plus populaires : {this.state.tracknames}
          </Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.getTopTrack(this.props.route.params.id);
    this.getRelatedArtists(this.props.route.params.id);
    if (this.state.source != undefined) {
      this.setState({
        source: Object.values(this.props.route.params.images[0])[1],
      });
    }
    this.getStringGenres();
  }
  render() {
    return (
      <View style={{ backgroundColor: "#1B1B1B" }}>
        <TrackList
          margin={0}
          entete={this.entete}
          tracks={this.state.tracks}
          navigation={this.props.navigation}
        />
      </View>
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
  titre2: {
    fontSize: 24,
    margin: 20,
    fontWeight: "bold",
    color: "white",
  },
  texte: {
    fontSize: 20,
    marginLeft: 20,
    color: "white",
  },
  image: {
    height: 100,
    width: Dimensions.get("window").width,
  },
});
