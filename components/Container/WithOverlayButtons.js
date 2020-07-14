import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

import AddWithOptions from "../Buttons/AddWithOptions";
import FormTypes from "../Form/FormTypes";
import IconToggleSwitch from "../Switch/IconToggleSwitch";
import AddButton from "../Buttons/AddButton";

import { navigatePath } from "../../global/utils";

export default ({
  navigation,
  route,
  onToggle,
  toggleState = false,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{ height: "100%" }}>
      {children}

      {route.name !== "event" && route.name !== "eventlist" && (
        <View style={styles.buttons}>
          {expanded && (
            <AddWithOptions
              primaryIcon="map-marker-alt"
              primaryLabel="Event"
              onPressPrimary={() =>
                navigatePath(navigation, `modal/${FormTypes.EVENT_CREATE}`)
              }
              secondaryIcon="comment"
              secondaryLabel="Post"
              onPressSecondary={() =>
                navigatePath(navigation, `modal/${FormTypes.POST_CREATE}`)
              }
              containerStyle={styles.optionButtons}
            />
          )}
          <AddButton
            onState={toggleState}
            onPressOff={() => navigation.push(FormTypes.EVENT_CREATE)}
          />
          {onToggle && (
            <View style={{ marginTop: 10 }}>
              <IconToggleSwitch
                onToggle={onToggle}
                isOn={toggleState}
                offIcon="map-marker-alt"
                icon="comments"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const bottom = Platform.OS === "ios" ? 40 : 15;

const styles = StyleSheet.create({
  buttons: {
    position: "absolute",
    bottom: bottom,
    right: 10,
  },
  optionButtons: {
    bottom: bottom + 110,
    right: 4,
    position: "absolute",
  },
});
