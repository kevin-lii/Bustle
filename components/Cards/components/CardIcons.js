import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

import IconButton from "../../Buttons/IconButton";
import CalendarToggle from "../../Buttons/CalendarToggle";

import { navigatePath } from "../../../global/utils";

export default ({ trash, edit, map, rsvp, eventID }) => (
  <View style={{ flexDirection: "row-reverse" }} marginR-10 spread>
    {trash && (
      <View style={styles.icon}>
        <IconButton
          icon="trash"
          type="Entypo"
          size={30}
          onPress={() => {
            EventModel.remove(event);
          }}
        />
      </View>
    )}
    {edit && (
      <View style={styles.icon}>
        <IconButton
          icon="pencil"
          type="Entypo"
          size={30}
          onPress={() => {
            edit(event);
          }}
        />
      </View>
    )}
    {map && (
      <View style={styles.icon}>
        <IconButton
          icon="map-marker-alt"
          type="Fontisto"
          size={30}
          onPress={() => navigatePath(navigation, "map/event", { event })}
        />
      </View>
    )}
    {rsvp && (
      <View style={styles.icon}>
        <CalendarToggle eventID={eventID} selected={false} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  icon: {
    margin: 3,
  },
});
