import React from "react";
import { StyleSheet, View, Image } from "react-native";

interface ImageProfilProps {
  uri: String;
}
class ImageTrack extends React.Component<ImageProfilProps, {}> {
  constructor(props: ImageProfilProps) {
    super(props);
  }
  render() {
    if (this.props.uri != null && this.props.uri != undefined) {
      return (
        <View>
          <Image
            source={{ uri: Object.values(this.props.uri)[1] }}
            style={styles.image}
          />
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
    height: 80,
    width: 80,
    borderRadius: 20,
    marginLeft: 5,
  },
});

export default ImageTrack;
