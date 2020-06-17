import React, { useState, useEffect } from "react";
import { Picker, View, Text } from "react-native-ui-lib";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import Icons from "../Image/Icons";

import { Theme } from "../../global/constants";
import collegeByID from "../../global/colleges.json";
import { getDefaultZone } from "../../global/utils";

export default ({
  onPress,
  zone = getDefaultZone(),
  color = Theme.primary,
  regionID,
  size = "small",
  pinIcon = true,
  onPick,
  pickerMode = "SINGLE",
}) => {
  const fontSize = size === "small" ? 15 : 24;
  const iconSize = size === "small" ? 12 : 16;
  const fontWeight = "bold";

  const labelText = collegeByID[getDefaultZone()]["ALIAS"];
  let pickerValue = { value: zone, label: labelText };

  if (pickerMode === "MULTI") {
    if (regionID?.length > 0)
      pickerValue = regionID.map((id) => ({
        value: id,
        label: regionByID[id]?.name,
      }));
    else pickerValue = [pickerValue];
  }

  let content = (
    <Text style={[styles.text, { fontSize, fontWeight, color }]}>
      {labelText}
    </Text>
  );

  const getLabel = (value) => {
    if (value instanceof Array) return value.map((v) => v.label).join(", ");
    return value.label;
  };

  if (onPick)
    content = (
      <Picker
        onChange={onPick}
        mode={pickerMode}
        renderPicker={(l) => (
          <View row centerV>
            <Text style={styles.text} marginR-5 color={color}>
              {getLabel(l)}
            </Text>
            <Icons type="Ionicons" icon="ios-arrow-down" color={color} />
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
            <Icons icon="map-marker-alt" size={iconSize} color={color} />
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
    fontWeight: "bold",
  },
});
