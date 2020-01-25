import React, { useEffect } from "react";
import { View, Text } from "react-native";
import moment from "moment";

import Icons from "../Image/Icons";
import styles from "./styles";
import UserData from "../../models/User";
import Avatar from "../Header/HeaderRight";
import { UserContext } from "../../dataContainers/context";
import Button from "../Buttons/ActionButton";

export default class EventBottomSheet extends React.Component {
  static contextType = UserContext;
  state = {
    loading: true,
    host: "",
    photoURL: "",
    initials: "",
    user: this.context
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
    const { event } = this.props;
    const date = moment(event.date.toDate()).format("MMM Do, YYYY");
    const time = moment(event.time.toDate()).format("h:mm a");
    const location = event.location ? event.location.description : "See Map";
    let eventList = this.state.user.events;

    if (this.state.loading)
      return (
        <View style={[styles.popup]}>
          <Text>Loading...</Text>
        </View>
      );
    else
      return (
        <View style={[styles.popup]}>
          <View
            style={{
              borderBottomColor: "#666666",
              alignSelf: "center",
              borderBottomWidth: 3,
              width: "20%",
              marginTop: 5,
              marginBottom: 10
            }}
          />

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
                photoURL={this.state.photoURL}
                init={this.state.initials}
                size={30}
                marginBottom={30}
                marginRight={0}
                marginTop={25}
              />
            </View>
            <Text numberOfLines={1} style={styles.infoText}>
              <Icons type="Entypo" icon="calendar" size={15}></Icons> {time} on{" "}
              {date}
            </Text>
            <Text numberOfLines={1} style={styles.infoText}>
              <Icons type="Fontisto" icon="map-marker" size={15}></Icons>{" "}
              {location}
            </Text>
            {!this.state.user.events.includes(event.id) ? (
              <View style={{ width: "33%", marginTop: 10 }}>
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
                ></Button>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: "33%",
                    marginTop: 10,
                    marginRight: 5
                  }}
                >
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
                  ></Button>
                </View>
                <Text style={{ color: "green" }}>
                  <Icons type="Feather" icon="check-circle" color="green" /> You
                  are currently going
                </Text>
              </View>
            )}
          </View>
        </View>
      );
  }
}
