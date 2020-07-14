import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import { connect } from "react-redux";

import IconButton from "../../Buttons/IconButton";
import CalendarToggle from "../../Buttons/CalendarToggle";

import { navigatePath } from "../../../global/utils";
import FormTypes from "../../Form/FormTypes";

const iconSize = 25;

const CardIcons = ({ navigation, event, trash, edit, map, rsvp, user }) => (
  <View style={{ flexDirection: "row-reverse" }} spread>
    {trash && user.uid === event.host.uid && (
      <View style={styles.icon}>
        <IconButton
          color="white"
          icon="trash"
          type="Entypo"
          size={iconSize}
          onPress={() => {
            navigation.navigate("interstitial", {
              event,
              alertType: "deleteEvent",
            });
          }}
        />
      </View>
    )}
    {edit && user.events.includes(event.id) && (
      <View style={styles.icon}>
        <IconButton
          color="white"
          icon="edit"
          type="Font"
          size={iconSize}
          onPress={() => navigation.navigate(FormTypes.EVENT_EDIT, { event })}
        />
      </View>
    )}
    {map && (
      <View style={styles.icon}>
        <IconButton
          color="white"
          icon="map-marker-alt"
          type="Fontisto"
          size={iconSize}
          onPress={() => navigatePath(navigation, "map/event", { event })}
        />
      </View>
    )}
    {rsvp && (
      <View style={styles.icon}>
        <CalendarToggle event={event} selected={false} />
      </View>
    )}
  </View>
);

export default connect((state) => ({ user: state.user }), {})(CardIcons);

const styles = StyleSheet.create({
  icon: {
    margin: 3,
  },
});
