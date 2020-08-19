import React, { useState } from "react";
import { View, TextField } from "react-native-ui-lib";

import Icons from "../../../components/Image/Icons";

export default function ({ placeholder, onChange, centered, color }) {
  const [displayText, changeDisplay] = useState(true);
  function changeDisplayText() {
    changeDisplay(!displayText);
  }

  return (
    <View row>
      <View flex centerV>
        <TextField
          placeholder={placeholder}
          secureTextEntry={displayText}
          autoCapitalize="none"
          onChangeText={(text) => onChange(text)}
          centered={centered}
          underlineColor={color}
          placeholderTextColor={color}
          color={color}
          textAlign="center"
          textContentType="password"
        ></TextField>
      </View>
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Icons
          type="Entypo"
          icon="eye"
          iconOff="eye-with-line"
          onChange={displayText}
          color={color}
          size={15}
          onPress={() => changeDisplayText()}
        ></Icons>
      </View>
    </View>
  );
}
