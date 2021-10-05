import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Feature } from "../services/feature.service";
import React from "react";

interface FeatureProps {
  feature: Feature;
}

interface FeatureState {}

class FeatureItem extends React.Component<FeatureProps, FeatureState> {
  constructor(props: FeatureProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titre}>
          <Text style={styles.name}>{this.props.feature.nameFeature}</Text>
        </View>
        <Text style={styles.desc}>{this.props.feature.descFeature}</Text>
      </View>
    );
  }
}
export default FeatureItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 15,
  },
  name: {
    color: "white",
    flex: 1,
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  titre: {
    backgroundColor: "#749FD7",
    width: Dimensions.get("window").width,
    height: 40,
    borderRadius: 15,
    textAlignVertical: "center",
  },
  desc: {
    color: "white",
    flex: 2,
    fontSize: 17,
    marginTop: 10,
    marginHorizontal: 5,
  },
});
