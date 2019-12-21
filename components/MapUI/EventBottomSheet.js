import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import Modal from "react-native-modal";
import moment from "moment";

import Icons from "../Image/Icons";
import TextButton from "../../components/Buttons/TextButton";

import styles from "./styles";
import UserData from "../../models/User";

export default function({ type, event, ...props }) {
  // alert(event.uid);
  const [host, setHostName] = useState("");
  const [atEvents, setEvents] = useState(false);
  const user = UserData.get(event.host).then(doc => {
    setHostName(doc.data().displayName);
    setEvents(doc.data().events.includes(event.uid));
  });
  const date = moment(event.date).format("dddd MMM Do, YYYY");
  return (
    <View style={[styles.popup]}>
      <Text>{event.name || "Event Name"}</Text>
      <Text>Hosted by {host}</Text>
      <Text>
        <Icons type="Entypo" icon="calendar"></Icons> Started On {date}
      </Text>
      {/* <TextButton></TextButton> */}
    </View>
  );

  {
    /* <View style={[styles.popup]}>
<TouchableWithoutFeedback>
  <Text>{event.name}</Text>
  <Text>hosted by {host}</Text>
  <Icons type="Entypo" icon="calendar"></Icons><Text>{event.date}</Text>
<TextButton></TextButton>
</TouchableWithoutFeedback>
</View> */
  }
}
