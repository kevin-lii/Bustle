import React from "react";
import { Text, FlatList, SafeAreaView } from "react-native";

import EventModel from "../../../models/CollegeEvent";
import EventDetail from "../../../components/Cards/EventDetailCard";
import { UserContext } from "../../../dataContainers/context";

import styles from "./styles";

export default class CollegeEvent extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      hostedEvents: [],
      lastVisible: null,
      complete: false,
    };
  }
  componentDidMount() {
    this.retrieveInitialData();
  }

  retrieveInitialData = async () => {
    try {
      await EventModel.subscribe(
        { orderBy: "startDate", limit: 6 },
        (snapshot) => {
          const tempHost = [];
          let last = null;
          snapshot.forEach((doc) => {
            last = doc;
            tempHost.push({ ...doc.data(), id: doc.id });
          });
          if (tempHost.length)
            this.setState({
              hostedEvents: tempHost,
              lastVisible: last,
            });
          else this.setState({ complete: true });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  retrieveMoreData = async () => {
    try {
      if (!this.state.complete) {
        await EventModel.subscribe(
          {
            orderBy: "startDate",
            startAfter: this.state.lastVisible,
            limit: 6,
          },
          (snapshot) => {
            const tempHost = [];
            let last = null;
            snapshot.forEach((doc) => {
              last = doc;
              tempHost.push({ ...doc.data(), id: doc.id });
            });

            if (tempHost.length)
              this.setState({
                hostedEvents: [...this.state.hostedEvents, ...tempHost],
                lastVisible: last,
              });
            else {
              this.setState({ complete: true });
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { navigation } = this.props;
    let loading = !this.state.complete;
    const renderFooter = () => {
      console.log(this.state.complete);
      if (loading) {
        return <Text>Loading...</Text>;
      } else {
        return null;
      }
    };
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.scrollView}
          data={this.state.hostedEvents}
          renderItem={({ item, index }) => {
            return <EventDetail event={item} navigation={navigation} rsvp />;
          }}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Interested Events</Text>
          )}
          ListEmptyComponent={() =>
            this.state.complete && (
              <Text>You are currently not hosting any events.</Text>
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
