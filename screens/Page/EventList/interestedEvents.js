import React from "react";
import { Text, FlatList, SafeAreaView } from "react-native";
import _ from "lodash";

import EventModel from "../../../models/CollegeEvent";
import UserModel from "../../../models/User";
import EventDetail from "../../../components/Cards/EventDetailCard";
import { UserContext } from "../../../dataContainers/context";

import styles from "./styles";
import { connect } from "react-redux";

class InterestedFeed extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      interested: [],
      complete: false,
    };
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

  componentDidMount() {
    this.retrieveData();
  }

  componentDidUpdate() {
    this.retrieveData();
  }

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
          ListEmptyComponent={() =>
            this.state.complete && <Text>You have no events.</Text>
          }
        />
      </SafeAreaView>
    );
  }
}

export default connect((state) => ({ user: state.user }), {})(InterestedFeed);
