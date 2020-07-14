import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { useSafeArea } from "react-native-safe-area-context";

import CalendarHeader from "./components/CalendarHeader";
import HostingEvents from "./HostingEvents";
import InterestedEvents from "./InterestedEvents";

export default ({ navigation, route }) => {
  const [mode, setMode] = useState(false);
  const padBottom = useSafeArea().bottom;
  return (
    <View style={{ paddingBottom: padBottom }}>
      <CalendarHeader host={mode} onToggle={() => setMode(!mode)} />
      <View padding-5 style={{ display: mode ? "flex" : "none" }}>
        <HostingEvents />
      </View>
      <View padding-5 style={{ display: mode ? "none" : "flex" }}>
        <InterestedEvents />
      </View>
    </View>
  );
};
