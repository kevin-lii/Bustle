import React, { useRef } from "react";
import { Picker, TagsInput } from "react-native-ui-lib";

import Pill from "../Buttons/PillButton";

export default ({ onChange, value, data, size, color = "white" }) => {
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
              fontSize={size}
              label={label}
              color={color}
              active={label !== "Add"}
              icon={label === "Add" ? "plus" : "times"}
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
