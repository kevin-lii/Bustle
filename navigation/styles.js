import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  clear: {
    flex: 0,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  preview: {
    justifyContent: "flex-end",
    margin: 0,
  },
  drawerText: {
    margin: 16,
    fontWeight: "bold",
    color: "black",
  },
  floatingHeader: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
  },
  headerLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
