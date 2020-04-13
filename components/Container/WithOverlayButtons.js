import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

import AddWithOptions from "../Buttons/AddWithOptions";
import Icons from "../Image/Icons";
import FormTypes from "../Form/FormTypes";
import IconToggleSwitch from "../Form/IconToggleSwitch";
import AddButton from "../Buttons/AddButton";

export default ({
  navigation,
  route,
  onToggle,
  toggleState = false,
  children
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View flex>
      {children}

      {route.name !== "event" && route.name !== "eventlist" && (
        <View style={styles.buttons}>
          {expanded && (
            <AddWithOptions
              primaryIcon="map-marker-alt"
              primaryLabel="Event"
              onPressPrimary={() =>
                navigation.navigate("modal", { form: FormTypes.EVENT_CREATE })
              }
              secondaryIcon="comment"
              secondaryLabel="Post"
              onPressSecondary={() =>
                navigation.navigate("modal", { form: FormTypes.POST_CREATE })
              }
              containerStyle={styles.optionButtons}
            />
          )}
          <AddButton onPress={() => setExpanded(!expanded)} />
          {onToggle && (
            <View style={{ marginTop: 10 }}>
              <IconToggleSwitch
                onToggle={onToggle}
                isOn={toggleState}
                icon="map"
                offIcon="comments"
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
    right: 20
  },
  optionButtons: {
    bottom: bottom + 110,
    right: 6,
    position: "absolute"
  }
});
