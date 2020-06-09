import React from "react";
import { View } from "react-native-ui-lib";

import globalStyles from "../../global/styles";
import AvatarButton from "../Buttons/AvatarButton";
import LocationLabel from "../Buttons/LocationLabel";
import { getDefaultZone } from "../../global/utils";
import HeaderSearch from "../Form/HeaderSearch";

export default ({ navigation }) => {
  return (
    <View
      style={{
        height: 55,
        backgroundColor: "white",
        // ...globalStyles.overlayElementShadow,
      }}
    >
      <View absL centerV style={{ height: "100%", left: 10 }}>
        <LocationLabel zone={getDefaultZone()} size="large" />
      </View>
      <View absR row style={{ height: "100%", paddingRight: 10 }}>
        <HeaderSearch />
        <AvatarButton
          onPress={() => navigation.openDrawer()}
          hasBorder
          useUser
          marginTop={7.5}
          size={40}
          shadow={false}
        />
      </View>
    </View>
  );
};
