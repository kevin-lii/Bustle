import { StyleSheet } from "react-native";
import { Theme } from "../../constants";

export default StyleSheet.create({
  marker: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFA45B"
  },
  sheet: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end"
  },
  popup: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: Theme.borderRadius,
    borderTopRightRadius: Theme.borderRadius,
    borderColor: Theme.secondary,
    borderWidth: 2,
    borderBottomWidth: 0,
    height: 200,
    padding: Theme.margin
  },
  popupTitle: {
    fontSize: 40
  },
  info: {
    paddingLeft: 10
  },
  infoText: {
    fontSize: 15
  }
});
