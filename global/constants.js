import { Dimensions } from "react-native";
import moment from "moment";

const { width, height } = Dimensions.get("window");
exports.Theme = {
  primary: "#FF7000",
  lightPrimary: "#ffc69b",
  secondary: "#1c004b",
  grey: "#9c9c9c",
  blue: "#006EBE",
  green: "#09BD09",
  red: "#EE0C0C",
  darkred: "#9F0D0D",
  disabled: "#e6e6e6",
  underline: "#D2D6D8",
  defaultBackground: "#f3f3f3",
  deviceWidth: width,
  CARD_HEIGHT: height / 9,
  CARD_WIDTH: height / 4 - 50,
  margin: 20,
  borderRadius: 12,
  icon: "FontAwesome5",
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

const allTags = new Set();
for (lst of Object.values(exports.eventTags))
  lst.forEach((t) => allTags.add(t));
exports.allEventTags = [...allTags].sort();

moment.updateLocale("en", {
  relativeTime: {
    future: "%s ago",
    past: "%s ago",
    s: "few seconds",
    m: "1m",
    h: "1h",
    d: "1w",
    w: "1w",
    mm: "%dm",
    hh: "%dh",
    dd: "%dd",
    ww: "%dw",
    MM: "%dm",
    yy: "%dy",
  },
});
