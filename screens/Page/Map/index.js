import React, { useState, useEffect } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";

import Marker from "../../../components/MapUI/Marker";
import EventDetails from "../../../components/MapUI/EventBottomSheet";

import styles from "./styles";

import EventData from "../../../models/Event";
import firestore from "@react-native-firebase/firestore";

export default function Map({ navigation }) {
  const [eventSet, setEventSet] = useState([]);
  const [eventDetails, setEvent] = useState(null);
  const [visible, changeVisibility] = useState(false);

  function toggleOverlay(event) {
    setEvent(event);
    changeVisibility(!visible);
  }

  const turnOffOverlay = () => changeVisibility(false);
  const openPreview = event => {
    navigation.navigate("Map", { preview: event })
  }

  EventData.get({}, snapshot => {
    eventList = [];
    snapshot.forEach(doc => eventList.push(doc.data()));
    setEventSet(eventList);
  });

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
        {eventSet.map((event,index) => (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: event.coordinates.latitude,
              longitude: event.coordinates.longitude
            }}
            onPress={() => openPreview(event)}
          >
            <Marker type={event.category} onChange={changeVisibility}></Marker>
          </MapView.Marker>
        ))}
      </MapView>
      
    </View>
  );
}
