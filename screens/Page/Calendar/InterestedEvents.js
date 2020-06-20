import React from "react";
import { Text, FlatList, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import EventDetail from "../../../components/Cards/EventDetailCard";
import EventModel from "../../../models/CollegeEvent";

import { getHostedEvents } from "../../../store/actions";
import styles from "../EventList/styles";

class InterestedFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interested: [],
      lastVisible: 0,
      complete: false,
      showHosting: false,
    };
  }

  componentDidMount() {
    this.props.getHostedEvents();
    EventModel.subscribe({ interested: true }, (snapshot) => {
      const interested = [];
      snapshot.forEach((doc) => {
        interested.push({ ...doc.data(), id: doc.id });
      });
      this.setState({ interested, complete: true });
    });
  }

  render() {
    const { navigation } = this.props;
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
          style={styles.scrollView}
          data={
            this.state.showHosting
              ? this.props.hostedEvents
              : this.state.interested
          }
          renderItem={({ item, index }) => {
            return <EventDetail event={item} navigation={navigation} edit />;
          }}
          ListEmptyComponent={() => (
            <Text marginT-10>You have no saved events.</Text>
          )}
          ListFooterComponent={renderFooter}
          onEndReached={this.retrieveMoreData}
          onEndReachedThreshold={5}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    hostedEvents: state.hostedEvents,
    user: state.user,
  }),
  {
    getHostedEvents,
  }
)(InterestedFeed);
