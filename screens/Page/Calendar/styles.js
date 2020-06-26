import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    paddingHorizontal: 5,
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
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
