import { StyleSheet } from "react-native";

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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  }
});
