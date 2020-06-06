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
      lastVisible: 0,
      complete: false,
    };
  }

  componentDidMount() {
    this.retrieveData();
    this.props.navigation.addListener("focus", async () => {
      this.loadData();
    });
  }

  loadData = () => {
    const eventIDs = Object.keys(_.pickBy(this.props.user.saved));
    // if (!this.state.complete) {
    if (eventIDs.length)
      EventModel.get({
        containsID: eventIDs.slice(0, this.state.lastVisible),
      }).then((snapshot) => {
        const event = [];
        snapshot.forEach((doc) => {
          event.push({ ...doc.data(), id: doc.id });
        });
        this.setState({
          interested: event,
          lastVisible: this.state.lastVisible + 10,
        });
      });
    else
      this.setState({
        complete: true,
      });
    // } else {

    // }
  };

  retrieveData = () => {
    const eventIDs = Object.keys(_.pickBy(this.props.user.saved));
    if (eventIDs.length) {
      try {
        EventModel.get({
          containsID: eventIDs.slice(
            this.state.lastVisible,
            this.state.lastVisible + 9
          ),
        }).then((snapshot) => {
          const event = [];
          snapshot.forEach((doc) => {
            event.push({ ...doc.data(), id: doc.id });
          });
          this.setState({
            interested: event,
            lastVisible: this.state.lastVisible + 10,
          });
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      if (this.state.interested.length)
        this.setState({
          interested: [],
          complete: true,
        });
      else this.setState({ complete: true });
    }
  };

  retrieveMoreData = () => {
    const eventIDs = Object.keys(_.pickBy(this.props.user.saved));
    if (!this.state.complete) {
      if (eventIDs.length >= this.state.lastVisible) {
        try {
          EventModel.get({
            containsID: eventIDs.slice(
              this.state.lastVisible,
              this.state.lastVisible + 9
            ),
          }).then((snapshot) => {
            const event = [];
            snapshot.forEach((doc) => {
              event.push({ ...doc.data(), id: doc.id });
            });
            if (event)
              this.setState({
                interested: [...this.state.interested, ...event],
                lastVisible: this.state.lastVisible + 10,
              });
            else this.setState({ complete: true });
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        if (!this.state.interested.length) {
          this.setState({
            interested: [],
            complete: true,
          });
        } else this.setState({ complete: true });
      }
    }
  };

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
          data={this.state.interested}
          renderItem={({ item, index }) => {
            return <EventDetail event={item} navigation={navigation} />;
          }}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Saved Events</Text>
          )}
          ListEmptyComponent={() => <Text>You have no interested events.</Text>}
          ListFooterComponent={renderFooter}
          onEndReached={this.retrieveMoreData}
          onEndReachedThreshold={5}
        />
      </SafeAreaView>
    );
  }
}

export default connect((state) => ({ user: state.user }), {})(InterestedFeed);
