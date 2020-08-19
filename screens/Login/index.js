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
import LinearGradient from "react-native-linear-gradient";

import Loading from "../../components/Loading";
import SecureText from "./components/SecureInput";
import ActionButton from "../../components/Buttons/ActionButton";
import { login } from "../../store/actions";
import { Theme } from "../../global/constants";

import styles from "./styles";

function Login({ navigation, login, app, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    resetError();
    const creds = Credentials.emailPassword(email, password);
    login(creds, handleError);
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
      login(credential, handleError);
    }
  }

  function handleError(e) {
    setError(e.message);
    setLoading(false);
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
        login(credential, handleError);
      } catch (e) {
        handleError(e);
      }
    }
  }

  if (!isReady) {
    return <Loading />;
  }

  return (
    <LinearGradient
      colors={["#ffa45b", "rgba(255, 164, 91, 0.54)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View flex centerV paddingH-20>
        <View centerV marginV-10>
          <View centerH>
            <Text
              color="white"
              text30
              style={{ fontWeight: "bold", marginVertical: 40 }}
            >
              bustle login
            </Text>
          </View>
          <TextField
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            underlineColor="white"
            textContentType="emailAddress"
            placeholderTextColor="white"
            color="white"
            style={{ width: "100%" }}
          />
          <SecureText
            placeholder="Password"
            onChange={setPassword}
            color="white"
          />
          <Text style={{ color: "red" }}>{error}</Text>
        </View>

        <View centerV>
          <View>
            <ActionButton
              backgroundColor={Theme.secondary}
              color="white"
              onPress={emailLogin}
              text="Login"
              disabled={loading}
            />
          </View>

          {/* <View style={styles.button}>
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
          )} */}

          <View style={styles.button}>
            <ActionButton
              onPress={() => navigation.navigate("SignUp")}
              backgroundColor={Theme.secondary}
              color="white"
              text="Sign Up"
            />
          </View>
        </View>
      </View>
    </LinearGradient>
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
