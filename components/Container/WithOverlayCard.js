import React from "react";
import { View } from "react-native-ui-lib";

import EventsList from "../MapUI/EventsListView";
import EventPreview from "../MapUI/EventBottomSheet";

export default ({ navigation, route, children }) => {
  const { params } = route;
  return (
    <View flex>
      {children}
      {route.name === "event" && (
        <EventPreview event={params.event} onClose={() => navigation.pop()} />
      )}

      {route.name === "eventlist" && (
        <EventsList
          eventList={params.events}
          navigation={navigation}
          onClose={() => navigation.goBack()}
        />
      )}
    </View>
  );
};
