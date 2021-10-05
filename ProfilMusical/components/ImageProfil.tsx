import React from "react";
import { StyleSheet, View, Image } from "react-native";

interface ImageProfilProps {
  uri: string;
  image: boolean;
}
class ImageProfil extends React.Component<ImageProfilProps, {}> {
  constructor(props: ImageProfilProps) {
    super(props);
  }
  render() {
    if (this.props.image) {
      return (
        <View>
          <Image source={{ uri: this.props.uri }} style={styles.image} />
        </View>
      );
    } else {
      return (
        <View>
          <Image
            source={require("../Images/profil.png")}
            style={styles.image}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 150,
  },
});

export default ImageProfil;
