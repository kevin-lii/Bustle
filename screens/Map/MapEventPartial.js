import React from "react";
import supercluster from "points-cluster";
import MapView from "react-native-maps";

import Marker from "./components/Marker";
import ClusterMarker from "./components/ClusterMarker";

import { getLocation } from "../../global/utils";

export default {
  focusPoint: function (center) {
    this.map.current.animateCamera(
      {
        center,
        zoom: 17,
      },
      { duration: 300 }
    );
  },

  unFocus: function () {
    this.map.current.getCamera().then((camera) => {
      this.map.current.animateCamera(
        {
          center: camera.center,
          zoom: 15,
        },
        { duration: 300 }
      );
    });
  },

  getClusters: function ({ camera, bounds }) {
    const cluster = supercluster(this.eventLoc, {
      minZoom: 0,
      maxZoom: 20,
      radius: 40,
    });
    return cluster({
      bounds,
      zoom: Math.ceil(camera.zoom),
    });
  },

  createClusters: async function () {
    await getLocation();
    this.map.current.getCamera().then((camera) => {
      if (camera.zoom != this.state.zoom) {
        this.map.current.getMapBoundaries().then((bounds) => {
          if (bounds) {
            bounds.se = {
              lat: bounds.southWest.latitude,
              lng: bounds.northEast.longitude,
            };
            bounds.nw = {
              lat: bounds.northEast.latitude,
              lng: bounds.southWest.longitude,
            };
          }
          this.setState({
            clusters: bounds
              ? this.getClusters({
                  camera: camera,
                  bounds: bounds,
                }).map(({ wx, wy, numPoints, points }) => ({
                  lat: wy,
                  lng: wx,
                  numPoints,
                  points,
                  id: `${numPoints}_${points[0].id}`,
                }))
              : [],
          });
        });
      }
    });
  },
  regenClusters: function () {
    this.eventLoc = [];
    this.props.events.forEach((event) => {
      const geoPoint = event.data().coordinates;
      this.eventLoc.push({
        lng: geoPoint.longitude,
        lat: geoPoint.latitude,
        ...event.data(),
        id: event.id,
      });
    });

    if (this.map.current) {
      this.createClusters();
    }
  },
  generateMarkers: function () {
    const openPreview = (event) => {
      this.props.navigation.push("event", { event });
    };
    const openListView = (events) => {
      this.props.navigation.push("eventlist", { event: events[0], events });
    };

    return this.state.clusters.map((cluster) => {
      if (cluster.numPoints == 1) {
        const event = cluster.points[0];
        return (
          <MapView.Marker
            key={event.id}
            coordinate={{
              latitude: event.coordinates.latitude,
              longitude: event.coordinates.longitude,
            }}
            onPress={() => openPreview(event)}
          >
            <Marker photoURL={event.photoURL} type={event.category}></Marker>
          </MapView.Marker>
        );
      } else {
        return (
          <MapView.Marker
            key={cluster.id}
            coordinate={{
              latitude: cluster.lat,
              longitude: cluster.lng,
            }}
            onPress={() => openListView(cluster.points)}
          >
            <ClusterMarker count={cluster.numPoints}></ClusterMarker>
          </MapView.Marker>
        );
      }
    });
  },
};
