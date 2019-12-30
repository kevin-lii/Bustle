import React, { useState } from "react";
import { Alert, View, Text, TextField } from "react-native-ui-lib";
import auth from "@react-native-firebase/auth";

import SecureText from "../../../components/Text/SecureInput";
import { checkName, checkEmail, checkPasswords } from "../../../utils";
import UserData from "../../../models/User";
import ActionButton from "../../../components/Buttons/ActionButton";

// import styles from "./styles";

export default function SignUp({ navigation }) {
  const [megaState, setMegaState] = useState({
    email: "",
    firstName: "",
    lastName: ""
  });
  const [password, setUpPassword] = useState("");
  const [passwordAgain, setUpPasswordAgain] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const stateCopy = Object.assign({}, megaState);
      await UserData.create(stateCopy);
      alert("hello");
    } catch (e) {
      console.log("error");
    }
  };

  async function validateSubmission() {
    resetError();
    try {
      checkEmail(megaState.email);
      checkPasswords(password, passwordAgain);
      checkName(megaState.firstName, megaState.lastName);
      await auth().createUserWithEmailAndPassword(megaState.email, password);
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

  async function facebookRegister() {}
  return (
    <View flex spreads>
      <View flex centerV>
        <TextField
          placeholder="First name"
          onChangeText={text => setMegaState({ ...megaState, firstName: text })}
        ></TextField>
        <TextField
          placeholder="Last name"
          onChangeText={text => setMegaState({ ...megaState, lastName: text })}
        ></TextField>
        <TextField
          placeholder="Email"
          onChangeText={text => setMegaState({ ...megaState, email: text })}
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
        <Text>{error}</Text>
        <ActionButton onPress={validateSubmission} text="Sign up" />

        <ActionButton onPress={facebookRegister} text="Facebook" />

        {/* <TextButton onPress={() => navigation.navigate("Login")} text="Login" /> */}

        {/* <LoginButton onLoginFinished={facebookLogin} /> */}

        {/* <TouchableOpacity onPress={googleLogin}>
    <Text>Login</Text>
  </TouchableOpacity> */}
      </View>
    </View>
  );
}
