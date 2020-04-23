import React from "react";
import { View } from "react-native-ui-lib";

import globalStyles from "../../global/styles";
import AvatarButton from "../Buttons/AvatarButton";

export default ({ navigation, component }) => (
  <View
    style={[
      { height: 55, backgroundColor: "white" },
      globalStyles.overlayElementShadow,
    ]}
  >
    <View absL style={{ height: "100%" }}>
      {component}
    </View>
    <View absR style={{ height: "100%" }}>
      <AvatarButton
        onPress={() => navigation.openDrawer()}
        hasBorder
        useUser
        marginTop={7.5}
        marginRight={8}
        size={40}
        shadow={false}
      />
    </View>
  </View>
);
