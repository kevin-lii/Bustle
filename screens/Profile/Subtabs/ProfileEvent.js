import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import EventDetail from "../../../components/Cards/EventDetailCard";

import { Theme } from "../../../global/constants";

export default class ProfileEvent extends React.Component {
  render() {
    const { navigation, isCurrentUser, user } = this.props;
    const pastEvents = user.pastEvents
      ? Array.from(user.pastEvents?.values())
      : [];
    let content;
    if (pastEvents?.length > 0) {
      content = pastEvents.map((item) => {
        return (
          <EventDetail
            key={item._id}
            event={item}
            navigation={navigation}
            trash
            edit
          />
        );
      });
    } else {
      content = (
        <View centerV centerH style={styles.emptyView}>
          <Text text65 style={{ fontWeight: "bold", textAlign: "center" }}>
            {isCurrentUser
              ? "You do not have"
              : user.displayName + " does not have"}{" "}
            any past events.
          </Text>
        </View>
      );
    }
    return (
      <View flex style={styles.container}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  emptyView: {
    color: Theme.secondary,
    marginTop: 25,
  },
});
