import React, { useState } from "react";
import { Credentials } from "realm";
import { View, Text, TextField } from "react-native-ui-lib";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import SecureText from "../components/SecureInput";
import ActionButton from "../../../components/Buttons/ActionButton";
import { login } from "../../../store/actions";
import { checkEmail, checkPasswords } from "../../../global/utils";
import { Theme } from "../../../global/constants";

import styles from "./styles";

function SignUp({ app, login }) {
  const [email, setEmail] = useState("");
  const [password, setUpPassword] = useState("");
  const [passwordAgain, setUpPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      await app.auth.emailPassword.registerEmail(email, password);
      const token = Credentials.emailPassword(email, password);
      login(token, handleError);
    } catch (e) {
      handleError(e);
      setLoading(false);
    }
  };

  async function validateSubmission() {
    resetError();
    setLoading(true);
    try {
      checkEmail(email);
      checkPasswords(password, passwordAgain);
      submit();
    } catch (e) {
      handleError(e);
      setLoading(false);
    }
  }

  function handleError(e) {
    setError(e.message);
  }

  function resetError() {
    setError("");
  }

  return (
    <LinearGradient
      colors={["#ffa45b", "rgba(255, 164, 91, 0.54)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View flex style={styles.container} paddingH-20>
        <View flex centerV>
          <View centerH>
            <Text
              color="white"
              text30
              style={{ fontWeight: "bold", marginVertical: 40 }}
            >
              bustle sign up
            </Text>
          </View>
          <TextField
            placeholder="Email"
            onChangeText={setEmail}
            textContentType="emailAddress"
            autoCapitalize="none"
            underlineColor="white"
            textContentType="emailAddress"
            placeholderTextColor="white"
            color="white"
            style={{ width: "100%" }}
          ></TextField>
          <SecureText
            placeholder="Password"
            onChange={setUpPassword}
            color="white"
          ></SecureText>
          <SecureText
            placeholder="Re-enter password"
            onChange={setUpPasswordAgain}
            color="white"
          ></SecureText>
          <Text style={styles.error}>{error}</Text>
          <ActionButton
            onPress={validateSubmission}
            backgroundColor={Theme.secondary}
            color="white"
            text="Sign up"
            style={styles.button}
            disabled={loading}
          />
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
)(SignUp);
