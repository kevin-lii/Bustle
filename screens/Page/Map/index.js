import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { connect } from "react-redux";
import _ from "lodash";

import WithOverlayButtons from "../../../components/Container/WithOverlayButtons";
import WithOverlayCard from "../../../components/Container/WithOverlayCard";
import Marker from "../../../components/MapUI/Marker";
import ClusterMarker from "../../../components/MapUI/ClusterMarker";
import MapEventPartial from "./MapEventPartial";
import MapForumsPartial from "./MapForumsPartial";
import { bindAll } from "../../../global/utils";
import { customMap } from "../../../global/constants";
import { getEvents } from "../../../store/actions";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusters: [],
      zoom: null
    };
    this.map = React.createRef();
    this.eventLoc = [];

    bindAll(this, MapEventPartial);
    bindAll(this, MapForumsPartial);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  componentDidUpdate(prevProps) {
    const { route } = this.props;
    if (
      prevProps &&
      !_.isEqual(_.sortBy(prevProps.events), _.sortBy(this.props.events))
    ) {
      this.regenClusters();
    }

    const eventFocus = route.params?.event;
    const prevEvent = prevProps.route.params?.event;
    if (eventFocus) {
      this.focusPoint({
        latitude: eventFocus.coordinates.latitude,
        longitude: eventFocus.coordinates.longitude
      });
      return;
    }
    if (prevEvent) {
      this.unFocus();
    }
  }

  render() {
    const { navigation, route } = this.props;

    const openPreview = event => {
      navigation.push("event", { event });
    };
    const openListView = events => {
      navigation.push("eventlist", { event: events[0], events });
    };
    const handleToggle = state => {
      navigation.push(state ? "forums" : "events");
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
      <WithOverlayCard navigation={navigation} route={route}>
        <WithOverlayButtons
          navigation={navigation}
          route={route}
          toggleState={route.name === "forums"}
          onToggle={handleToggle}
        >
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
        </WithOverlayButtons>
      </WithOverlayCard>
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
