import React from "react";
import { Alert, Platform, Linking } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { PERMISSIONS, request, check } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";

import URL from "url";

exports.bindAll = function (thisArg, obj) {
  for (const key of Object.keys(obj)) {
    thisArg[key] = obj[key].bind(thisArg);
  }
};

exports.createChat = async function () {
  firestore().collection("chats").doc("{messages: []}");
};

exports.getLocation = async function () {
  let locationPermission = await check(
    Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    })
  );
  if (locationPermission == "denied")
    locationPermission = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      })
    );

  if (locationPermission != "granted")
    return Alert.alert(
      "Enable Location",
      "Please enable location permissions in app settings to continue"
    );

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => resolve(position),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

exports.validateLocation = function (loc, lat, lng) {
  const distanceAway = Math.sqrt(
    Math.pow(69.1 * (lat - loc.coords.latitude), 2) +
      Math.pow(69.1 * (loc.coords.longitude - lng) * Math.cos(lat / 57.3), 2)
  );
  if (distanceAway > 50)
    throw new Error(
      "Location is out of range. Please select a location that is within 50 miles"
    );
};

exports.validateURL = function (str) {
  return Boolean(URL.parse(str).hostname);
};

exports.getNameInitials = function (displayName) {
  return displayName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();
};

exports.trimString = function (str, length) {
  return str.length > length ? str.substring(0, length - 3) + "..." : str;
};

exports.checkName = function (name) {
  const nameRegex = /([A-Z]){1}\w+/;
  if (!nameRegex.test(name)) {
    throw new Error("Name improperly formatted");
  }
};

exports.checkPhoneNumber = function (number) {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(number)) {
    throw new Error("Improper phone number");
  }
};

exports.checkPasswords = function (password, again) {
  if (password === "" || again === "" || password !== again) {
    throw new Error("Passwords do not match");
  }
};

exports.checkEmail = function (email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const berkeleyEmailRegex = /^\w+([\.-]?\w+)*@berkeley\.edu$/;
  if (!emailRegex.test(email)) {
    throw new Error("Email improperly formatted");
  } else if (!berkeleyEmailRegex.test(email)) {
    throw new Error("Please use a @berkeley.edu email to register");
  }
};

exports.navigatePath = function (navigation, path, params = {}) {
  const routes = path.split("/");
  const allParams = { screen: routes[1] };
  let current = allParams;
  for (let i = 2; i < routes.length; i++) {
    current.params = { screen: routes[i] };
    current = current.params;
  }
  current.params = params;
  navigation.navigate(routes[0], routes.length > 1 ? allParams : params);
};

exports.openURL = async (partLink, type) => {
  let url;
  let backup;
  switch (type) {
    case "twitter":
      url = "twitter://user?screen_name=" + partLink;
      backup = "https://twitter.com/" + partLink;
      break;
    case "snapchat":
      url = "snapchat://add/" + partLink;
      backup = "https://www.snapchat.com/add/" + partLink;
      break;
    case "linkedin":
      url = partLink;
      backup = "https://www.linkedin.com/in/" + partLink;
      break;
    default:
    case "instagram":
      url = "instagram://user?username=" + partLink;
      backup = "https://www.instagram.com/" + partLink;
      break;
  }
  let isSupported = await Linking.canOpenURL(url);

  if (isSupported) {
    await Linking.openURL(url);
  } else {
    await Linking.openURL(backup);
  }
};

exports.attachIDs = (snapshot) => {
  const docs = [];
  snapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
};

function sendEmailVerification(email) {}

function sendPhoneVerification(phone) {}
