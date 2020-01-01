import React, { useState, useEffect } from "react";
import { Alert, View, TouchableOpacity, Text, TextField } from "react-native-ui-lib";
import auth from "@react-native-firebase/auth";

import TextButton from "../../../components/Buttons/TextButton";
import SecureText from "../../../components/Text/SecureInput";
import { checkName, checkPhoneNumber, checkPasswords } from "../../../utils";

export default function SignUp({ navigation }) {
  const [email, setUpEmail] = useState("");
  const [password, setUpPassword] = useState("");
  const [passwordAgain, setUpPasswordAgain] = useState("");
  const [firstName, setUpFirstName] = useState("");
  const [lastName, setUpLastName] = useState("");
  const [phoneNumber, setUpPhoneNumber] = useState("");
  const [error, setError] = useState("");

  async function register() {
    try {
      checkPhoneNumber(phoneNumber);
      checkName(firstName, lastName);
      checkPasswords(password, passwordAgain);
      resetError();
      await auth().createUserWithEmailAndPassword(email, password);
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

  async function facebookRegister() {}
  return (
    <View >
      <TextField
        placeholder="First name"
        onChangeText={text => setUpFirstName(text)}
      ></TextField>
      <TextField
        placeholder="Last name"
        onChangeText={text => setUpLastName(text)}
      ></TextField>
      <TextField
        placeholder="Email"
        onChangeText={text => setUpEmail(text)}
        textContentType="emailAddress"
      ></TextField>
      <TextField
        placeholder="Phone number"
        onChangeText={text => setUpPhoneNumber(text)}
        textContentType="telephoneNumber"
      ></TextField>
      <SecureText placeholder="Password" onChange={setUpPassword}></SecureText>
      <SecureText
        placeholder="Re-enter password"
        onChange={setUpPasswordAgain}
      ></SecureText>
      <Text>{error}</Text>
      <TextButton onPress={register} text="Sign up" />

      <TextButton onPress={facebookRegister} text="Facebook" />

      {/* <TextButton onPress={() => navigation.navigate("Login")} text="Login" /> */}

      {/* <LoginButton onLoginFinished={facebookLogin} /> */}

      {/* <TouchableOpacity onPress={googleLogin}>
    <Text>Login</Text>
  </TouchableOpacity> */}
    </View>
  );
}
