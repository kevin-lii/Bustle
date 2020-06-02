import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, TextField, View } from "react-native-ui-lib";
import ActionButton from "../../../components/Buttons/ActionButton";
import { checkName } from "../../../global/utils";
import { Theme } from "../../../global/constants";

import UserModel from "../../../models/User";

export default ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
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

  return (
    <View flex padding-15 spread style={{ backgroundColor: "white" }}>
      <View center>
        <Text style={styles.text}>Welcome to Bustle!</Text>
        <Text style={styles.text}>Enter your full name to get started.</Text>
      </View>
      <TextField placeholder="Full name" onChangeText={setName} />
      <Text>{error}</Text>
      <ActionButton primary text="Get started" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
