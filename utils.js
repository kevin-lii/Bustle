import React from "react";
import { Alert } from "react-native";

import firestore from "@react-native-firebase/firestore";
import Permissions from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import { NavigationActions } from "react-navigation";

import Icons from "./components/Image/Icons";

exports.categories = [
  "Social",
  "Dining",
  "Drinks",
  "Business",
  "Athletic",
  "Learn",
  "Spiritual",
  "Service"
];

exports.categoriesIcon = (type, color, size) => {
  let iconSize;
  switch (type) {
    case "Dining":
      iconSize = size ? size : 25;
      return (
        <Icons
          type="MaterialIcons"
          icon="food-fork-drink"
          color={color}
          size={iconSize}
        />
      );
    case "Drinks":
      iconSize = size ? size : 20;
      return <Icons type="Entypo" icon="drink" color={color} size={iconSize} />;
    case "Business":
      iconSize = size ? size : 20;
      return (
        <Icons type="Entypo" icon="suitcase" color={color} size={iconSize} />
      );
    case "Athletic":
      iconSize = size ? size : 25;
      return <Icons icon="ios-basketball" color={color} size={iconSize} />;
    case "Learn":
      iconSize = size ? size : 25;
      return (
        <Icons
          type="Entypo"
          icon="graduation-cap"
          color={color}
          size={iconSize}
        />
      );
    case "Spiritual":
      iconSize = size ? size : 20;
      return <Icons type="Font" icon="cross" color={color} size={iconSize} />;
    case "Service":
      iconSize = size ? size : 25;
      return (
        <Icons
          type="MaterialIcons"
          icon="room-service"
          color={color}
          size={iconSize}
        />
      );
    case "Social":
    default:
      iconSize = size ? size : 25;
      return (
        <Icons
          type="MaterialIcons"
          icon="earth"
          color={color}
          size={iconSize}
        />
      );
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
  // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailRegex = /^\w+([\.-]?\w+)*@berkeley\.edu$/;
  if (!emailRegex.test(email)) {
    throw new Error("Email improperly formatted");
  }
};

exports.navigateEvent = function({ navigation, event, events }) {
  navigation.dispatch(
    NavigationActions.navigate({
      routeName: "Map",
      params: { event, events },
      action: NavigationActions.navigate({
        routeName: "Map",
        params: { event, events }
      })
    })
  );
};

function sendEmailVerification(email) {}

function sendPhoneVerification(phone) {}
