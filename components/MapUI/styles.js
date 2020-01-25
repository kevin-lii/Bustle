import { StyleSheet } from "react-native";
import { Theme } from "../../constants";

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
    borderTopLeftRadius: Theme.borderRadius,
    borderTopRightRadius: Theme.borderRadius,
    borderColor: Theme.secondary,
    borderWidth: 2,
    borderBottomWidth: 0,
    height: 275,
    padding: Theme.margin
  },
  popupTitle: {
    fontSize: 40
  },
  info: {
    paddingLeft: 10
  },
  infoText: {
    fontSize: 15,
    marginRight: 1,
    marginBottom: 7.5
  },
  countText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  scrollView: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  }
});
