import React from "react";
import { FlatList, View } from "react-native";
import Track from "../services/track.model";
import TrackItem from "./TrackItem";
const extractKey = (track: Track) => track.id.toString();

interface TrackListeProps {
  tracks: Array<Track>;
  navigation: any;
  entete: any;
  margin: number;
}

class TrackList extends React.Component<TrackListeProps, {}> {
  constructor(props: TrackListeProps) {
    super(props);
  }
  render() {
    const renderItem = ({ item, index }: { item: Track; index: number }) => {
      var rang = index + 1;
      return (
        <TrackItem
          track={item}
          rang={rang}
          navigation={this.props.navigation}
        />
      );
    };
    return (
      <View style={{ marginBottom: this.props.margin }}>
        <FlatList
          ListHeaderComponent={this.props.entete}
          data={this.props.tracks}
          renderItem={renderItem}
          keyExtractor={extractKey}
        ></FlatList>
      </View>
    );
  }
}
export default TrackList;
