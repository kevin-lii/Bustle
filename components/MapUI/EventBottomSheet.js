import React from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
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

export default class EventBottomSheet extends React.Component {
  static contextType = UserContext;
  state = {
    loading: true,
    host: "",
    avatarPhotoURL: "",
    initials: "",
    user: this.context,
    fall: new Animated.Value(0.7)
  };

  componentDidMount() {
    UserData.get(this.props.event.host).then(doc => {
      this.setState({
        host: doc.data().displayName,
        photoURL: doc.data().photoURL,
        initials: doc
          .data()
          .displayName.split(" ")
          .map(name => name.charAt(0))
          .join(""),
        loading: false
      });
    });
  }

  render() {
    const { event, onClose } = this.props;
    const date = moment(event.date.toDate()).format("MMM Do, YYYY");
    const time = moment(event.time.toDate()).format("h:mm a");
    const location = event.location ? event.location.description : "See Map";
    let eventList = this.state.user.events;
    const fall = this.state.fall;
    const bs = React.createRef();

    const renderHandler = () => {
      const animatedHandlerBarRotation = outputRange =>
        Animated.interpolate(fall, {
          inputRange: [0, 0.7],
          outputRange: outputRange,
          extrapolate: Animated.Extrapolate.CLAMP
        });

      return (
        <View style={styles.handlerContainer}>
          <Animated.View
            style={[
              styles.handlerBar,
              {
                left: 1.75,
                transform: [
                  {
                    rotate: Animated.concat(
                      animatedHandlerBarRotation([0.3, 0]),
                      "rad"
                    )
                  }
                ]
              }
            ]}
          />
          <Animated.View
            style={[
              styles.handlerBar,
              {
                right: 1.75,
                transform: [
                  {
                    rotate: Animated.concat(
                      animatedHandlerBarRotation([-0.3, 0]),
                      "rad"
                    )
                  }
                ]
              }
            ]}
          />
        </View>
      );
    };
    //Render Button and Description
    const renderExtended = () => {
      const animatedContentOpacity = Animated.interpolate(fall, {
        inputRange: [0, 0.7],
        outputRange: [1, -0.4],
        extrapolate: Animated.Extrapolate.CLAMP
      });
      const animateHeight = outputRange => {
        return Animated.interpolate(fall, {
          inputRange: [0, 0.7],
          outputRange: outputRange,
          extrapolate: Animated.Extrapolate.CLAMP
        });
      };
      return (
        <Animated.View>
          <Animated.ScrollView
            style={{
              height: Animated.concat(
                event.photoURL
                  ? animateHeight([55, -10])
                  : animateHeight([75, -15]),
                "%"
              ),
              marginTop: 7.5
            }}
          >
            {event.description ? (
              <Animated.Text
                style={[
                  styles.infoText,
                  {
                    marginBottom: 0,
                    opacity: animatedContentOpacity,
                    lineHeight: animateHeight([20, 0])
                  }
                ]}
              >
                {event.description}
              </Animated.Text>
            ) : null}
          </Animated.ScrollView>
          <Animated.View
            style={{
              width: Animated.concat(
                animateHeight([33, 100].slice().reverse()),
                "%"
              )
            }}
          >
            {!this.state.user.events.includes(event.id) ? (
              <Button
                text="Join"
                onPress={async () => {
                  await UserData.joinEvent(this.state.user.uid, event.id);
                  eventList.push(event.id);
                  await this.state.user.updateJoinedEvents(eventList);
                  this.setState({
                    user: {
                      events: eventList,
                      ...this.state.user
                    }
                  });
                }}
                primary
              />
            ) : (
              <Button
                text="Leave"
                onPress={async () => {
                  await UserData.leaveEvent(this.state.user.uid, event.id);
                  const remaining = this.state.user.events.filter(
                    item => item != event.id
                  );
                  await this.state.user.updateJoinedEvents(remaining);
                  this.state.user.events = remaining;
                  this.setState({
                    user: this.state.user
                  });
                }}
                disabled={event.host === this.state.user.uid}
                primary
              />
              //   <Text style={{ color: "green" }}>
              //     <Icons type="Feather" icon="check-circle" color="green" /> You
              //     are currently going
              // </Text>
              // </View>
            )}
          </Animated.View>
        </Animated.View>
      );
    };

    const renderImage = () => {
      const animatedContentOpacity = Animated.interpolate(fall, {
        inputRange: [0, 0.7],
        outputRange: [1, -0.2],
        extrapolate: Animated.Extrapolate.CLAMP
      });
      const animateHeight = outputRange => {
        return Animated.interpolate(fall, {
          inputRange: [0, 0.7],
          outputRange: outputRange,
          extrapolate: Animated.Extrapolate.CLAMP
        });
      };
      return (
        <Animated.Image
          overflow="hidden"
          style={[
            styles.cardImage,
            {
              opacity: animatedContentOpacity,
              height: Animated.concat(animateHeight([30, -4]), "%")
            }
          ]}
          source={{ uri: event.photoURL }}
        ></Animated.Image>
      );
    };
    const renderContent = () => {
      if (this.state.loading)
        return (
          <SafeAreaView style={styles.popup}>
            <Text>Loading...</Text>
          </SafeAreaView>
        );
      else
        return (
          <SafeAreaView style={styles.popup}>
            {renderHandler()}
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
                  marginBottom: -30
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
