import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Linking, ScrollView } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { connect } from "react-redux";
import moment from "moment";
import HyperLink from "react-native-hyperlink";
import Url from "url";
import _ from "lodash";
import { TabView, TabBar } from "react-native-tab-view";
import { useSafeArea } from "react-native-safe-area-context";

import Icons from "../../components/Image/Icons";
import ActionButton from "../../components/Buttons/ActionButton";
import FormTypes from "../../components/Form/FormTypes";
import IconButton from "../../components/Buttons/IconButton";
import ProfileLink from "../../components/Buttons/ProfileLink";
import EventModel from "../../models/Event";
import { saveEvent, removeEvent } from "../../store/actions";
import { Theme } from "../../global/constants";
import globalStyles from "../../global/styles";

const Description = ({ event }) => (
  <View style={{ padding: 10 }}>
    <HyperLink linkDefault>
      <Text text65>{event.description}</Text>
    </HyperLink>
  </View>
);

const Attendees = ({ navigation, event }) => {
  return (
    <View>
      {event.attendees?.map((user, i) => (
        <View centerV padding-10 key={i}>
          <ProfileLink navigation={navigation} user={user} size={35} key={i} />
        </View>
      ))}
    </View>
  );
};

const EventDetail = function ({
  route,
  navigation,
  user,
  savedEvents,
  userRealm,
  saveEvent,
  removeEvent,
}) {
  const [event, setEvent] = useState(route.params?.event);
  const [saved, setSaved] = useState(
    savedEvents.includes(event._id.toString())
  );
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(0);
  const isHost = user._id.toString() === event.host._id.toString();

  useEffect(() => {
    let object;
    if (true) object = EventModel.getOne(userRealm, route.params?.event?._id);
    // else object = EventModel.getOne(realm, route.params?.event?._id);
    setEvent(object);
    object.addListener((obj, change) => {
      if (!_.values(change).every(_.isEmpty)) {
        setEvent(obj);
        setLoading(loading + 1);
      }
    });
  }, []);

  const routes = [
    {
      key: "attendees",
      title: `Interested (${event?.attendees?.length || 0})`,
    },
    { key: "description", title: "Description" },
  ];

  const startDate = moment(event.startDate).format("MMM Do, YYYY");
  const startTime = moment(event.startDate).format("h:mm a");
  const iconSize = 23;

  let button = (
    <ActionButton
      primary
      text="Join Event"
      onPress={() => {
        Linking.openURL(event.link);
        if (
          !user.pastEvents.filter((x) => x.toString() === event._id.toString())
            .length
        ) {
          userRealm.write(() => {
            user.pastEvents.push(event);
          });
        }
      }}
    />
  );
  let text = <Text center>{event.link && Url.parse(event.link).hostname}</Text>;
  if (new Date() < event.startDate) {
    if (isHost)
      button = !event.cancelled ? (
        <ActionButton
          secondary
          text="Cancel Event"
          onPress={() =>
            navigation.navigate("interstitial", {
              event,
              alertType: "cancelEvent",
            })
          }
        />
      ) : null;
    else if (saved)
      button = (
        <ActionButton
          secondary
          text="Saved to Calendar"
          onPress={() => {
            setSaved(!saved);
            removeEvent(event._id);
          }}
        />
      );
    else
      button = (
        <ActionButton
          primary
          text="Save to Calendar"
          onPress={() => {
            setSaved(!saved);
            saveEvent(event._id);
          }}
        />
      );

    if (!isHost)
      text = <Text center>Link available when the event starts.</Text>;
  } else if (event.endDate && new Date() > event.endDate) {
    button = null;
    text = <Text center>Event Ended.</Text>;
  } else if (isHost) {
    button = (
      <ActionButton
        backgroundColor={Theme.red}
        onPress={() =>
          navigation.navigate("interstitial", { event, alertType: "endEvent" })
        }
        borderColor="transparent"
        color="white"
        text="End Event"
      />
    );
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "description":
        return <Description event={event} navigation={navigation} />;
      case "attendees":
        return <Attendees event={event} navigation={navigation} />;
      default:
        return null;
    }
  };
  const padTop = useSafeArea().top;
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ ...styles.imageContainer, height: 175 + padTop }}>
          <ImageBackground
            source={event.photoURL ? { uri: event.photoURL } : null}
            style={styles.image}
          ></ImageBackground>
        </View>

        <Text style={styles.popupTitle}>{event.name}</Text>
        <View style={styles.info}>
          <ProfileLink navigation={navigation} user={event.host} />
          <View row centerV marginT-20 style={styles.infoLine}>
            <Icons type="Entypo" icon="calendar" size={iconSize + 1}></Icons>
            <Text text65 numberOfLines={1} marginL-10 style={styles.infoText}>
              {event.cancelled ? "Cancelled" : startTime + " on " + startDate}
            </Text>
          </View>
          <View row centerV style={styles.infoLine}>
            <Icons
              icon={event.link ? "desktop" : "map-marker-alt"}
              size={iconSize - 2}
            />
            <Text text65 numberOfLines={1} marginL-10 style={styles.infoText}>
              {event.location?.description || "Virtual"}
            </Text>
          </View>
          <View marginV-15>
            {button}
            {text}
          </View>
        </View>

        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: Theme.secondary }}
              style={{ backgroundColor: "white" }}
              activeColor={Theme.secondary}
              inactiveColor={Theme.secondary}
            />
          )}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{ backgroundColor: "white" }}
        />
      </ScrollView>

      <View
        flex
        row
        spread
        paddingH-10
        paddingT-15
        abs
        style={{ width: "100%", marginTop: padTop }}
      >
        <IconButton
          containerStyle={styles.iconCircle}
          onPress={navigation.goBack}
          type="FontAwesome"
          icon="arrow-left"
          color={Theme.primary}
          size={iconSize}
        />
        {isHost && (
          <IconButton
            containerStyle={styles.iconCircle}
            iconStyle={{ paddingBottom: 2, paddingLeft: 1 }}
            onPress={() => navigation.navigate(FormTypes.EVENT_EDIT, { event })}
            type="Font"
            icon="edit"
            color={Theme.primary}
            size={iconSize - 5}
          />
        )}
      </View>
    </>
  );
};

export default connect(
  (state) => ({
    realm: state.realm,
    userRealm: state.userRealm,
    user: state.user,
    savedEvents: state.saved,
  }),
  {
    saveEvent,
    removeEvent,
  }
)(EventDetail);

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: Theme.disabled,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  iconCircle: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 40,
    width: 40,
    ...globalStyles.overlayElementShadow,
  },
  popupTitle: {
    fontSize: 35,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 10,
  },
  info: {
    marginHorizontal: 10,
  },
  infoLine: {
    paddingLeft: 10,
    marginVertical: 10,
  },
});
