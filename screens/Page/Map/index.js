import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { connect } from "react-redux";
import _ from "lodash";

import Marker from "../../../components/MapUI/Marker";
import ClusterMarker from "../../../components/MapUI/ClusterMarker";
import MapEventPartial from "./MapEventPartial";
import MapForumsPartial from "./MapForumsPartial";
import { bindAll, navigateEvent } from "../../../global/utils";
import { customMap } from "../../../global/constants";
import { getEvents } from "../../../store/actions";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [], clusters: [], zoom: null };
    this.map = React.createRef();
    this.eventLoc = [];

    bindAll(this, MapEventPartial);
    bindAll(this, MapForumsPartial);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(_.sortBy(this.state.events), _.sortBy(this.props.events))) {
      this.regenClusters();
    }

    if (!this.props.navigation.state.params) return;

    const eventFocus = this.props.navigation.state.params.event;
    const prevEvent =
      prevProps.navigation.state.params &&
      prevProps.navigation.state.params.event;
    if (eventFocus)
      this.focusPoint({
        latitude: eventFocus.coordinates.latitude,
        longitude: eventFocus.coordinates.longitude
      });
    else if (prevEvent) {
      this.unFocus();
    }
  }

  render() {
    const { navigation } = this.props;

    const openPreview = event => {
      navigateEvent({ navigation, event, events: null });
    };

    const openListView = events => {
      navigateEvent({ navigation, event: events[0], events });
    };

    const markers = [];
    this.state.clusters.forEach(cluster => {
      if (cluster.numPoints == 1) {
        const event = cluster.points[0];
        markers.push(
          <MapView.Marker
            key={event.id}
            coordinate={{
              latitude: event.coordinates.latitude,
              longitude: event.coordinates.longitude
            }}
            onPress={() => openPreview(event)}
          >
            <Marker type={event.category}></Marker>
          </MapView.Marker>
        );
      } else {
        markers.push(
          <MapView.Marker
            key={cluster.id}
            coordinate={{
              latitude: cluster.lat,
              longitude: cluster.lng
            }}
            onPress={() => openListView(cluster.points)}
          >
            <ClusterMarker count={cluster.numPoints}></ClusterMarker>
          </MapView.Marker>
        );
      }
    });

    return (
      <MapView
        ref={this.map}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={customMap}
        initialRegion={{
          latitude: 37.86835,
          longitude: -122.265,
          latitudeDelta: 0.0461,
          longitudeDelta: 0.0211
        }}
        onRegionChangeComplete={this.createClusters}
        onMapReady={this.createClusters}
        showsBuildings={false}
        showsCompass={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followUserLocation={true}
      >
        {markers}
      </MapView>
    );
  }
}

export default connect(
  state => ({
    events: state.events
  }),
  {
    getEvents
  }
)(Map);
