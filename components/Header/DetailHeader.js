import React from "react";
import { Text, View } from "react-native-ui-lib";

import IconButton from "../Buttons/IconButton";
import LocationLabel from "../Buttons/LocationLabel";

import globalStyles from "../../global/styles";

export default ({ navigation, route, regionID }) => (
  <View
    row
    style={{
      height: 55,
      backgroundColor: "white",
      ...globalStyles.overlayElementShadow,
    }}
  >
    <View centerV style={{ height: "100%", left: 10 }}>
      <IconButton
        type="MaterialIcons"
        icon="arrow-left"
        onPress={navigation.goBack}
      />
    </View>
    <View centerV marginL-20>
      <LocationLabel regionID={regionID} onPress={() => {}} size="large" />
    </View>
    <View style={{ height: "100%" }}></View>
  </View>
);
