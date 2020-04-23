import React from "react";
import { connect } from "react-redux";
import { View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import Icons from "../Image/Icons";
import styles from "./styles";
import UserData from "../../models/User";
import Avatar from "../Buttons/AvatarButton";
import { UserContext } from "../../dataContainers/context";
import Button from "../Buttons/ActionButton";
import { Theme } from "../../global/constants";

class EventBottomSheet extends React.Component {
  static contextType = UserContext;
  state = {
    loading: true,
    host: "",
    avatarPhotoURL: "",
    initials: "",
    fall: new Animated.Value(0.7),
  };

  componentDidMount() {
    UserData.get(this.props.event.host).then((doc) => {
      this.setState({
        host: doc.data().displayName,
        photoURL: doc.data().photoURL,
        initials: doc
          .data()
          .displayName.split(" ")
          .map((name) => name.charAt(0))
          .join(""),
        loading: false,
      });
    });
  }

  render() {
    const { event, onClose, user } = this.props;
    const date = moment(event.date.toDate()).format("MMM Do, YYYY");
    const time = moment(event.time.toDate()).format("h:mm a");
    const location = event.location ? event.location.description : "See Map";
    const fall = this.state.fall;
    const bs = React.createRef();
    const sizeProportion = 300 / Dimensions.get("window").height;
    const animateHeight = (outputRange) => {
      return Animated.interpolate(fall, {
        inputRange: [0, sizeProportion],
        outputRange: outputRange,
        extrapolate: Animated.Extrapolate.CLAMP,
      });
    };
    const animatedContentOpacity = Animated.interpolate(fall, {
      inputRange: [0, sizeProportion],
      outputRange: [1, (sizeProportion - 1) * 2],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    const renderHandler = () => {
      return (
        <View style={styles.handlerContainer}>
          <Animated.View
            style={[
              styles.handlerBar,
              {
                // left: 1.75,
                left: -7.5,
                transform: [
                  {
                    rotate: Animated.concat(animateHeight([0.3, 0]), "rad"),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.handlerBar,
              {
                // right: 1.75,
                right: -7.5,
                transform: [
                  {
                    rotate: Animated.concat(animateHeight([-0.3, 0]), "rad"),
                  },
                ],
              },
            ]}
          />
        </View>
      );
    };
    //Render Description
    const renderExtended = () => {
      return (
        <Animated.ScrollView
          style={{
            height: Animated.concat(
              event.photoURL
                ? animateHeight([42.5, -10])
                : animateHeight([72.5, -17]),
              "%"
            ),
            marginTop: 7.5,
          }}
        >
          {event.description ? (
            <Animated.Text
              style={[
                styles.infoText,
                {
                  marginBottom: 0,
                  opacity: animatedContentOpacity,
                  lineHeight: animateHeight([20, 0]),
                },
              ]}
            >
              {event.description}
            </Animated.Text>
          ) : null}
        </Animated.ScrollView>
      );
    };

    const renderImage = () => {
      return (
        <Animated.Image
          overflow="hidden"
          style={[
            styles.cardImage,
            {
              opacity: animatedContentOpacity,
              height: Animated.concat(animateHeight([30, -10]), "%"),
            },
          ]}
          source={{ uri: event.photoURL }}
        ></Animated.Image>
      );
    };
    const renderContent = () => {
      if (this.state.loading)
        return (
          <SafeAreaView style={styles.popup}>
            <View>
              <Text>Loading...</Text>
            </View>
          </SafeAreaView>
        );
      else
        return (
          <SafeAreaView style={styles.popup}>
            {renderHandler()}
            <View style={{ padding: event.photoURL ? 0 : 10 }}>
              {event.photoURL ? renderImage() : null}
              <Text numberOfLines={2} style={styles.popupTitle}>
                {event.name || "Event Name"}
              </Text>
              <View style={styles.info}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: -30,
                    marginBottom: -30,
                  }}
                  spread
                >
                  <Text numberOfLines={1} style={styles.infoText}>
                    Hosted by {this.state.host}{" "}
                  </Text>
                  <Avatar
                    photoURL={this.state.avatarPhotoURL}
                    init={this.state.initials}
                    size={30}
                    marginBottom={30}
                    marginRight={0}
                    marginTop={25}
                  />
                </View>
                <Text numberOfLines={1} style={styles.infoText}>
                  <Icons type="Entypo" icon="calendar" size={15}></Icons> {time}{" "}
                  on {date}
                </Text>
                <Text numberOfLines={1} style={styles.infoText}>
                  <Icons type="Fontisto" icon="map-marker" size={15}></Icons>{" "}
                  {location}
                </Text>
                {renderExtended()}
                <Animated.View
                  style={{
                    width: Animated.concat(
                      animateHeight([33, 100].slice().reverse()),
                      "%"
                    ),
                  }}
                >
                  {!user.events.includes(event.id) ? (
                    <Button
                      text="Join"
                      onPress={async () => {
                        UserData.joinEvent(user.uid, event.id);
                        let eventList = user.events;
                        eventList.push(event.id);
                        user.events = eventList;
                      }}
                      primary
                    />
                  ) : (
                    <Button
                      text="Leave"
                      onPress={async () => {
                        UserData.leaveEvent(user.uid, event.id);
                        const remaining = user.events.filter(
                          (item) => item != event.id
                        );
                        user.events = remaining;
                      }}
                      disabled={event.host === user.uid}
                      primary
                    />
                    //   <Text style={{ color: "green" }}>
                    //     <Icons type="Feather" icon="check-circle" color="green" /> You
                    //     are currently going
                    // </Text>
                    // </View>
                  )}
                </Animated.View>
              </View>
            </View>
          </SafeAreaView>
        );
    };
    return (
      <BottomSheet
        ref={bs}
        snapPoints={[Dimensions.get("window").height, 300, 0]}
        initialSnap={1}
        renderContent={renderContent}
        enabledContentTapInteraction={false}
        callbackNode={fall}
        callbackThreshold={0.1}
        borderRadius={Theme.borderRadius}
        onCloseEnd={onClose}
      />
    );
  }
}
export default connect(
  (state) => ({
    user: state.user,
  }),
  {}
)(EventBottomSheet);
