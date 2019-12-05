import React, { useState, useEffect } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";

import Marker from "../../../components/MapUI/Marker";
import EventDetails from "../../../components/MapUI/EventBottomSheet";

import styles from "./styles";

import EventData from '../../../models/Event';
import firestore from '@react-native-firebase/firestore'


export default function Map() {
  const [eventSet, setEventSet] = useState([]);
  const [eventDetails, openEventDetails] = useState();
  const [visible, changeVisibility] = useState(false);

  const toggleOverlay = () => changeVisibility(!visible);

  const turnOffOverlay = () => changeVisibility(false);

  EventData.get({}, snapshot => {
    eventList = []
    snapshot.forEach(doc => eventList.push(doc.data()))
    setEventSet(eventList)
  })

  eventPoints = eventSet.map(event => (
    <MapView.Marker
        coordinate={{ latitude: event.coordinates.latitude, longitude: event.coordinates.longitude }}
        onPress={toggleOverlay}
    >
        <Marker type={event.category} onChange={changeVisibility}></Marker>
    </MapView.Marker>
  ))

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1, borderColor: "black", borderWidth: 1 }}
        initialRegion={{
          latitude: 37.86835,
          longitude: -122.265,
          latitudeDelta: 0.0461,
          longitudeDelta: 0.0211
        }}
      >
        {eventPoints}
      </MapView>
      <Modal
        isVisible={visible}
        style={styles.view}
        onBackdropPress={turnOffOverlay}
        onBackButtonPress={turnOffOverlay}
        swipeDirection="down"
        onSwipeComplete={turnOffOverlay}
      >
        <EventDetails event={"Heloo"} />
      </Modal>
    </View>
  );
}
