import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { connect } from "react-redux";
import _ from "lodash";

import WithOverlayButtons from "../../components/Container/WithOverlayButtons";
import WithOverlayCard from "../../components/Container/WithOverlayCard";
import MapEventPartial from "./MapEventPartial";
import { getEvents } from "../../store/actions";

import { bindAll } from "../../global/utils";
import { customMap, initialMap } from "../../global/mapconfig";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusters: [],
      zoom: null,
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
        longitude: eventFocus.coordinates.longitude,
      });
      return;
    }
    if (prevEvent) {
      this.unFocus();
    }
  }

  render() {
    const { navigation, route } = this.props;

    const handleToggle = (state) => {
      navigation.push(state ? "forums" : "events");
    };

    let mapContent;
    if (route.name === "forums") mapContent = this.generatePolygons();
    else mapContent = this.generateMarkers();

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
            initialRegion={initialMap}
            onRegionChangeComplete={this.createClusters}
            onMapReady={this.createClusters}
            showsBuildings={false}
            showsCompass={false}
            showsUserLocation={true}
            showsMyLocationButton={false}
            toolbarEnabled={false}
            followUserLocation={true}
          >
            {mapContent}
          </MapView>
        </WithOverlayButtons>
      </WithOverlayCard>
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
)(Map);
