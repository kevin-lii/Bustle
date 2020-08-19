import React from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { View, Text, Card } from "react-native-ui-lib";
import { Badge, Image } from "react-native-elements";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import CategoriesIcon from "../Image/CategoriesIcon";
import CardIcons from "./components/CardIcons";
import { Theme } from "../../global/constants";
import { trimString } from "../../global/utils";
import Icons from "../Image/Icons";

const radius = 12;

export default ({ children, event, map, edit, trash, rsvp }) => {
  const navigation = useNavigation();
  const startDate = moment(event.startDate);
  let badge;
  if (
    event.startDate < new Date() &&
    (!event.ended || (event.endDate !== null && event.endDate > new Date()))
  ) {
    badge = (
      <View row absT padding-10 spread style={{ width: "100%" }}>
        <Badge value="Live" status="error" />
        <View
          row
          style={{
            justifyContent: "flex-end",
          }}
        >
          <Icons
            icon="fire"
            type="MaterialCommunity"
            color="#FF7100"
            size={20}
          />
          <Text
            white
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            ({event.attendees.length} Interested)
          </Text>
        </View>
      </View>
    );
  } else {
    badge = (
      <View
        absT
        padding-10
        row
        style={{
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Icons icon="fire" type="MaterialCommunity" color="#FF7100" size={20} />
        <Text
          style={{
            fontSize: 15,
            color: "white",
            fontWeight: "bold",
          }}
        >
          ({event.attendees.length} Interested)
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={() => navigation.push("event", { event })}>
      <Card
        white50
        borderRadius={radius}
        width={"100%"}
        containerStyle={styles.containerStyle}
      >
        <Image
          style={styles.image}
          source={Boolean(event.photoURL) ? { uri: event.photoURL } : null}
          PlaceholderContent={
            Boolean(event.photoURL) ? (
              <ActivityIndicator size="large" color={Theme.primary} />
            ) : null
          }
        />
        <LinearGradient
          colors={["#33333360", "#333333f0"]}
          style={styles.gradient}
        />
        {badge}
        <View row absB centerV spread padding-10>
          <View marginR-15>
            <CategoriesIcon type={event.category} size={30} color="white" />
          </View>
          <View flex paddingR-10>
            <Text style={styles.date}>
              {event.cancelled ? "Cancelled" : startDate.calendar()}
            </Text>
            <Text style={styles.name}>{trimString(event.name, 62)}</Text>
            {/* <View row centerV>
              <View marginR-10>
                <Icons
                  icon="desktop"
                  iconOff="map-marker-alt"
                  onChange={Boolean(event.link)}
                />
              </View>
              <Text color={Theme.grey}>
                {event.link
                  ? Url.parse(event.link).hostname
                  : trimString(event.location.description, 15)}
              </Text>
            </View> */}
          </View>
          <CardIcons
            navigation={navigation}
            event={event}
            rsvp={rsvp}
            trash={trash}
            edit={edit}
          />
        </View>
        {children}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    height: 145,
    borderRadius: radius,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    borderRadius: radius,
  },
  name: {
    fontSize: 18,
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
