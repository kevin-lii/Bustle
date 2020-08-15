import React, { Component } from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

import EventDetail from "../../components/Cards/EventDetailCard";
import { getHostedEvents } from "../../store/actions";

import styles from "./styles";

class HostedFeed extends Component {
  componentDidMount() {
    this.props.getHostedEvents();
  }

  render() {
    const { navigation, hostedEvents } = this.props;
    const renderFooter = () => {
      if (!hostedEvents) {
        return <Text>Loading...</Text>;
      } else {
        return null;
      }
    };
    return (
      <FlatList
        style={styles.scrollView}
        data={hostedEvents}
        renderItem={({ item }) => {
          return (
            <EventDetail event={item} navigation={navigation} map edit trash />
          );
        }}
        keyExtractor={(item) => item._id.toString()}
        ListEmptyComponent={() => (
          <Text marginT-10>You have no hosted events.</Text>
        )}
        ListFooterComponent={renderFooter}
      />
    );
  }
}

export default connect(
  (state) => ({
    hostedEvents: state.hostedEvents,
  }),
  {
    getHostedEvents,
  }
)(HostedFeed);
