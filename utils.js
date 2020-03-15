import React from "react";
import { Alert } from "react-native";

import firestore from "@react-native-firebase/firestore";
import Permissions from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import { NavigationActions } from "react-navigation";

import Icons from "./components/Image/Icons";
import { Theme } from "./constants";

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

exports.categoriesIcon = ({ type, color = Theme.primary, size }) => {
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

exports.customMap = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7c93a3"
      },
      {
        lightness: "-10"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#a0a4a5"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#62838e"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#dde3e3"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#3f4a51"
      },
      {
        weight: "0.30"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.government",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.medical",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.school",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.sports_complex",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.sports_complex",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.sports_complex",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#c0c0c8"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: "-100"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#bbcacf"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        lightness: "0"
      },
      {
        color: "#bbcacf"
      },
      {
        weight: "0.50"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#a9b4b8"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        invert_lightness: true
      },
      {
        saturation: "-7"
      },
      {
        lightness: "3"
      },
      {
        gamma: "1.80"
      },
      {
        weight: "0.01"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a3c7df"
      }
    ]
  }
];

function sendEmailVerification(email) {}

function sendPhoneVerification(phone) {}
