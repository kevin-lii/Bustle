import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
exports.Theme = {
  primary: "#1c004b",
  secondary: "#FF7100",
  grey: "#bcbcbc",
  blue: "#006EBE",
  green: "#09BD09",
  red: "#EE0C0C",
  darkred: "#9F0D0D",
  defaultBackground: "#f0f0f0",
  deviceWidth: width,
  CARD_HEIGHT: height / 4,
  CARD_WIDTH: height / 4 - 50,
  margin: 20,
  borderRadius: 12,
  icon: "Fontisto",
};

exports.categories = ["Social", "Business", "Athletic", "Learn", "Community"];

exports.anonymous = "anon";
