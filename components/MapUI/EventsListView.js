import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Animated,
  Image,
  Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";

import Icons from "../Image/Icons";
import EventDetail from "../Window/EventDetailCard";
import { UserContext } from "../../dataContainers/context";

import styles from "./styles";

class EventListView extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const { eventList, navigation, ...props } = this.props;
    const { width, height } = Dimensions.get("window");
    const CARD_HEIGHT = height / 4;
    const CARD_WIDTH = CARD_HEIGHT - 50;

    let events;
    events = eventList.map((event, index) => (
      <EventDetail
        key={index}
        event={event}
        navigation={navigation}
        map
        trash
        {...props}
      />
    ));
    return (
      <SafeAreaView style={styles.popup}>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              alignSelf: "flex-end",
              marginRight: 25,
              marginTop: 20
            }}
          ></View>
          <Text style={styles.title}>My Events</Text>
          {events}
        </ScrollView> */}
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {eventList.map((event, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={event.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {event.title}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {event.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

export default withNavigation(EventListView);
