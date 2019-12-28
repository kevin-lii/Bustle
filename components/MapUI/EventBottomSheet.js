import React, { useState } from "react";
import { View, Text } from "react-native";
import moment from "moment";

import Icons from "../Image/Icons";
import styles from "./styles";
import UserData from "../../models/User";

export default function({ type, event, ...props }) {
  const [loading, isLoading] = useState(true)
  const [host, setHostName] = useState("");
  UserData.get(event.host).then(doc => {
    setHostName(doc.data().displayName);
    isLoading(false)
  });

  const date = moment(event.date.toDate()).format('MMM Do, YYYY')
  const time = moment(event.time.toDate()).format('h:mm a')
  const location = event.location ? event.location.description : "See Map"

  if (loading)
    return (
      <View style={[styles.popup]}>
        <Text>Loading...</Text>
      </View>
    )
  else
    return (
      <View style={[styles.popup]}>
        <Text style={styles.popupTitle} >{event.name || "Event Name"}</Text>
        <View style={styles.info}>
          <Text style={styles.infoText}>Hosted by {host}</Text>
          <Text style={styles.infoText}>
            <Icons type="Entypo" icon="calendar" size={15}></Icons> {time} on {date}
          </Text>
          <Text style={styles.infoText}>
            <Icons type="Fontisto" icon="map-marker" size={15}></Icons> {location}
          </Text>
        </View>
      </View>
    )
}
