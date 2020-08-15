import React, { useState, useEffect } from "react";
import { Credentials } from "realm";
import { Platform } from "react-native";
import { View, Text, TextField } from "react-native-ui-lib";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from "@invertase/react-native-apple-authentication";
import { connect } from "react-redux";
import Loading from "../../components/Loading";

import SecureText from "./components/SecureInput";
import ActionButton from "../../components/Buttons/ActionButton";
import Icons from "../../components/Image/Icons";
import { login } from "../../store/actions";

import styles from "./styles";

function Login({ navigation, login, app, route }) {
  const [email, setEmail] = useState("test@berkeley.edu");
  const [password, setPassword] = useState("tester");
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (route.params?.token && route.params?.tokenId) {
      app.emailPasswordAuth
        .confirmUser(route.params?.token, route.params?.tokenId)
        .then(setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, [route.params?.token, route.params?.tokenId]);

  async function emailLogin() {
    try {
      resetError();
      const creds = Credentials.emailPassword(email, password);
      login(creds);
    } catch (e) {
      handleError(e);
    }
  }

  async function facebookLogin() {
    const result = await LoginManager.logInWithPermissions(["email"]);
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
      const credential = Credentials.facebook(token.accessToken);
      try {
        login(credential);
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

  async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    if (user === null) {
      updateCredentialStateForUser("N/A");
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        updateCredentialStateForUser("AUTHORIZED");
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
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
    const { user: newUser, identityToken, nonce } = appleAuthRequestResponse;
    if (identityToken) {
      // const appleCredential = await auth.AppleAuthProvider.credential(
      //   identityToken,
      //   nonce
      // );
      const credential = Credentials.apple(identityToken);
      try {
        login(credential);
      } catch (e) {
        handleError(e);
      }
    }
  }

  if (!isReady) {
    return <Loading />;
  }

  return (
    <View flex spread style={styles.container}>
      <View flex centerV>
        <View centerV style={styles.input}>
          <TextField
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
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
          <ActionButton
            backgroundColor="#3B5998"
            borderColor="#3B5998"
            onPress={facebookLogin}
          >
            <View row centerV>
              <Icons
                type="Font"
                icon="facebook-f"
                size={15}
                color="white"
                style={{ marginRight: 5 }}
              />
              <Text text70 color="white">
                Sign in with Facebook
              </Text>
            </View>
          </ActionButton>
        </View>

        {Platform.OS === "ios" && parseInt(Platform.Version, 10) >= 13 && (
          <ActionButton
            onPress={() => onAppleButtonPress()}
            backgroundColor="black"
            borderColor="black"
          >
            <View row centerV>
              <Icons
                type="Font"
                icon="apple"
                size={15}
                color="white"
                style={{ marginRight: 5 }}
              />
              <Text text70 color="white">
                Sign in with Apple
              </Text>
            </View>
          </ActionButton>
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

export default connect(
  (state) => ({
    app: state.app,
  }),
  {
    login,
  }
)(Login);
