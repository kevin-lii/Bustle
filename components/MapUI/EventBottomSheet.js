import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import Modal from "react-native-modal";

import Icons from "../Image/Icons";
import TextButton from "../../components/Buttons/TextButton";

import styles from "./styles";

export default function({ type, event, ...props }) {
  // const host = User.get
  return (
    <View style={[styles.popup]}>
      <TouchableWithoutFeedback>
        <Text>hosted by {event}</Text>
      </TouchableWithoutFeedback>
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
  // </BottomSheet>
}
