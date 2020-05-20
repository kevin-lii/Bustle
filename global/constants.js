import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
exports.Theme = {
  primary: "#1c004b",
  secondary: "#FF7100",
  grey: "#9c9c9c",
  blue: "#006EBE",
  green: "#09BD09",
  red: "#EE0C0C",
  darkred: "#9F0D0D",
  disabled: "#e6e6e6",
  defaultBackground: "#f2f2f2",
  deviceWidth: width,
  CARD_HEIGHT: height / 9,
  CARD_WIDTH: height / 4 - 50,
  margin: 20,
  borderRadius: 12,
  icon: "Fontisto",
};

exports.categories = [
  "Social",
  "Professional",
  "Athletic",
  "Learn",
  "Community",
];

exports.tags = {
  Social: ["Party", "Music", "Film", "Games", "Networking", "Food/drink"],
  Professional: ["Networking", "Infosession", "Resume drop", "Recruiting"],
  Athletic: ["Pickup Game", "Watch Party", "Recruiting"],
  Learn: ["Infosession", "Lecture", "Workshop"],
  Community: ["Religion", "Charity", "Fundraiser", "Volunteer"],
};

exports.anonymous = "anon";
