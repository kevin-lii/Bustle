import { StyleSheet } from "react-native";

export default StyleSheet.create({
  formOverlay: {
    position: "absolute",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    borderRadius: 12,
  },
  buttonRow: {
    marginTop: 10,
    paddingBottom: 10,
  },
  formTitle: {
    marginTop: 5,
    paddingRight: 15,
    justifyContent: "space-between",
    height: 30,
  },
  icon: {
    height: "120%",
    width: 40,
    backgroundColor: "transparent",
  },
  fillerText: {
    marginTop: 25,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
