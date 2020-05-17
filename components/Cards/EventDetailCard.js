import React from "react";
import { View, Text, Card, Image } from "react-native-ui-lib";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import IconButton from "../Buttons/IconButton";
import CategoriesIcon from "../Image/CategoriesIcon";
import { Theme } from "../../global/constants";
import { navigatePath } from "../../global/utils";
import CalendarToggle from "../Buttons/CalendarToggle";

export default ({ children, event, map, edit, trash, rsvp }) => {
  const navigation = useNavigation();

  return (
    <Card
      white50
      borderRadius={12}
      width={"100%"}
      containerStyle={{
        marginTop: 10,
        marginBottom: 10,
        borderColor: Theme.primary,
        borderWidth: 2,
      }}
    >
      <Image
        style={{
          height: 180,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        source={{ uri: event.photoURL || "" }}
      ></Image>
      <View
        flex
        style={{
          height: 80,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View flex style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginRight: 15 }}>
            <CategoriesIcon type={event.category} size={30} />
          </View>
          <View>
            <Text
              style={{ fontSize: 20, color: Theme.primary, fontWeight: "bold" }}
            >
              {event.name.length > 23
                ? event.name.substring(0, 20) + "..."
                : event.name}
            </Text>
            <Text style={{ fontSize: 15, color: Theme.primary }}>
              {event.time && moment(event.time.toDate()).format("h:mm a")} on{" "}
              {event.date && moment(event.date.toDate()).format("MMM Do, YYYY")}
            </Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "row-reverse", alignItems: "center" }}
          spread
          width={80}
        >
          {trash && (
            <View style={{ margin: 3 }}>
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
            <View style={{ margin: 3 }}>
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
            <View style={{ margin: 3 }}>
              <IconButton
                icon="map-marker-alt"
                type="Fontisto"
                size={30}
                onPress={() => navigatePath(navigation, "map/event", { event })}
              />
            </View>
          )}
          {rsvp && (
            <View style={{ margin: 3 }}>
              <CalendarToggle selected={false} />
            </View>
          )}
        </View>
      </View>
      {children}
    </Card>
  );
};
