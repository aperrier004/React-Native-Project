import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { DetailsAudioFeaturesScreenProps } from "../navigation/app-stacks";
import FeatureList from "../components/FeatureList";

export default class DetailsAudioFeaturesScreen extends React.Component<
  DetailsAudioFeaturesScreenProps,
  {}
> {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titre}>Audio Features</Text>
        </View>
        <FeatureList />
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
    fontSize: 26,
    alignSelf: "center",
    fontWeight: "bold",
    color: "white",
  },
});
