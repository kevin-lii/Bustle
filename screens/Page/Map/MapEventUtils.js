import React from "react";
import { PermissionsAndroid } from "react-native";
import supercluster from "points-cluster";

export default {
  focusPoint: function(center) {
    this.map.current.animateCamera(
      {
        center,
        zoom: 17
      },
      { duration: 300 }
    );
  },

  unFocus: function() {
    this.map.current.getCamera().then(camera => {
      this.map.current.animateCamera(
        {
          center: camera.center,
          zoom: 15
        },
        { duration: 300 }
      );
    });
  },

  getClusters: function({ camera, bounds }) {
    const cluster = supercluster(this.eventLoc, {
      minZoom: 0,
      maxZoom: 20,
      radius: 40
    });
    return cluster({
      bounds,
      zoom: Math.ceil(camera.zoom)
    });
  },

  createClusters: function() {
    console.log("request", this, this.map);
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
  }
};
