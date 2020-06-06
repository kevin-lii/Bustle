import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Text, View } from "react-native-ui-lib";

import EventModel from "../../../models/CollegeEvent";
import { getHostedEvents } from "../../../store/actions";
import EventDetail from "../../../components/Cards/EventDetailCard";
import { Theme } from "../../../global/constants";

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
      EventModel.get({ host: user.uid }).then((events) => setHosted(events));
    } else {
      getHostedEvents();
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.scrollView}
        data={isCurrentUser ? hostedEvents : hosted}
        renderItem={({ item, index }) => {
          return <EventDetail event={item} navigation={navigation} />;
        }}
        ListEmptyComponent={() => (
          <View centerV center style={styles.emptyText}>
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
  emptyText: {
    marginTop: 200,
    color: Theme.secondary,
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
