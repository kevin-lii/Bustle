import { StyleSheet, Platform } from "react-native";

const bigEdge = 60;
const smallEdge = 50;

export default StyleSheet.create({
  button: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  addButton: {
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
