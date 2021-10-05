import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Track from "../services/track.model";
import { Audio } from "expo-av";
interface CircleProgressProps {
  track: Track;
}

interface CircleProgresState {
  points: number;
  name: any;
  son: any;
  jouer: string;
  duration: number;
  interval: any;
}

//Affichage du cercle d'avancement de la chanson et gestion des preview
export default class CircleProgress extends React.Component<
  CircleProgressProps,
  CircleProgresState
> {
  _circularProgressRef: React.RefObject<AnimatedCircularProgress>;
  constructor(props: CircleProgressProps) {
    super(props);
    this._circularProgressRef = React.createRef();
    this.state = {
      points: 10,
      name: "play",
      son: null,
      jouer: "Play",
      duration: 30000,
      interval: null,
    };
  }

  //Récupère la durée de la chanson en cours
  getDuration() {
    if (this.state.son != null) {
      this.state.son
        .getStatusAsync()
        .then((result) => {
          this.setState({ duration: result.durationMillis });
        })
        .catch();
    }
  }

  // Lancement / arrêt du son de la chanson
  playSound = async () => {
    try {
      await Audio.Sound;
      if (this.props.track.preview_url != null) {
        if (this.state.points > this.state.duration) {
          await this.state.son.pauseAsync();
          clearInterval(this.state.interval);
          this.setState({ jouer: "Play" });
          this.setState({ son: null });
          this.setState({ name: "play" });
          this.setState({ points: 10 });
        } else if (this.state.son == null) {
          const { sound } = await Audio.Sound.createAsync({
            uri: this.props.track.preview_url,
          });
          this.setState({ son: sound });
          Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          });

          await this.state.son.playAsync();
          this.setState({ jouer: "Pause" });
          this.setState({ name: "pause" });
          //affichage des cercles de durée de la musique
          if (this.state.name == "pause") {
            this.setState({
              interval: setInterval(() => {
                if (this.state.points < this.state.duration) {
                  this.setState({
                    points: this.state.points + 500,
                  });
                } else {
                  //remise à 0 du cercle quand la musique est terminée
                  this.state.son.pauseAsync();
                  clearInterval(this.state.interval);
                  this.setState({ jouer: "Play" });
                  this.setState({ son: null });
                  this.setState({ name: "play" });
                  this.setState({ points: 10 });
                }
              }, 500),
            });
          }
        } else {
          //remise à 0 du cercle quand on clique sur pause
          await this.state.son.pauseAsync();
          clearInterval(this.state.interval);
          this.setState({ jouer: "Play" });
          this.setState({ son: null });
          this.setState({ name: "play" });
          this.setState({ points: 10 });
        }
      } else {
        Alert.alert(
          "Son indisponible",
          "Aucun extrait de cette musique n'est disponible",
          [{ text: "Ok" }]
        );
      }
    } catch (err) {
      // An error occurred!
    }
  };

  render() {
    const fill = (this.state.points / this.state.duration) * 100;
    return (
      <TouchableOpacity style={styles.container} onPress={this.playSound}>
        <AnimatedCircularProgress
          size={55}
          width={5}
          backgroundWidth={2}
          fill={fill}
          tintColor="white"
          backgroundColor="#3d5875"
        >
          {() => <Ionicons name={this.state.name} size={25} color={"white"} />}
        </AnimatedCircularProgress>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
