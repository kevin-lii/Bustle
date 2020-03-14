import React, { useContext, useState } from "react";
import { View, Text, Card } from "react-native-ui-lib";
import moment from "moment";

import IconButton from "../Buttons/IconButton";
import EventModel from "../../models/Event";
import { Theme } from "../../constants";
import { navigateEvent, categoriesIcon } from "../../utils";

export default ({ children, event, navigation, map, trash }) => (
  <Card
    flex
    white50
    borderRadius={12}
    row
    height={80}
    width={"100%"}
    containerStyle={[
      {
        marginBottom: 20,
        borderColor: Theme.primary,
        borderWidth: 2,
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center"
      }
    ]}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ marginRight: 15 }}>
        {categoriesIcon({ type: event.category, color: "black", size: 30 })}
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
      <View style={{ flexDirection: "row-reverse" }} spread width={80}>
        {trash && (
          <View>
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
        {map && (
          <View>
            <IconButton
              icon="map"
              type="Entypo"
              size={30}
              onPress={() => navigateEvent({ navigation, event, events: null })}
            />
          </View>
        )}
      </View>
    </View>
    {children}
  </Card>
);
