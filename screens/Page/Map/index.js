import React, { useState, Component } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";

import Marker from "../../../components/MapUI/Marker";
import { navigateEvent } from '../../../utils'

import styles from "./styles";

import EventData from "../../../models/Event";

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = { events: [] }
    this.map = React.createRef()

    EventData.get({}, snapshot => {
      if (snapshot != this.state.events)
        this.setState({ events: snapshot })
    });

    this.props.navigation.addListener('didFocus', payload => {
      const eventFocus = payload.state.event
      if (eventFocus)
        this.focusPoint({
          latitude: eventFocus.coordinates.latitude,
          longitude: eventFocus.coordinates.longitude
        })
    })
  }

  componentDidUpdate(prevProps) {
    if (!this.props.navigation.state.params)
      return

    const eventFocus = this.props.navigation.state.params.event
    const prevEvent = prevProps.navigation.state.params && prevProps.navigation.state.params.event
    if (eventFocus)
      this.focusPoint({
        latitude: eventFocus.coordinates.latitude,
        longitude: eventFocus.coordinates.longitude
      })
    else if (prevEvent) {
      this.unFocus()
    }
  }

  focusPoint(center) {
    this.map.current.animateCamera({
      center,
      zoom: 17
    }, { duration: 300 })
  }

  unFocus() {
    this.map.current.getCamera().then(camera => {
      this.map.current.animateCamera({
        center: camera.center,
        zoom: 15
      }, { duration: 300 })
    })
  }

  render () {
    const { navigation } = this.props
  
    const openPreview = event => {
      navigateEvent(navigation, event)
    }

    const markers = []
    this.state.events.forEach(doc => {
      const event = doc.data()
      markers.push(
        <MapView.Marker
          key={doc.id}
          coordinate={{
            latitude: event.coordinates.latitude,
            longitude: event.coordinates.longitude
          }}
          onPress={() => openPreview(event)}
        >
          <Marker type={event.category}></Marker>
        </MapView.Marker>
      )
    })

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.86835,
            longitude: -122.265,
            latitudeDelta: 0.0461,
            longitudeDelta: 0.0211
          }}
          showsPointsOfInterest={false}
        >
          {markers}
        </MapView>
      </View>
    );
  }
}
