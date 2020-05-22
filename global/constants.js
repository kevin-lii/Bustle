import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
exports.Theme = {
  primary: "#FF7100",
  lightPrimary: "#ffc69b",
  secondary: "#1c004b",
  grey: "#9c9c9c",
  blue: "#006EBE",
  green: "#09BD09",
  red: "#EE0C0C",
  darkred: "#9F0D0D",
  disabled: "#e6e6e6",
  underline: "#D2D6D8",
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

exports.eventTags = {
  Social: ["Film", "Food/drink", "Games", "Music", "Networking", "Party"],
  Professional: ["Infosession", "Networking", "Recruiting", "Resume drop"],
  Athletic: ["Recruiting", "Pickup Game", "Watch Party"],
  Learn: ["Infosession", "Lecture", "Workshop"],
  Community: ["Charity", "Fundraiser", "Religion", "Volunteer"],
};

exports.forumTags = [
  "alert",
  "clubs",
  "confession",
  "courseadvice",
  "dormlife",
  "internships",
  "memes",
  "mentorship",
  "news",
  "opportunity",
  "party",
  "relationships",
  "roommates",
];
