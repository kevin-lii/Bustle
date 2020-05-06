import React from "react";
import { View, Text } from "react-native-ui-lib";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icons from "../Image/Icons";

import { Theme } from "../../global/constants";
import { regionByID, zonesByID } from "../../global/forumconfig";
import { getDefaultZone } from "../../global/utils";

export default ({
  onPress,
  zone = getDefaultZone(),
  regionID,
  size = "small",
  pinIcon = true,
  editIcon = false,
}) => {
  const fontSize = size === "small" ? 15 : 24;
  const iconSize = size === "small" ? 12 : 16;
  const fontWeight = "bold";

  return (
    <TouchableOpacity onPress={onPress}>
      <View row centerV style={styles.label}>
        {pinIcon && (
          <View marginR-5>
            <Icons
              icon="map-marker-alt"
              size={iconSize}
              color={Theme.secondary}
            />
          </View>
        )}
        <Text style={[styles.text, { fontSize, fontWeight }]}>
          {regionByID[regionID]?.name || zonesByID[zone].name}
        </Text>
        {editIcon && (
          <View marginL-5>
            <Icons
              type="Ionicons"
              icon="ios-arrow-down"
              size={iconSize}
              color={Theme.secondary}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    alignItems: "center",
  },
  text: {
    color: Theme.secondary,
  },
});
