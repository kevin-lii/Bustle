import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { withNavigation } from "react-navigation";

import Icons from "../../../components/Image/Icons";
import EventDetail from "../../../components/Window/EventDetailCard";
import { UserContext } from "../../../dataContainers/context";

import styles from "./styles";

class MyEvents extends React.Component {
  static contextType = UserContext;
  state = { hostedEvents: this.context.hostedEvents };

  componentDidMount() {
    this.setState({ hostedEvents: this.context.hostedEvents });
    this.props.navigation.addListener("willFocus", () => {
      if (this.state.hostedEvents.length != this.context.hostedEvents.length) {
        this.setState({ hostedEvents: this.context.hostedEvents });
      }
    });
  }

  render() {
    const { navigation, ...props } = this.props;
    const changeContext = eventID => {
      this.context.updateHostedEvents(
        this.state.hostedEvents.filter(item => item.id !== eventID)
      );
      this.context.updateJoinedEvents(
        this.context.events.filter(item => item !== eventID)
      );
      this.setState({ hostedEvents: this.context.hostedEvents });
    };
    let events;
    if (this.state.hostedEvents.length > 0)
      events = this.state.hostedEvents.map((event, index) => (
        <EventDetail
          key={index}
          event={event}
          navigation={navigation}
          map
          trash
          changeContext={changeContext}
          {...props}
        />
      ));
    else events = <Text>You have not hosted any events.</Text>;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignSelf: "flex-end",
              marginRight: 25,
              marginTop: 20
            }}
          >
            <Icons
              icon="close-a"
              type="Fontisto"
              size={25}
              onPress={() => navigation.goBack(null)}
            />
          </View>
          <Text style={styles.title}>My Events</Text>
          {events}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withNavigation(MyEvents);
