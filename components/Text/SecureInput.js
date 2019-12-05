import React, { useState } from "react";
import { View, TextInput } from "react-native";

import Icons from "../Image/Icons";

export default function({ placeholder, onChange }) {
  const [displayText, changeDisplay] = useState(true);
  function changeDisplayText() {
    changeDisplay(!displayText);
  }

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={displayText}
        onChangeText={text => onChange(text)}
      ></TextInput>
      <Icons
        type="Entypo"
        icon="eye"
        iconOff="eye-with-line"
        uponChange={displayText}
        size={15}
        onPress={() => changeDisplayText()}
      ></Icons>
    </View>
  );
}
