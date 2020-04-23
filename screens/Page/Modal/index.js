import React from "react";
import { View } from "react-native-ui-lib";
import EventCreate from "../../../components/Form/EventCreate";

export default ({ navigation }) => {
  return (
    <View flex style={{ backgroundColor: "white" }}>
      <EventCreate onClose={() => navigation.goBack()} />
    </View>
  );
};
