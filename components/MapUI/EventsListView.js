import React from "react";
import { View, Text, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";

import IconButton from "../Buttons/IconButton";
import { UserContext } from "../../dataContainers/context";

import styles from "./styles";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = 225;

const marginWidth = (width - CARD_WIDTH - 140) / 2;

class EventListView extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.scrollView = React.createRef();
    this.state = {
      scrollViewWidth: 0,
      index: 0
    };
    this.props.navigateTo(this.props.eventList[0]);
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.eventList != this.props.eventList) {
      // const index = this.props.eventList.length - 1;
      const index = 0;
      this.setState({ index });
      this.scrollView.current.scrollTo({
        x: index * 245,
        y: 0,
        animated: true
      });
    } else if (prevState.index !== this.state.index)
      this.props.navigateTo(this.props.eventList[this.state.index]);
  }

  render() {
    const { eventList } = this.props;
    const leftArrow = () => {
      _currentXOffset = (this.state.index - 1) * 245;
      this.scrollView.current.scrollTo({
        x: _currentXOffset,
        y: 0,
        animated: true
      });
      this.setState(prevState => ({
        index: prevState.index > 0 ? prevState.index - 1 : 0
      }));
    };

    const rightArrow = () => {
      _currentXOffset = (this.state.index + 1) * 245;
      this.scrollView.current.scrollTo({
        x: _currentXOffset,
        y: 0,
        animated: true
      });
      this.setState(prevState => ({
        index:
          prevState.index < eventList.length - 1
            ? prevState.index + 1
            : eventList.length - 1
      }));
    };
    return (
      <SafeAreaView>
        <IconButton
          touchStyle={{
            position: "absolute",
            bottom: 50 + CARD_HEIGHT / 2,
            left: 20
          }}
          onPress={leftArrow}
          icon="ios-arrow-back"
        />

        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onContentSizeChange={(w, h) => this.setState({ scrollViewWidth: w })}
          ref={this.scrollView}
          snapToInterval={CARD_WIDTH}
          style={styles.scrollView}
        >
          {eventList.map((event, index) => (
            <View
              style={[
                styles.card,
                {
                  height: CARD_HEIGHT,
                  width: CARD_WIDTH,
                  marginLeft: index == 0 ? marginWidth + 20 : 0,
                  marginRight: index == eventList.length - 1 ? marginWidth : 20
                }
              ]}
              key={index}
            >
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {event.name}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {event.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <IconButton
          touchStyle={{
            position: "absolute",
            bottom: 50 + CARD_HEIGHT / 2,
            right: 20
          }}
          onPress={rightArrow}
          icon="ios-arrow-forward"
        />
      </SafeAreaView>
    );
  }
}

export default withNavigation(EventListView);
