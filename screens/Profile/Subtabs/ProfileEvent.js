import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import EventDetail from "../../../components/Cards/EventDetailCard";

import { Theme } from "../../../global/constants";

export default class ProfileEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastEvents: [],
    };
  }

  render() {
    const { navigation, isCurrentUser, user } = this.props;
    const getPastEvents = Array.from(user.pastEvents.values());
    const renderFooter = () => {
      if (!getPastEvents) {
        return <Text>Loading...</Text>;
      } else {
        return null;
      }
    };
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={
            getPastEvents && getPastEvents.length > 0
              ? styles.scrollView
              : styles.emptyView
          }
          data={getPastEvents}
          renderItem={({ item, index }) => {
            return <EventDetail event={item} navigation={navigation} />;
          }}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={() => (
            <View centerH centerV style={styles.emptyText}>
              <Text text65 style={{ fontWeight: "bold" }}>
                {isCurrentUser ? "You have " : user.displayName + " has "}no
                past events.
              </Text>
            </View>
          )}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
