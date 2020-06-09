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
      instagram: "",
      twitter: "",
      snapchat: "",
      error: "",
    };
  }

  handlePress = async () => {
    try {
      checkName(this.state.name);
      await UserModel.createNewProfile(this.state.name);
      this.props.navigation.replace("main");
    } catch (e) {
      this.setState({ error: e.message });
      console.log(e);
    }
  };
  render() {
    return (
      <View flex margin-15>
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
        <View flex row spread>
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
        {/* <TextField
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
        /> */}
        <Text>{this.state.error}</Text>
        <ActionButton primary text="Get started" onPress={this.handlePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
