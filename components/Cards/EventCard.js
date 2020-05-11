import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = (5 * height) / 12;
const CARD_WIDTH = width * 0.7;

export default ({ eventList, event }) => {
  const marginWidth = (width - CARD_WIDTH - 40) / 2;

  return (
    <View
      style={[
        styles.card,
        {
          height: CARD_HEIGHT,
          width: CARD_WIDTH,
          marginLeft: index == 0 ? marginWidth + 20 : 0,
          marginRight: index == eventList.length - 1 ? marginWidth : 20,
        },
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigation.pop();
          this.props.navigation.push("event", { event });
        }}
      >
        <View style={styles.textContent}>
          <Image
            style={{ height: "75%" }}
            source={{ uri: event.photoURL }}
          ></Image>
          <Text numberOfLines={1} style={styles.cardTitle}>
            <CategoriesIcon type={event.category} />
            {event.name}
          </Text>
          <Text numberOfLines={1} style={styles.cardDescription}>
            {moment(event.time.toDate()).format("h:mm a")} on{" "}
            {moment(event.date.toDate()).format("MMM Do, YYYY")}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
