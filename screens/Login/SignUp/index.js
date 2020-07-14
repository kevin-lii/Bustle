import React, { useState } from "react";
import { View, Text, TextField } from "react-native-ui-lib";

import SecureText from "../components/SecureInput";
import UserModel from "../../../models/User";
import ActionButton from "../../../components/Buttons/ActionButton";

import { checkEmail, checkPasswords } from "../../../global/utils";

import styles from "./styles";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setUpPassword] = useState("");
  const [passwordAgain, setUpPasswordAgain] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      await UserModel.create(email, password);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  async function validateSubmission() {
    resetError();
    try {
      checkEmail(email);
      checkPasswords(password, passwordAgain);
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
    <View flex spread style={styles.container}>
      <View flex centerV>
        <TextField
          placeholder="Email"
          onChangeText={setEmail}
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
