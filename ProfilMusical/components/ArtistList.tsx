import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import Artist from "../services/artist.model";
import ArtistItem from "./ArtistItem";
const extractKey = (artist: Artist) => artist.id.toString();

interface ArtistListeProps {
  artists: Array<Artist>;
  navigation: any;
}
//Liste des artistes
class ArtistList extends React.Component<ArtistListeProps, {}> {
  constructor(props: ArtistListeProps) {
    super(props);
  }
  render() {
    const renderItem = ({ item, index }: { item: Artist; index: number }) => {
      var rang = index + 1;
      return (
        <ArtistItem
          artist={item}
          rang={rang}
          navigation={this.props.navigation}
        />
      );
    };
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.artists}
          renderItem={renderItem}
          keyExtractor={extractKey}
        ></FlatList>
      </View>
    );
  }
}
export default ArtistList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 85,
  },
});
