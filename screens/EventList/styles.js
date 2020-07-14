import { StyleSheet } from "react-native";

import { Theme } from "../../../global/constants";

export default StyleSheet.create({
  container: {
    display: "flex",
    paddingBottom: 60,
  },
  title: {
    color: Theme.primary,
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: Theme.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 2,
  },
  iconContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  closeContainer: {
    width: 40,
    height: "100%",
    right: 0,
  },
  scrollView: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
