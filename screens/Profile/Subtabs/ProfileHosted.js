import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Text, View } from "react-native-ui-lib";

import EventModel from "../../../models/CollegeEvent";
import { getHostedEvents } from "../../../store/actions";
import EventDetail from "../../../components/Cards/EventDetailCard";

import { Theme } from "../../../global/constants";
import { attachIDs } from "../../../global/utils";

function ProfileHosted({
  navigation,
  isCurrentUser,
  user,
  getHostedEvents,
  hostedEvents,
}) {
  const [hosted, setHosted] = useState([]);
  useEffect(() => {
    if (!isCurrentUser) {
      EventModel.get({ host: user.uid }).then((events) => {
        setHosted(attachIDs(events));
      });
    } else {
      getHostedEvents();
    }
  }, []);
  const eventsHosted = isCurrentUser ? hostedEvents : hosted;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={
          eventsHosted != null && eventsHosted.length > 0
            ? styles.scrollView
            : styles.emptyView
        }
        data={eventsHosted}
        renderItem={({ item, index }) => {
          return (
            <EventDetail event={item} navigation={navigation} trash edit />
          );
        }}
        ListEmptyComponent={() => (
          <View centerH centerV style={styles.emptyText}>
            <Text text65 style={{ fontWeight: "bold" }}>
              {isCurrentUser ? "You are " : user.displayName + " is "}not
              hosting any events.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  emptyView: {
    flex: 1,
    height: "100%",
  },
  emptyText: {
    color: Theme.secondary,
    height: "100%",
  },
});

export default connect(
  (state) => ({
    hostedEvents: state.hostedEvents,
  }),
  {
    getHostedEvents,
  }
)(ProfileHosted);
