import React from "react";
import { StyleSheet, FlatList, View, Button, Text } from "react-native";
import FeatureItem from "./FeatureItem";
import featureService, { Feature } from "../services/feature.service";
const extractKey = (feature: Feature) => feature.id.toString();

interface FeatureListState {
  features: Array<Feature>;
}

class FeatureList extends React.Component<{}, FeatureListState> {
  state: FeatureListState = {
    features: [],
  };

  loadFeatures = () => {
    featureService.getAll().then((features) => {
      // Show all features by default
      let displayedFeatures = features;
      this.setState({ features: displayedFeatures });
    });
  };

  componentDidMount() {
    this.loadFeatures();
  }

  render() {
    const renderItem = ({ item, index }: { item: Feature; index: number }) => {
      return <FeatureItem feature={item} />;
    };
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.features}
          renderItem={renderItem}
          keyExtractor={extractKey}
        ></FlatList>
      </View>
    );
  }
}
export default FeatureList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 85,
  },
});
