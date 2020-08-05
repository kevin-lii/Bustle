import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Text, View } from "react-native-ui-lib";

import UserModel from "../../../models/User";
import { getHostedEvents } from "../../../store/actions";
import EventDetail from "../../../components/Cards/EventDetailCard";

import { Theme } from "../../../global/constants";

function ProfileHosted({
  navigation,
  isCurrentUser,
  user,
  realm,
  getHostedEvents,
  hostedEvents,
}) {
  const [hosted, setHosted] = useState([]);
  useEffect(() => {
    if (!isCurrentUser) {
      const getHostedEvents = Array.from(
        UserModel.get(realm, user._id).hostedEvents.values()
      );
      setHosted(getHostedEvents);
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
        keyExtractor={(item) => item._id.toString()}
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
    realm: state.realm,
  }),
  {
    getHostedEvents,
  }
)(ProfileHosted);
