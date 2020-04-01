import React, { useState } from "react";
import { View, Text, TextField } from "react-native-ui-lib";

import SecureText from "../../../components/Text/SecureInput";
import { checkName, checkEmail, checkPasswords } from "../../../global/utils";
import UserModel from "../../../models/User";
import ActionButton from "../../../components/Buttons/ActionButton";

import styles from "./styles";

export default function SignUp({ navigation }) {
  const [megaState, setMegaState] = useState({
    email: "",
    firstName: "",
    lastName: ""
  });
  const [password, setUpPassword] = useState("");
  const [passwordAgain, setUpPasswordAgain] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const stateCopy = Object.assign({}, megaState);
      delete stateCopy.firstName;
      delete stateCopy.lastName;
      await UserModel.create(stateCopy, password);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  async function validateSubmission() {
    resetError();
    try {
      checkEmail(megaState.email);
      checkPasswords(password, passwordAgain);
      checkName(megaState.firstName, megaState.lastName);
      megaState.displayName = megaState.firstName + " " + megaState.lastName;
      submit();
    } catch (e) {
      handleError(e);
    }
  }

  function handleError(e) {
    setError(e.message);
  }

  function resetError() {
    setError("");
  }

  return (
    <View flex spreads style={styles.container}>
      <View flex centerV>
        <TextField
          placeholder="First name"
          onChangeText={text => setMegaState({ ...megaState, firstName: text })}
        ></TextField>
        <TextField
          placeholder="Last name"
          onChangeText={text => setMegaState({ ...megaState, lastName: text })}
        ></TextField>
        <TextField
          placeholder="Email"
          onChangeText={text => setMegaState({ ...megaState, email: text })}
          textContentType="emailAddress"
        ></TextField>
        <SecureText
          placeholder="Password"
          onChange={setUpPassword}
        ></SecureText>
        <SecureText
          placeholder="Re-enter password"
          onChange={setUpPasswordAgain}
        ></SecureText>
        <Text style={styles.error}>{error}</Text>
        <ActionButton
          onPress={validateSubmission}
          text="Sign up"
          style={styles.button}
        />
      </View>
    </View>
  );
}
