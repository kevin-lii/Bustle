import React, { useRef } from "react";
import { View, Text, Picker, TagsInput } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

import { Theme } from "../../global/constants";
import Icons from "../Image/Icons";

const Pill = ({ label, size, pillColor, color }) => (
  <View
    row
    centerV
    style={{
      backgroundColor: label === "Add" ? "white" : pillColor,
      marginRight: 10,
      marginBottom: 5,
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 100,
      borderWidth: label === "Add" ? StyleSheet.hairlineWidth : 0,
    }}
  >
    <View marginR-5>
      <Icons
        icon={label === "Add" ? "plus-a" : "close-a"}
        color={label === "Add" ? Theme.primary : "white"}
        size={10}
      />
    </View>
    <Text
      style={{ fontSize: size || 20 }}
      color={label === "Add" ? Theme.primary : color}
    >
      {label}
    </Text>
  </View>
);

export default ({
  onChange,
  value,
  data,
  size,
  pillColor = Theme.primary,
  color = "white",
}) => {
  const picker = useRef();

  const getLabel = (value) => {
    if (value instanceof Array) {
      if (value.length > 0) return value.map((v) => v.label);
      return "Any";
    }
    return value.label;
  };

  return (
    <Picker
      ref={picker}
      onChange={onChange}
      mode="MULTI"
      renderPicker={(v) => (
        <TagsInput
          hideUnderline
          text40
          editable={false}
          containerStyle={{ marginTop: 4.75, flexWrap: "wrap" }}
          getLabel={getLabel}
          tags={[{ label: "Add" }, ...v]}
          renderTag={({ label }) => (
            <Pill
              size={size}
              label={label}
              pillColor={pillColor}
              color={color}
            />
          )}
          onTagPress={(index) => {
            if (index === 0) return picker.current.toggleExpandableModal(true);
            onChange(value.filter((_, i) => i != index - 1));
          }}
        />
      )}
      value={value}
      showSearch
      listProps={{
        keyboardShouldPersistTaps: "always",
      }}
    >
      {data.map(({ label, value }, i) => (
        <Picker.Item label={label} value={value} key={i} />
      ))}
    </Picker>
  );
};
