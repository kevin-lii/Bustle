import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import moment from "moment";

import { UserContext } from "../../dataContainers/context";
import CategoriesIcon from "../Image/CategoriesIcon";

import styles from "./styles";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = (5 * height) / 12;
const CARD_WIDTH = width * 0.7;

const marginWidth = (width - CARD_WIDTH - 40) / 2;

export default class EventListView extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.scrollView = React.createRef();
    this.state = {
      scrollOffset: 0.1,
    };
  }

  componentDidUpdate(prevProp, prevState) {
    const scrollOffset = 0.1;
    if (prevProp.eventList != this.props.eventList) {
      this.setState({ scrollOffset });
      this.scrollView.current.scrollTo({
        x: scrollOffset,
        y: 0,
        animated: true,
      });
      this.props.navigation.pop();
      this.props.navigation.push("eventlist", {
        event: this.props.eventList[0],
        events: this.props.eventList,
      });
    } else {
      let index = Math.floor(this.state.scrollOffset / CARD_WIDTH + 0.25);
      if (index >= this.props.eventList.length) {
        index = this.props.eventList.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      let prevIndex = Math.floor(prevState.scrollOffset / CARD_WIDTH + 0.25);
      if (prevIndex >= this.props.eventList.length) {
        prevIndex = this.props.eventList.length - 1;
      }
      if (prevIndex <= 0) {
        prevIndex = 0;
      }
      if (prevIndex !== index) {
        this.props.navigation.pop();
        this.props.navigation.push("eventlist", {
          event: this.props.eventList[index],
          events: this.props.eventList,
        });
      }
    }
  }

  render() {
    const { eventList } = this.props;

    const handleOnScroll = (event) => {
      const offset =
        event.nativeEvent.contentOffset.x > 0.1
          ? event.nativeEvent.contentOffset.x
          : 0.1;
      this.setState({
        scrollOffset: offset,
      });
    };
    const handleScrollTo = (p) => {
      if (this.scrollView.current) {
        this.scrollView.current.scrollTo(p);
      }
    };
    return (
      <Modal
        propagateSwipe
        scrollTo={handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        isVisible={true}
        style={{ justifyContent: "flex-end", margin: 0 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        coverScreen={false}
        hasBackdrop={false}
        swipeThreshold={5}
        onSwipeComplete={this.props.onClose}
        onBackButtonPress={this.props.onClose}
        swipeDirection={"down"}
      >
        <SafeAreaView
          style={{ backgroundColor: "transparent", height: CARD_HEIGHT + 10 }}
        >
          <ScrollView
            horizontal
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={this.scrollView}
            onScroll={handleOnScroll}
            snapToInterval={CARD_WIDTH + 20}
          >
            {eventList.map((event, index) => (
              <View
                style={[
                  styles.card,
                  {
                    height: CARD_HEIGHT,
                    width: CARD_WIDTH,
                    marginLeft: index == 0 ? marginWidth + 20 : 0,
                    marginRight:
                      index == eventList.length - 1 ? marginWidth : 20,
                  },
                ]}
                key={index}
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
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }
}
