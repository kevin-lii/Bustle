import React, { useState } from "react";
import { Credentials } from "realm";
import { View, Text, TextField } from "react-native-ui-lib";
import { connect } from "react-redux";

import SecureText from "../components/SecureInput";
import ActionButton from "../../../components/Buttons/ActionButton";
import { login } from "../../../store/actions";
import { checkEmail, checkPasswords } from "../../../global/utils";

import styles from "./styles";

function SignUp({ app, login }) {
  const [email, setEmail] = useState("");
  const [password, setUpPassword] = useState("");
  const [passwordAgain, setUpPasswordAgain] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    await app.emailPasswordAuth.registerUser(email, password);
    const token = Credentials.emailPassword(email, password);
    login(token);
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
          autoCapitalize="none"
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

export default connect(
  (state) => ({
    app: state.app,
  }),
  {
    login,
  }
)(SignUp);
