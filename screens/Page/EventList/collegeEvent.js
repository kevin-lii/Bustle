import React from "react";
import { Text, FlatList, SafeAreaView } from "react-native";
import { connect } from "react-redux";

import { getEvents, getPosts } from "../../../store/actions";
import EventModel from "../../../models/CollegeEvent";
import EventDetail from "../../../components/Cards/EventDetailCard";
import { UserContext } from "../../../dataContainers/context";

import styles from "./styles";

class CollegeEvent extends React.Component {
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
        { host: this.context.uid, orderBy: "date", limit: 7 },
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
            host: this.context.uid,
            orderBy: "date",
            startAfter: this.state.lastVisible,
            limit: 7,
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
            else this.setState({ complete: true });
          }
        );
      } else {
        this.setState({ complete: true });
      }
    } catch (error) {
      console.log(error);
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
          data={this.state.hostedEvents}
          renderItem={({ item, index }) => {
            return <EventDetail event={item} navigation={navigation} rsvp />;
          }}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Hosted Events</Text>
          )}
          ListEmptyComponent={() =>
            this.state.complete && (
              <Text>You are currently not hosting any events.</Text>
            )
          }
          ListFooterComponent={renderFooter}
          onEndReached={this.retrieveMoreData}
          onEndReachedThreshold={0}
        />
      </SafeAreaView>
    );
  }
}
export default connect(
  (state) => ({
    events: state.events,
  }),
  {
    getEvents,
  }
)(CollegeEvent);
