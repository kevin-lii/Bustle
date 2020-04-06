import { StyleSheet } from "react-native";

const bottom = Platform.OS === "ios" ? 90 : 65;

export default StyleSheet.create({
  // HEADER
  container: {
    flex: 1
  },
  clear: {
    flex: 0
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  preview: {
    justifyContent: "flex-end",
    margin: 0
  },
  drawerText: {
    margin: 16,
    fontWeight: "bold",
    color: "black"
  },
  buttons: {
    position: "absolute",
    bottom: bottom,
    right: 20
  }
});
