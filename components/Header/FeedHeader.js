import React from "react";
import { View } from "react-native-ui-lib";

import globalStyles from "../../global/styles";
import AvatarButton from "../Buttons/AvatarButton";
import LocationLabel from "../Buttons/LocationLabel";
import IconButton from "../Buttons/IconButton";

import { forumRegions, zones } from "../../global/forumconfig";
import { getDefaultZone } from "../../global/utils";
import { Theme } from "../../global/constants";

export default ({ navigation, regionID, setRegion, openFilters }) => {
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
          regionID={regionID}
          onPick={(values) =>
            setRegion(values.filter((v) => v.value != null).map((v) => v.value))
          }
          pickerMode="MULTI"
          size="large"
        />
      </View>
      <View absR row style={{ height: "100%" }}>
        <View>
          <IconButton
            icon="filter"
            onPress={openFilters}
            size={20}
            color={Theme.secondary}
            fullSize
          />
        </View>
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
