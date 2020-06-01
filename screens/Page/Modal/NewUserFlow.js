import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, TextField, View } from "react-native-ui-lib";
import ActionButton from "../../../components/Buttons/ActionButton";
import { checkName } from "../../../global/utils";

import UserModel from "../../../models/User";
import ImageUploader from "../../../components/Form/ImageUploader";

export default class NewUserFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: {},
      coverImage: {},
      major: "",
      year: "",
      bio: "",
      // hobbies: props.user.hobbies,
      instagram: "",
      twitter: "",
      // facebook: props.user.facebook,
      snapchat: "",
    };
  }

  handlePress = async () => {
    setError("");
    try {
      checkName(name);
      await UserModel.createNewProfile(name);

      navigation.replace("main");
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };
  render() {
    return (
      <View flex margin-15 spread>
        <View center>
          <Text style={styles.text}>Welcome to Bustle!</Text>
          <Text style={styles.text}>Enter your full name to get started.</Text>
        </View>
        <ImageUploader
          onImageSubmit={(res) => this.setState({ image: res })}
          uri={this.state.image.uri}
          borderRadius={100}
          height={150}
          width={150}
        />
        <TextField
          placeholder="Full name"
          onChangeText={(name) => this.setState({ name })}
        />
        <View flex row>
          <TextField
            placeholder="Major"
            enableErrors={false}
            value={this.state.major}
            onChangeText={(major) => this.setState({ major })}
            style={{ marginRight: 12.5 }}
          />
          <TextField
            placeholder="Year"
            enableErrors={false}
            value={this.state.year}
            onChangeText={(year) => this.setState({ year })}
          />
        </View>
        <TextField
          placeholder="Full name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextField
          placeholder="Full name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextField
          placeholder="Full name"
          onChangeText={(name) => this.setState({ name })}
        />
        <Text>{error}</Text>
        <ActionButton primary text="Get started" onPress={handlePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
