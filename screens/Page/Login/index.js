import React, { useState } from "react";
import { Alert, View, TouchableOpacity, Text, TextField } from "react-native-ui-lib";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import auth from "@react-native-firebase/auth";

import ActionButton from "../../../components/Buttons/ActionButton";
import SecureText from "../../../components/Text/SecureInput";

import styles from './styles'

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
    <View flex spread style={styles.container}>
      <View flex centerV>
        <View centerV style={styles.input}><TextField
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        ></TextField></View>
        <SecureText placeholder="Password" onChange={setPassword}></SecureText>
        <Text>{error}</Text>
      </View>

      <View flex centerV>
        <View style={styles.button}><ActionButton
          onPress={emailLogin}
          text="Login" /></View>

        <View style={styles.button}><ActionButton
          primary
          onPress={facebookLogin} 
          text="Facebook Login" /></View>

        <View style={styles.button}><ActionButton
          onPress={() => navigation.navigate("SignUp")}
          text="Sign Up"/></View>
      </View>
    </View>
  );
}
