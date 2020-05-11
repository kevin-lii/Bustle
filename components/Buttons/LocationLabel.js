import React, { useState, useEffect } from "react";
import { Picker, View, Text, ThemeManager } from "react-native-ui-lib";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
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
  onPick,
  pickerMode = "SINGLE",
}) => {
  const fontSize = size === "small" ? 15 : 24;
  const iconSize = size === "small" ? 12 : 16;
  const fontWeight = "bold";

  const labelText = regionByID[regionID]?.name || zonesByID[zone].name;
  let pickerValue = { value: regionID, label: labelText };

  if (pickerMode === "MULTI") {
    if (regionID?.length > 0)
      pickerValue = regionID.map((id) => ({
        value: id,
        label: regionByID[id]?.name,
      }));
    else pickerValue = [pickerValue];
  }

  let content = (
    <Text style={[styles.text, { fontSize, fontWeight }]}>{labelText}</Text>
  );

  const getLabel = (value) => {
    if (value instanceof Array) return value.map((v) => v.label).join(",");
    return value.label;
  };

  if (onPick)
    content = (
      <Picker
        onChange={onPick}
        mode={pickerMode}
        renderPicker={(l) => (
          <View row centerV>
            <Text style={styles.text} marginR-5>
              {getLabel(l)}
            </Text>
            <Icons
              type="Ionicons"
              icon="ios-arrow-down"
              color={Theme.secondary}
            />
          </View>
        )}
        value={pickerValue}
      >
        {zonesByID[zone].regions.map((region, i) => (
          <Picker.Item label={regionByID[region].name} value={region} key={i} />
        ))}
      </Picker>
    );

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
        {content}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: Theme.secondary,
    fontWeight: "bold",
  },
});
