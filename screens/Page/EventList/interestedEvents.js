import React from "react";
import { Text, FlatList, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import EventDetail from "../../../components/Cards/EventDetailCard";
import EventModel from "../../../models/CollegeEvent";

import styles from "./styles";

class InterestedFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interested: [],
    };
  }

  componentDidMount() {
    this.retrieveData();
    this.props.navigation.addListener("focus", async () => {
      console.log("update");
      this.retrieveData();
    });
  }

  retrieveData = () => {
    const eventIDs = Object.keys(_.pickBy(this.props.user.saved));
    if (eventIDs.length) {
      try {
        EventModel.subscribe({ containsID: eventIDs }, (snapshot) => {
          const event = [];
          snapshot.forEach((doc) => {
            event.push({ ...doc.data(), id: doc.id });
          });
          this.setState({
            interested: event,
          });
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      if (this.state.interested.length) this.setState({ interested: [] });
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.scrollView}
          data={this.state.interested}
          renderItem={({ item, index }) => {
            return <EventDetail event={item} navigation={navigation} />;
          }}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Saved Events</Text>
          )}
          ListEmptyComponent={() => <Text>You have no events.</Text>}
        />
      </SafeAreaView>
    );
  }
}

export default connect((state) => ({ user: state.user }), {})(InterestedFeed);
