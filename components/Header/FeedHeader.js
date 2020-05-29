import React from "react";
import { Text, View } from "react-native-ui-lib";

import globalStyles from "../../global/styles";
import AvatarButton from "../Buttons/AvatarButton";
import LocationLabel from "../Buttons/LocationLabel";
import IconButton from "../Buttons/IconButton";

import { forumRegions, zones } from "../../global/forumconfig";
import { getDefaultZone } from "../../global/utils";
import { Theme } from "../../global/constants";

export default ({ navigation, text, filterable }) => {
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
        {text ? (
          <Text
            color={Theme.primary}
            style={{ fontSize: 24, fontFamily: "Roboto-Bold" }}
          >
            {text}
          </Text>
        ) : (
          <LocationLabel zone={getDefaultZone()} size="large" />
        )}
      </View>
      <View absR row style={{ height: "100%", paddingRight: 10 }}>
        {filterable && (
          <View centerV>
            <IconButton
              icon="filter"
              onPress={() =>
                navigation.dispatch({
                  type: "OPEN_SHEET",
                })
              }
              size={20}
              color={Theme.primary}
              containerStyle={{ height: "100%", marginHorizontal: 10 }}
            />
          </View>
        )}
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
