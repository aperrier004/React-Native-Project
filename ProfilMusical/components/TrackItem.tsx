import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Track from "../services/track.model";
import React from "react";
import CircleProgress from "./CircularProgress";
import ImageTrack from "./ImageTrack";
interface TrackProps {
  track: Track;
  rang: number;
  navigation: any;
}

interface TrackState {
  jouer: string;
  son: any;
  name: any;
  stringartists: string;
}

class TrackItem extends React.Component<TrackProps, TrackState> {
  constructor(props: TrackProps) {
    super(props);
    this.state = {
      jouer: "Play",
      son: null,
      name: "play",
      stringartists: "",
    };
  }

  _displayDetail = (id, name, album, artists, popularity, duration) => {
    this.props.navigation.navigate("DetailTrack", {
      id: id,
      name: name,
      album: album,
      artists: artists,
      popularity: popularity,
      duration: duration,
    });
  };

  //Rassemblement des ids des artistes sous un même string
  getStringArtists() {
    var i: number;
    var artists = "";
    if (
      this.props.track.artists != null &&
      this.props.track.artists != undefined
    ) {
      for (i = 0; i < Object.values(this.props.track.artists).length; i++) {
        const artist = this.props.track.artists[i].name;
        artists = artists + artist + ", ";
      }
    }
    this.setState({ stringartists: artists.slice(0, artists.length - 2) });
  }

  componentDidMount() {
    this.getStringArtists();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this._displayDetail(
            this.props.track.id,
            this.props.track.name,
            this.props.track.album,
            this.props.track.artists,
            this.props.track.popularity,
            this.props.track.duration_ms
          );
        }}
      >
        <Text style={styles.rang}>{this.props.rang}</Text>
        <ImageTrack uri={this.props.track.album.images[0]} />
        <View
          style={{
            marginLeft: 10,
            flex: 3,
          }}
        >
          <Text style={styles.titre}>{this.props.track.name}</Text>
          <Text
            style={{
              fontSize: 15,
              color: "white",
            }}
          >
            {this.state.stringartists}
          </Text>
        </View>
        <CircleProgress track={this.props.track}></CircleProgress>
      </TouchableOpacity>
    );
  }
}
export default TrackItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  image: {
    height: 80,
    width: 80,
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
