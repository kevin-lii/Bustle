import React, { useState, useEffect, useContext } from "react";
import { Text, ScrollView, SafeAreaView, View } from "react-native";
import { withNavigation } from "react-navigation";

import EventModel from "../../../models/Event";
import EventDetail from "../../../components/Window/EventDetailCard";
import { UserContext } from "../../../dataContainers/context";
import Icons from "../../../components/Image/Icons";

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

  useEffect(() => {
    EventModel.get({}, snapshot => {
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
      EventModel.get({}, snapshot => {
        if (
          snapshot != events.eventCheck ||
          user.events != events.joinedEvents.map(item => item.id)
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
        }
      });
    });
  }, []);

  let joined;
  let unjoined;
  if (events.joinedEvents.length > 0)
    joined = (
      <View>
        <Text style={[styles.subtitle, { alignItems: "center" }]}>
          Joined Events{" "}
          <Icons type="Feather" icon="check-circle" color="green" size={20} />
        </Text>
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
