import { StyleSheet, Platform } from "react-native";

const bigEdge = 60;
const smallEdge = 50;

export default StyleSheet.create({
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center"
  },
  addButton: {
    borderRadius: bigEdge / 2,
    height: bigEdge,
    width: bigEdge
  },
  smallButton: {
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
