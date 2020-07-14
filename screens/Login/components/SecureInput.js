import React, { useState } from "react";
import { View, TextField } from "react-native-ui-lib";

import Icons from "../../../components/Image/Icons";

export default function ({ placeholder, onChange }) {
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
          onChangeText={(text) => onChange(text)}
        ></TextField>
      </View>
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Icons
          type="Entypo"
          icon="eye"
          iconOff="eye-with-line"
          onChange={displayText}
          size={15}
          onPress={() => changeDisplayText()}
        ></Icons>
      </View>
    </View>
  );
}
