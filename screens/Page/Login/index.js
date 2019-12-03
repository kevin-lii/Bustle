import React, { useState } from "react";
import { Alert, View, TouchableOpacity, Text, TextInput } from "react-native";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import auth from "@react-native-firebase/auth";

import TextButton from "../../../components/Buttons/TextButton";
import SecureText from "../../../components/Text/SecureInput";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("a@ol.com");
  const [password, setPassword] = useState("tester");
  const [error, setError] = useState("");

  async function emailLogin() {
    try {
      resetError();
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      handleError(e);
    }
  }

  async function facebookLogin() {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email"
    ]);
    resetError();
    if (result.isCancelled) {
      setError("Login cancelled");
    }

    if (error) {
      handleError(e);
    } else if (result.isCancelled) {
      setError("Cancelled");
    } else {
      const token = await AccessToken.getCurrentAccessToken();
      const credential = auth.FacebookAuthProvider.credential(
        token.accessToken
      );
      auth().signInWithCredential(credential);
    }
  }

  function handleError(e) {
    setError(e.message);
  }

  function resetError() {
    setError("");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      ></TextInput>
      <SecureText placeholder="Password" onChange={setPassword}></SecureText>
      <Text>{error}</Text>
      <TextButton onPress={emailLogin} text="Login" />

      <TextButton onPress={facebookLogin} text="Facebook Login" />

      <TextButton
        onPress={() => navigation.navigate("SignUp")}
        text="Sign Up"
      />

      {/* <LoginButton onLoginFinished={facebookLogin} /> */}

      {/* <TouchableOpacity onPress={googleLogin}>
        <Text>Login</Text>
      </TouchableOpacity> */}
    </View>
  );
}
