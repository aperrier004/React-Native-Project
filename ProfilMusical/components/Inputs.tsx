import React from "react";
import { StyleSheet, TextInput, View, Image } from "react-native";
interface InputInit {
  nom: string;
  ChangeText: any;
  password: boolean;
}
class Input extends React.Component<InputInit, {}> {
  constructor(props: InputInit) {
    super(props);
  }
  render() {
    return (
      <View style={styles.textinputcontainer}>
        <TextInput
          secureTextEntry={this.props.password}
          autoCapitalize="none"
          placeholder={this.props.nom}
          style={styles.textinputcontent}
          onChangeText={this.props.ChangeText}
        />
      </View>
    );
  }
}

export default Input;
const styles = StyleSheet.create({
  textinputcontainer: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 50,
    width: 300,
    paddingLeft: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textinputcontent: {
    fontSize: 20,
    paddingLeft: 30,
  },
});
