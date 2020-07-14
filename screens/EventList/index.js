import React from "react";
import { Text, FlatList, SafeAreaView } from "react-native";

import EventModel from "../../../models/Event";
import EventDetail from "../../../components/Cards/EventDetailCard";
import { UserContext } from "../../../dataContainers/context";
import Icons from "../../../components/Image/Icons";

import styles from "./styles";

export default class Event extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      hostedEvents: [],
      joinedEvents: [],
      editEvent: false,
      limit: 7,
      lastVisible: null,
      complete: false,
    };
    let loading = true;
  }
  componentDidMount() {
    this.retrieveInitialData();
    this.props.navigation.addListener("willFocus", async () => {
      const collection = await EventModel.getCollection();
      if (this.state.complete) {
        console.log("update");
        const host = await collection
          .where("d.host", "==", this.context.uid)
          .orderBy("d.date", "desc")
          .get();
        const tempHost = host.docs.map((doc) => ({
          id: doc.id,
          ...doc.data().d,
        }));
        const join = await collection
          .where("d.invited", "array-contains", this.context.uid)
          .orderBy("d.date", "desc")
          .get();
        const tempJoined = join.docs
          .filter((doc) => doc.data().d.host != this.context.uid)
          .map((doc) => ({ id: doc.id, ...doc.data().d }));
        this.setState({ hostedEvents: tempHost, joinedEvents: tempJoined });
      } else if (this.state.joinedEvents.length) {
        const host = await collection
          .where("d.host", "==", this.context.uid)
          .orderBy("d.date", "desc")
          .get();
        const tempHost = host.docs.map((doc) => ({
          id: doc.id,
          ...doc.data().d,
        }));
        const join = await collection
          .where("d.invited", "array-contains", this.context.uid)
          .orderBy("d.date", "desc")
          .endAt(this.state.lastVisible)
          .get();
        const tempJoined = join.docs
          .filter((doc) => doc.data().d.host != this.context.uid)
          .map((doc) => ({ id: doc.id, ...doc.data().d }));
        this.setState({ hostedEvents: tempHost, joinedEvents: tempJoined });
      } else {
        const host = await collection
          .where("d.host", "==", this.context.uid)
          .orderBy("d.date", "desc")
          .endAt(this.state.lastVisible)
          .get();
        const tempHost = host.docs.map((doc) => ({
          id: doc.id,
          ...doc.data().d,
        }));
        this.setState({ hostedEvents: tempHost });
      }
    });
  }

  retrieveInitialData = async () => {
    try {
      const collection = await EventModel.getCollection();
      const host = await collection
        .where("d.host", "==", this.context.uid)
        .orderBy("d.date", "desc")
        .limit(this.state.limit)
        .get();
      const tempHost = host.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().d,
      }));
      if (tempHost.length < this.state.limit) {
        const join = await collection
          .where("d.invited", "array-contains", this.context.uid)
          .orderBy("d.date", "desc")
          .limit(this.state.limit)
          .get();
        const tempJoined = join.docs
          .filter((doc) => doc.data().d.host != this.context.uid)
          .map((doc) => ({ id: doc.id, ...doc.data().d }));
        if (tempJoined.length)
          this.setState({
            hostedEvents: tempHost,
            joinedEvents: tempJoined,
            lastVisible: join.docs[join.docs.length - 1],
          });
        else if (tempHost.length)
          this.setState({
            hostedEvents: tempHost,
            lastVisible: host.docs[host.docs.length - 1],
          });
        else this.setState({ complete: true });
      } else {
        this.setState({
          hostedEvents: tempHost,
          lastVisible: host.docs[host.docs.length - 1],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  retrieveMoreData = async () => {
    try {
      if (!this.state.complete) {
        let tempHost = [];
        this.loading = true;
        const collection = await EventModel.getCollection();
        if (!this.state.joinedEvents.length) {
          const host = await collection
            .where("d.host", "==", this.context.uid)
            .orderBy("d.date", "desc")
            .startAfter(this.state.lastVisible)
            .limit(this.state.limit)
            .get();
          tempHost = host.docs.map((doc) => ({ id: doc.id, ...doc.data().d }));
        }
        if (tempHost.length < this.state.limit) {
          const join = await collection
            .where("d.invited", "array-contains", this.context.uid)
            .orderBy("d.date", "desc")
            .startAfter(this.state.lastVisible)
            .limit(this.state.limit)
            .get();
          const tempJoined = join.docs
            .filter((doc) => doc.data().d.host != this.context.uid)
            .map((doc) => ({ id: doc.id, ...doc.data().d }));
          if (tempJoined.length)
            this.setState({
              hostedEvents: [...this.state.hostedEvents, ...tempHost],
              joinedEvents: [...this.state.joinedEvents, ...tempJoined],
              lastVisible: join.docs[join.docs.length - 1],
            });
          else if (tempHost.length)
            this.setState({
              hostedEvents: [...this.state.hostedEvents, ...tempHost],
              lastVisible: host.docs[host.docs.length - 1],
            });
          else this.setState({ complete: true });
        } else {
          this.setState({
            hostedEvents: [...this.state.hostedEvents, ...tempHost],
            lastVisible: host.docs[host.docs.length - 1],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const changeContext = (eventID) => {
      const hostedEvents = this.state.hostedEvents;
      const temp = hostedEvents.filter((item) => item.id !== eventID);
      this.context.updateJoinedEvents(
        this.context.events.filter((item) => item != eventID)
      );
      this.setState({ hostedEvents: temp });
    };
    const toggleEditEvent = (event) => {
      this.setState({ editEvent: event });
    };

    const renderFooter = () => {
      if (this.loading) {
        return <Text>Loading...</Text>;
      } else {
        return null;
      }
    };

    let data = [];
    if (this.state.hostedEvents.length > 0) {
      data = this.state.hostedEvents.map((event, index) => {
        return (
          <EventDetail
            key={index}
            event={event}
            navigation={this.props.navigation}
            map
            edit={this.context.uid === event.host && toggleEditEvent}
            trash={this.context.uid === event.host}
            changeContext={changeContext}
            {...this.props}
          />
        );
      });
      data.unshift(
        <Text
          key={"hosted-title"}
          style={[styles.subtitle, { alignItems: "center" }]}
        >
          Hosted Events
        </Text>
      );
    }
    if (this.state.joinedEvents.length > 0) {
      data.push(
        <Text
          key={"joined-title"}
          style={[styles.subtitle, { alignItems: "center" }]}
        >
          Joined Events{" "}
          <Icons type="Feather" icon="check-circle" color="green" size={20} />
        </Text>
      );
      data = [
        ...data,
        this.state.joinedEvents.map((event, index) => {
          return (
            <EventDetail
              key={index}
              event={event}
              navigation={this.props.navigation}
              map
              changeContext={changeContext}
              {...this.props}
            />
          );
        }),
      ];
    }
    if (this.state.complete) {
      this.loading = false;
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => item}
          style={styles.scrollView}
          ListHeaderComponent={() => <Text style={styles.title}>Events</Text>}
          ListEmptyComponent={() =>
            !this.state.loading && (
              <Text>You are currently not hosting or joined any events.</Text>
            )
          }
          ListFooterComponent={renderFooter}
          onEndReached={this.retrieveMoreData}
          onEndReachedThreshold={0}
          keyExtractor={(item, index) => String(index)}
        ></FlatList>
      </SafeAreaView>
    );
  }
}
