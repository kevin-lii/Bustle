import { StyleSheet } from "react-native";
import { Theme } from "../../global/constants";

export default StyleSheet.create({
  // Marker and ClusterMarker
  marker: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFA45B",
  },
  countText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },

  // Other stuff
  popup: {
    backgroundColor: "#FFF",
    height: "100%",
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.8,
    shadowOffset: { x: 0, y: 2 },
    color: Theme.primary,
  },
  popupTitle: {
    fontSize: 35,
    fontWeight: "bold",
  },

  handlerContainer: {
    position: "absolute",
    alignSelf: "center",
    top: 10,
    height: 20,
    width: 20,
  },
  handlerBar: {
    position: "absolute",
    backgroundColor: Theme.grey,
    top: 5,
    borderRadius: 3,
    height: 5,
    width: 20,
  },
  infoText: {
    fontSize: 17,
    marginRight: 1,
    marginBottom: 7.5,
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
    overflow: "hidden",
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 15,
  },
});
