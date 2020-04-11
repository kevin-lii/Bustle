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
              primaryIcon={<Icons icon="map-marker-alt" />}
              primaryLabel="Event"
              onPressPrimary={() =>
                navigation.navigate("modal", { form: FormTypes.EVENT_CREATE })
              }
              secondaryIcon={<Icons icon="comment" />}
              secondaryLabel="Post"
              onPressPrimary={() =>
                navigation.navigate("modal", { form: FormTypes.POST_CREATE })
              }
            />
          )}
          <AddButton onPress={() => navigation.navigate("modal")} />
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
  }
});
