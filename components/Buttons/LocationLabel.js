import React from "react";
import { View, Text } from "react-native-ui-lib";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icons from "../Image/Icons";

import { Theme } from "../../global/constants";
import { regionByID } from "../../global/mapconfig";

export default ({
  onPress,
  regionID,
  size = "small",
  pinIcon = true,
  editIcon = false,
}) => {
  const fontSize = size === "small" ? 13 : 20;
  const iconSize = size === "small" ? 10 : 15;
  const fontWeight = size === "small" ? "normal" : "bold";

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
          {regionByID[regionID]?.name}
        </Text>
        {editIcon && (
          <Icons
            type="MaterialIcons"
            icon="pencil"
            size={iconSize + 7}
            color={Theme.secondary}
          />
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
