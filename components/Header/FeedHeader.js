import React from "react";
import { View } from "react-native-ui-lib";

import globalStyles from "../../global/styles";
import AvatarButton from "../Buttons/AvatarButton";

import { forumRegions, zones } from "../../global/forumconfig";
import { getDefaultZone } from "../../global/utils";
import LocationLabel from "../Buttons/LocationLabel";

export default ({ navigation, route }) => {
  // const items = forumRegions
  //   .filter((region) => !region.inactive)
  //   .map((region) => ({
  //     id: region.id,
  //     text: region.name,
  //     onPress: () => navigation.push("forums", { region: region.id }),
  //   }));

  return (
    <View
      style={{
        height: 55,
        backgroundColor: "white",
        ...globalStyles.overlayElementShadow,
      }}
    >
      <View absL centerV style={{ height: "100%", left: 10 }}>
        <LocationLabel
          zone={getDefaultZone()}
          regionID={route.params?.region}
          onPress={() => {}}
          size="large"
        />
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
};
