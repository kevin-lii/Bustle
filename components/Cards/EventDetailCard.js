import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Card, Image } from "react-native-ui-lib";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { parseDomain, fromUrl } from "parse-domain";

import CategoriesIcon from "../Image/CategoriesIcon";
import CardIcons from "./components/CardIcons";
import Icons from "../Image/Icons";

import { trimString } from "../../global/utils";
import { Theme } from "../../global/constants";

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
        colors={["#33333360", "#333333f0"]}
        style={styles.gradient}
      />
      <View row absB centerV spread padding-10>
        <View marginR-15>
          <CategoriesIcon type={event.category} size={30} color="white" />
        </View>
        <View flex paddingR-10>
          <Text style={styles.date}>{startDate.calendar()}</Text>
          <Text style={styles.name}>{trimString(event.name, 62)}</Text>
        </View>
        <CardIcons rsvp={rsvp} trash={trash} eventID={event.id} />
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
