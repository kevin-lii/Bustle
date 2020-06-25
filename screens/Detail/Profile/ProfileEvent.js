import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import EventModel from "../../../models/CollegeEvent";
import EventDetail from "../../../components/Cards/EventDetailCard";
import { Theme } from "../../../global/constants";

export default class ProfileEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastEvents: [],
      lastVisible: 0,
      complete: false,
    };
  }
  componentDidMount() {
    this.retrieveInitialData();
  }

  retrieveInitialData = () => {
    try {
      if (this.props.user?.pastEvents?.length)
        EventModel.get({
          containsID: this.props.user.pastEvents.slice(0, 9),
        }).then((snapshot) => {
          const tempPast = [];
          snapshot.forEach((doc) => {
            tempPast.push({ ...doc.data(), id: doc.id });
          });
          if (tempPast.length == 10)
            this.setState({
              pastEvents: tempPast,
              lastVisible: this.state.lastVisible + 10,
            });
          else if (tempPast.length < 10 && tempPast.length > 0)
            this.setState({
              pastEvents: tempPast,
              lastVisible: this.state.lastVisible + 10,
              complete: true,
            });
          else this.setState({ complete: true });
        });
      else this.setState({ complete: true });
    } catch (error) {
      console.log(error);
    }
  };

  retrieveMoreData = () => {
    try {
      if (!this.state.complete) {
        if (this.props.user?.pastEvents?.length >= this.state.lastVisible)
          EventModel.get({
            containsID: this.props.user.pastEvents.slice(
              this.state.lastVisible,
              this.state.lastVisible + 9
            ),
          }).then((snapshot) => {
            const tempPast = [];
            snapshot.forEach((doc) => {
              tempPast.push({ ...doc.data(), id: doc.id });
            });

            if (tempPast.length == 10)
              this.setState({
                pastEvents: [...this.state.pastEvents, ...tempPast],
                lastVisible: this.state.lastVisible + 10,
              });
            else if (tempPast.length < 10 && tempPast.length > 0)
              this.setState({
                pastEvents: [...this.state.pastEvents, ...tempPast],
                lastVisible: this.state.lastVisible + 10,
                complete: true,
              });
            else this.setState({ complete: true });
          });
        else this.setState({ complete: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { navigation, isCurrentUser, user } = this.props;
    const renderFooter = () => {
      if (!this.state.complete) {
        return <Text>Loading...</Text>;
      } else {
        return null;
      }
    };
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={
            this.state.pastEvents && this.state.pastEvents.length > 0
              ? styles.scrollView
              : styles.emptyView
          }
          data={this.state.pastEvents}
          renderItem={({ item, index }) => {
            return <EventDetail event={item} navigation={navigation} />;
          }}
          ListEmptyComponent={() =>
            this.state.complete && (
              <View centerV center style={styles.emptyText}>
                <Text text65 style={{ fontWeight: "bold" }}>
                  {isCurrentUser ? "You have " : user.displayName + " has "}no
                  past events.
                </Text>
              </View>
            )
          }
          ListFooterComponent={renderFooter}
          onEndReached={this.retrieveMoreData}
          onEndReachedThreshold={5}
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
