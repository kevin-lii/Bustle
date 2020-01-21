import React, { useState, useEffect, useContext } from "react";
import { Text, ScrollView, SafeAreaView, View } from "react-native";
import { withNavigation } from "react-navigation";

import EventData from "../../../models/Event";
import EventDetail from "../../../components/Window/EventDetailCard";
import { UserContext } from "../../../dataContainers/context";

import styles from "./styles";

const Event = ({ navigation, ...props }) => {
  const user = useContext(UserContext);
  const hostedEvents = user.hostedEvents;
  const [events, setEvents] = useState({
    eventCheck: null,
    joinedEvents: [],
    unjoinedEvents: []
  });
  const [loaded, setLoaded] = useState(false);

  const changeContext = eventID => {
    user.updateHostedEvents(hostedEvents.filter(item => item.id !== eventID));
    const temp = joinedEvents.filter(item => item.id !== eventID);
    user.updateJoinedEvents(temp.map(item => item.id));
    setJoinedEvents(temp);
  };

  useEffect(() => {
    EventData.get({}, snapshot => {
      if (snapshot != events.eventCheck) {
        const tempEventList = [];
        const tempJoinedEvents = [];
        snapshot.forEach(doc => {
          if (user && !user.events.includes(doc.id))
            tempEventList.push({ ...doc.data(), id: doc.id });
          else tempJoinedEvents.push({ ...doc.data(), id: doc.id });
        });
        setEvents({
          unjoinedEvents: tempEventList,
          joinedEvents: tempJoinedEvents,
          eventCheck: snapshot
        });
        setLoaded(true);
      }
    });
    navigation.addListener("willFocus", () => {
      console.log("listener");
      EventData.get({}, snapshot => {
        if (
          snapshot != events.eventCheck ||
          user.events != joinedEvents.map(item => item.id)
        ) {
          const tempEventList = [];
          const tempJoinedEvents = [];
          snapshot.forEach(doc => {
            if (user && !user.events.includes(doc.id))
              tempEventList.push({ ...doc.data(), id: doc.id });
            else tempJoinedEvents.push({ ...doc.data(), id: doc.id });
          });
          setEvents({
            unjoinedEvents: tempEventList,
            joinedEvents: tempJoinedEvents,
            eventCheck: snapshot
          });
          setLoaded(true);
          console.log("listenerDone");
        }
      });
    });
  }, []);

  let joined;
  let unjoined;
  if (events.joinedEvents.length > 0)
    joined = (
      <View>
        <Text style={styles.subtitle}>Joined Events</Text>
        {events.joinedEvents
          // .sort((a, b) => b.date - a.date)
          .map((event, index) => {
            return (
              <EventDetail
                key={index}
                event={event}
                navigation={navigation}
                map
                trash={user.uid === event.host}
                changeContext={changeContext}
                {...props}
              />
            );
          })}
      </View>
    );
  if (events.unjoinedEvents.length > 0) {
    unjoined = (
      <View>
        <Text style={styles.subtitle}>Unjoined Events</Text>
        {events.unjoinedEvents
          // .sort((a, b) => b.date - a.date)
          .map((event, index) => {
            return (
              <EventDetail
                key={index}
                event={event}
                navigation={navigation}
                map
                trash={user.uid === event.host}
                changeContext={changeContext}
                {...props}
              />
            );
          })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Events</Text>
        {!loaded && <Text>Loading...</Text>}
        {loaded && joined}
        {loaded && unjoined}
        {loaded && !joined && !unjoined && (
          <Text>There are no ongoing events currently.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default withNavigation(Event);
