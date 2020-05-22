import React from "react";
import { View, Text, Card, Image } from "react-native-ui-lib";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import IconButton from "../Buttons/IconButton";
import CategoriesIcon from "../Image/CategoriesIcon";
import CalendarToggle from "../Buttons/CalendarToggle";

import globalStyles from "../../global/styles";
import { navigatePath } from "../../global/utils";
import { Theme } from "../../global/constants";
import { StyleSheet } from "react-native";

const radius = 12;

export default ({ children, event, map, edit, trash, rsvp }) => {
  const navigation = useNavigation();
  const startDate = moment(event.startDate.toDate());

  return (
    <Card
      white50
      borderRadius={radius}
      width={"100%"}
      containerStyle={styles.containerStyle}
    >
      <Image style={styles.image} source={{ uri: event.photoURL || "" }} />
      <LinearGradient
        colors={["#33333366", "#333333ee"]}
        style={styles.gradient}
      />
      <View row absB centerV spread padding-10>
        <View flex row centerV>
          <View marginR-15>
            <CategoriesIcon type={event.category} size={30} color="white" />
          </View>
          <View>
            <Text style={styles.name}>
              {event.name.length > 23
                ? event.name.substring(0, 20) + "..."
                : event.name}
            </Text>
            <Text style={styles.date}>
              {startDate.format("MMM Do, YYYY")} at {startDate.format("h:mm a")}
            </Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "row-reverse", alignItems: "center" }}
          spread
          width={80}
        >
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
              <CalendarToggle eventID={event.id} selected={false} />
            </View>
          )}
        </View>
      </View>
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    height: 150,
    borderRadius: radius,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    borderRadius: radius,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    fontSize: 15,
    color: "white",
  },
  icon: {
    margin: 3,
  },
});
