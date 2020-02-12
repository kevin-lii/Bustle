import { StyleSheet, Platform } from "react-native";

const bigEdge = 60;
const smallEdge = 50;
const bottom = Platform.OS === "ios" ? 90 : 65;

export default StyleSheet.create({
  button: {
    position: "absolute",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    shadowColor: "#000",
    shadowRadius: 4,
    elevation: 2,
    shadowOpacity: 0.5,
    shadowOffset: { x: 0, y: -5 }
  },
  addButton: {
    bottom: bottom,
    right: 25,
    borderRadius: bigEdge / 2,
    height: bigEdge,
    width: bigEdge
  },
  eventButton: {
    bottom: 133,
    right: 30,
    borderRadius: smallEdge / 2,
    height: smallEdge,
    width: smallEdge
  },
  groupButton: {
    bottom: 73,
    right: 30,
    borderRadius: smallEdge / 2,
    height: smallEdge,
    width: smallEdge
  },
  categoryButton: {
    justifyContent: "center",
    alignContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: bigEdge / 2,
    height: bigEdge,
    width: bigEdge,
    position: "relative"
  },
  highlight: {
    backgroundColor: "orange"
  }
});
