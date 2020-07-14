import React from "react";
import { Text, FlatList, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import EventDetail from "../../components/Cards/EventDetailCard";
import { getHostedEvents, getSavedEvents } from "../../store/actions";

import styles from "./styles";

class InterestedFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHosting: false,
    };
  }

  componentDidMount() {
    this.props.getHostedEvents();
    this.props.getSavedEvents({ active: true });
  }

  render() {
    const { navigation } = this.props;
    const renderFooter = () => {
      if (!this.props.savedEvents || !this.props.hostedEvents) {
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
              : this.props.savedEvents
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
    savedEvents: state.savedEvents,
    user: state.user,
  }),
  {
    getHostedEvents,
    getSavedEvents,
  }
)(InterestedFeed);
