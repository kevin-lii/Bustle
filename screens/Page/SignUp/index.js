import React, { useState, useEffect } from "react";
import { Alert, View, TouchableOpacity, Text, TextInput } from "react-native";
import auth from "@react-native-firebase/auth";

import TextButton from "../../../components/Buttons/TextButton";
import SecureText from "../../../components/TextEntry/SecureInput";
import { checkName, checkPhoneNumber, checkPasswords } from "../../../utils";

export default function SignUp({ navigation }) {
  const [email, setUpEmail] = useState("");
  const [password, setUpPassword] = useState("");
  const [passwordAgain, setUpPasswordAgain] = useState("");
  const [firstName, setUpFirstName] = useState("");
  const [lastName, setUpLastName] = useState("");
  const [phoneNumber, setUpPhoneNumber] = useState("");
  const [error, setError] = useState("");
  1;
  async function register() {
    try {
      checkPhoneNumber(phoneNumber);
      checkName(firstName, lastName);
      checkPasswords(password, passwordAgain);
      resetError();
      await auth().createUserWithEmailAndPassword(email, password);
      // writeUserData();
    } catch (e) {
      handleError(e);
    }
  }

  // function writeUserData() {
  //   firebase
  //     .database()
  //     .ref("users/" + firebase.auth().currentUser.uid)
  //     .set({
  //       displayName: firstName + " " + lastName,
  //       email: email,
  //       phone: phoneNumber,
  //       profile_picture: "https://graph.facebook.com/1574614029341804/picture"
  //     });
  // }

  function handleError(e) {
    setError(e.message);
  }

  function resetError() {
    setError("");
  }

  async function facebookRegister() {}
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <TextInput
        placeholder="First name"
        onChangeText={text => setUpFirstName(text)}
      ></TextInput>
      <TextInput
        placeholder="Last name"
        onChangeText={text => setUpLastName(text)}
      ></TextInput>
      <TextInput
        placeholder="Email"
        onChangeText={text => setUpEmail(text)}
        textContentType="emailAddress"
      ></TextInput>
      <TextInput
        placeholder="Phone number"
        onChangeText={text => setUpPhoneNumber(text)}
        textContentType="telephoneNumber"
      ></TextInput>
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
