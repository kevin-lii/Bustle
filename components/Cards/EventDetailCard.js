import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { View, Text, Card, Image } from "react-native-ui-lib";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import Url from "url";

import CategoriesIcon from "../Image/CategoriesIcon";
import CardIcons from "./components/CardIcons";
import { trimString } from "../../global/utils";
import Icons from "../Image/Icons";
import { Theme } from "../../global/constants";
import { Avatar, Badge } from "react-native-elements";
import { Icon } from "react-native-elements";

const radius = 12;

export default ({
  children,
  event,
  map,
  edit,
  trash,
  rsvp,
  path = "event",
}) => {
  const navigation = useNavigation();
  const startDate = moment(event.startDate.toDate());
  let badge;
  if (event.startDate.toDate() < new Date()) {
    if (event.endDate !== null) {
      if (event.endDate.toDate() > new Date()) {
        badge = (
          <View
            absT
            padding-10
            style={{ flexDirection: "row", paddingTop: "3%" }}
          >
            <Badge value="Live" status="error" />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingLeft: "55%",
              }}
            >
              <Icon name="fire" type="material-community" color="#FF7100" />
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                  marginTop: "1.5%",
                }}
              >
                ({event.attendees.length} Interested)
              </Text>
            </View>
          </View>
        );
      }
    } else {
      badge = (
        <View
          absT
          padding-10
          style={{ flexDirection: "row", paddingTop: "3%" }}
        >
          <Badge value="Live" status="error" />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingLeft: "55%",
            }}
          >
            <Icon name="fire" type="material-community" color="#FF7100" />
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
                marginTop: "1.5%",
              }}
            >
              ({event.attendees.length} Interested)
            </Text>
          </View>
        </View>
      );
    }
  } else {
    badge = (
      <View
        absT
        padding-10
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingLeft: "65%",
        }}
      >
        <Icon name="fire" type="material-community" color="#FF7100" />
        <Text
          style={{
            fontSize: 15,
            color: "white",
            fontWeight: "bold",
            marginTop: "1.5%",
          }}
        >
          ({event.attendees.length} Interested)
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={() => navigation.push(path, { event })}>
      <Card
        white50
        borderRadius={radius}
        width={"100%"}
        containerStyle={styles.containerStyle}
      >
        <Image style={styles.image} source={{ uri: event.photoURL || "" }} />
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
