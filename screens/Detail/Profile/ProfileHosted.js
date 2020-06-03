import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Text, View } from "react-native-ui-lib";

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
  useEffect(() => {
    getHostedEvents({ host: user.uid });
    navigation.addListener("focus", async () => {
      getHostedEvents({ host: user.id });
    });
  }, []);
  // const [hostedEvents, setHosted] = useState([]);
  // async function retrieveData() {
  //   const tempHost = await EventModel.get({ host: user.uid });
  //   setHosted(attachIDs(tempHost));
  // }
  // useEffect(() => {
  //   retrieveData();
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.scrollView}
        data={hostedEvents}
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
