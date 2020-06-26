import React from "react";
import { SafeAreaView, useSafeArea } from "react-native-safe-area-context";
import { Text, View } from "react-native-ui-lib";

import globalStyles from "../../global/styles";
import AvatarButton from "../Buttons/AvatarButton";
import LocationLabel from "../Buttons/LocationLabel";
import IconButton from "../Buttons/IconButton";

import { forumRegions, zones } from "../../global/forumconfig";
import { getDefaultZone, navigatePath } from "../../global/utils";
import { Theme } from "../../global/constants";

export default ({ navigation, text, filterable }) => {
  // const items = forumRegions
  //   .filter((region) => !region.inactive)
  //   .map((region) => ({
  //     id: region.id,
  //     text: region.name,
  //     onPress: () => navigation.push("forums", { region: region.id }),
  //   }));
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
        {text ? (
          <Text
            color={Theme.primary}
            style={{ fontSize: 28, fontFamily: "Roboto-Medium" }}
          >
            {text}
          </Text>
        ) : (
          <LocationLabel zone={getDefaultZone()} size="large" />
        )}
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
