import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import CalendarHeader from "./CalendarHeader";
import HostingEvents from "./HostingEvents";
import InterestedEvents from "./InterestedEvents";

export default ({ navigation, route }) => {
  const [mode, setMode] = useState(false);
  return (
    <>
      <CalendarHeader host={mode} onToggle={() => setMode(!mode)} />
      <View style={{ display: mode ? "flex" : "none" }}>
        <HostingEvents />
      </View>
      <View style={{ display: mode ? "none" : "flex" }}>
        <InterestedEvents />
      </View>
    </>
  );
};
