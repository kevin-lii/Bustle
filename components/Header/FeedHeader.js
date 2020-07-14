import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { Text, View } from "react-native-ui-lib";

import globalStyles from "../../global/styles";
import IconButton from "../Buttons/IconButton";

import { Theme } from "../../global/constants";

export default ({ navigation, text, filterable }) => {
  const safeTop = useSafeArea().top;
  return (
    <View
      style={{
        height: 55 + safeTop,
        backgroundColor: "white",
        ...globalStyles.overlayElementShadow,
      }}
    >
      <View
        centerV
        absL
        style={{ marginTop: safeTop / 2, height: "100%", left: 10 }}
      >
        <Text
          color={Theme.primary}
          style={{ fontSize: 28, fontFamily: "Roboto-Medium" }}
        >
          {text}
        </Text>
      </View>
      <View
        absR
        centerV
        style={{ marginTop: safeTop / 2, height: "100%", paddingRight: 10 }}
      >
        {filterable && (
          <IconButton
            type="Font"
            icon="sliders-h"
            onPress={() => navigation.push("eventfilters")}
            size={20}
            color={Theme.primary}
            containerStyle={{ height: "100%", marginHorizontal: 10 }}
          />
        )}
      </View>
    </View>
  );
};
