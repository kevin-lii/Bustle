import { StyleSheet } from "react-native";

import { Theme } from "../../../constants";

export default StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    marginRight: 5,
    marginLeft: 5
  },
  title: {
    color: Theme.primary,
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 2
  },
  subtitle: {
    color: Theme.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 2
  },
  iconContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  closeContainer: {
    width: 40,
    height: "100%",
    right: 0
  }
});