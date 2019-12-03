import { Alert } from "react-native";

import firestore from "@react-native-firebase/firestore";
import Permissions from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";

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

function sendEmailVerification(email) {}

function sendPhoneVerification(phone) {}
