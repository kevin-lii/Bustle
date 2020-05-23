import React from "react";
import { Text, FlatList, SafeAreaView } from "react-native";
import _ from "lodash";

import EventModel from "../../../models/CollegeEvent";
import UserModel from "../../../models/User";
import EventDetail from "../../../components/Cards/EventDetailCard";
import { UserContext } from "../../../dataContainers/context";

import styles from "./styles";

export default class InterestedFeed extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      interested: [],
      complete: false,
    };
  }

  retrieveData = async () => {
    try {
      const { saved } = await UserModel.getSavedEvents(this.context.uid);
      const savedEvents = Object.keys(_.pickBy(saved));

      await EventModel.subscribe({ containsID: savedEvents }, (snapshot) => {
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
  };

  render() {
    const { navigation } = this.props;
    this.retrieveData();
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.scrollView}
          data={this.state.interested}
          renderItem={({ item, index }) => {
            return <EventDetail event={item} navigation={navigation} />;
          }}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Interested Events</Text>
          )}
          ListEmptyComponent={() =>
            this.state.complete && <Text>You have no events.</Text>
          }
        />
      </SafeAreaView>
    );
  }
}
