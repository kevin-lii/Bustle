import React from "react";
import { Alert } from "react-native";

import firestore from "@react-native-firebase/firestore";
import functions from "@react-native-firebase/functions";
import Permissions from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";

exports.bindAll = function(thisArg, obj) {
  for (const key of Object.keys(obj)) {
    thisArg[key] = obj[key].bind(thisArg);
  }
};

exports.createChat = async function() {
  firestore()
    .collection("chats")
    .doc("{messages: []}");
};

exports.getLocation = async function() {
  let locationPermission = await Permissions.check("location");
  if (locationPermission == "undetermined")
    locationPermission = await Permissions.request("location");

  if (locationPermission != "authorized")
    return Alert.alert(
      "Enable Location",
      "Please enable location permissions in app settings to continue"
    );

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

exports.validateLocation = function(loc, lat, lng) {
  const distanceAway = Math.sqrt(
    Math.pow(69.1 * (lat - loc.coords.latitude), 2) +
      Math.pow(69.1 * (loc.coords.longitude - lng) * Math.cos(lat / 57.3), 2)
  );
  if (distanceAway > 50)
    throw new Error(
      "Location is out of range. Please select a location that is within 50 miles"
    );
};

exports.checkName = function(first, last) {
  const nameRegex = /([A-Z]){1}\w+/;
  if (!nameRegex.test(first) || !nameRegex.test(last)) {
    throw new Error("Name improperly formatted");
  }
};

exports.checkPhoneNumber = function(number) {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(number)) {
    throw new Error("Improper phone number");
  }
};

exports.checkPasswords = function(password, again) {
  if (password === "" || again === "" || password !== again) {
    throw new Error("Passwords do not match");
  }
};

exports.checkEmail = function(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const berkeleyEmailRegex = /^\w+([\.-]?\w+)*@berkeley\.edu$/;
  if (!emailRegex.test(email)) {
    throw new Error("Email improperly formatted");
  } else if (!berkeleyEmailRegex.test(email)) {
    throw new Error("Please use a @berkeley.edu email to register");
  }
};

exports.navigatePath = function(navigation, path, params) {
  const routes = path.split("/");
  const allParams = {};
  let current = allParams;
  for (let i = 1; i < routes.length; i++) current.params = { screen: path[i] };
  current = current.params;
  current.params = params;
  navigation.navigate(routes[0], routes.length > 1 ? allParams : params);
};

exports.getEndpoint = function(fn) {
  return functions().httpsCallable(fn);
};

function sendEmailVerification(email) {}

function sendPhoneVerification(phone) {}
