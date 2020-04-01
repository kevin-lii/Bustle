import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
exports.Theme = {
  primary: "#1c004b",
  secondary: "#FFA45B",
  deviceWidth: width,
  CARD_HEIGHT: height / 4,
  CARD_WIDTH: height / 4 - 50,
  margin: 20,
  borderRadius: 12,
  icon: "Fontisto"
};

exports.endpoints = {
  EMAIL_AUTH: "emailAuth"
};
