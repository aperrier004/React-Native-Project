import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";

interface ImageArtistProps {
  uri: string;
}
class ImageArtist extends React.Component<ImageArtistProps, {}> {
  constructor(props: ImageArtistProps) {
    super(props);
  }
  render() {
    if (this.props.uri != "") {
      return (
        <View>
          <Image source={{ uri: this.props.uri }} style={styles.image} />
        </View>
      );
    } else {
      return (
        <View>
          <Image source={require("../Images/vide.png")} style={styles.image} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
});

export default ImageArtist;
