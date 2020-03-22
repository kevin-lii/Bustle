import React, { Component } from "react";
import { PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import supercluster from "points-cluster";
import { connect } from "react-redux";
import _ from "lodash";

import Marker from "../../../components/MapUI/Marker";
import ClusterMarker from "../../../components/MapUI/ClusterMarker";
import { navigateEvent, customMap } from "../../../utils";
import { getEvents } from "../../../store/actions";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [], clusters: [], zoom: null };
    this.map = React.createRef();
    this.eventLoc = [];
  }

  componentDidMount() {
    this.props.getEvents();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(_.sortBy(this.state.events), _.sortBy(this.props.events))) {
      this.eventLoc = [];
      this.setState({ events: this.props.events });
      this.props.events.forEach(event => {
        const geoPoint = event.data().coordinates;
        this.eventLoc.push({
          lng: geoPoint.longitude,
          lat: geoPoint.latitude,
          ...event.data(),
          id: event.id
        });
      });

      if (this.map.current) {
        this.createClusters();
      }
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

  focusPoint(center) {
    this.map.current.animateCamera(
      {
        center,
        zoom: 17
      },
      { duration: 300 }
    );
  }

  unFocus() {
    this.map.current.getCamera().then(camera => {
      this.map.current.animateCamera(
        {
          center: camera.center,
          zoom: 15
        },
        { duration: 300 }
      );
    });
  }

  getClusters = ({ camera, bounds }) => {
    const cluster = supercluster(this.eventLoc, {
      minZoom: 0,
      maxZoom: 20,
      radius: 40
    });
    return cluster({
      bounds,
      zoom: Math.ceil(camera.zoom)
    });
  };

  createClusters = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    this.map.current.getCamera().then(camera => {
      if (camera.zoom != this.state.zoom) {
        this.map.current.getMapBoundaries().then(bounds => {
          if (bounds) {
            bounds.se = {
              lat: bounds.southWest.latitude,
              lng: bounds.northEast.longitude
            };
            bounds.nw = {
              lat: bounds.northEast.latitude,
              lng: bounds.southWest.longitude
            };
          }
          this.setState({
            clusters: bounds
              ? this.getClusters({
                  camera: camera,
                  bounds: bounds
                }).map(({ wx, wy, numPoints, points }) => ({
                  lat: wy,
                  lng: wx,
                  numPoints,
                  points,
                  id: `${numPoints}_${points[0].id}`
                }))
              : []
          });
        });
      }
    });
  };

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
