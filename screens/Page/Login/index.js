import React, { useState } from "react";
import { Platform } from "react-native";
import { View, Text, TextField } from "react-native-ui-lib";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import auth, { firebase } from "@react-native-firebase/auth";
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from "@invertase/react-native-apple-authentication";

import ActionButton from "../../../components/Buttons/ActionButton";
import SecureText from "../../../components/Text/SecureInput";

import styles from "./styles";

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
      "email",
    ]);
    resetError();
    if (result.isCancelled) {
      setError("Login cancelled");
    }

    if (error) {
      handleError(error);
    } else if (result.isCancelled) {
      setError("Cancelled");
    } else {
      const token = await AccessToken.getCurrentAccessToken();
      const credential = auth.FacebookAuthProvider.credential(
        token.accessToken
      );
      try {
        auth().signInWithCredential(credential);
      } catch (e) {
        handleError(e);
      }
    }
  }

  function handleError(e) {
    setError(e.message);
  }

  function resetError() {
    setError("");
  }

  async function onAppleButtonPress() {
    // performs login reques
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });
    const { identityToken, nonce } = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = await auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );
      try {
        await firebase.auth().signInWithCredential(appleCredential);
      } catch (e) {
        handleError(e);
      }
    }
  }

  return (
    <View flex spread style={styles.container}>
      <View flex centerV>
        <View centerV style={styles.input}>
          <TextField
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          ></TextField>
        </View>
        <SecureText placeholder="Password" onChange={setPassword}></SecureText>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>

      <View flex centerV>
        <View style={styles.button}>
          <ActionButton onPress={emailLogin} text="Login" />
        </View>

        <View style={styles.button}>
          <ActionButton primary onPress={facebookLogin} text="Facebook Login" />
        </View>

        {Platform.OS === "ios" && parseInt(Platform.Version, 10) >= 13 && (
          <ActionButton
            primary
            onPress={() => onAppleButtonPress()}
            text="Apple Login"
          />
        )}

        <View style={styles.button}>
          <ActionButton
            onPress={() => navigation.navigate("SignUp")}
            text="Sign Up"
          />
        </View>
      </View>
    </View>
  );
}
