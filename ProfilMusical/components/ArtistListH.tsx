import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import Artist from "../services/artist.model";
import ArtistItemH from "./ArtistItemH";
const extractKey = (artist: Artist) => artist.id.toString();

interface ArtistListeProps {
  artists: Array<Artist>;
  navigation: any;
}
//Liste des artistes affichée à l'horizontale
class ArtistList extends React.Component<ArtistListeProps, {}> {
  constructor(props: ArtistListeProps) {
    super(props);
  }
  render() {
    const renderItem = ({ item, index }: { item: Artist; index: number }) => {
      var rang = index + 1;
      return <ArtistItemH artist={item} />;
    };
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={true}
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
