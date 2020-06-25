import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
import { ImageBackground, StyleSheet, Linking, ScrollView } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { TabView, TabBar } from "react-native-tab-view";
import moment from "moment";
import HyperLink from "react-native-hyperlink";
import AwesomeAlert from "react-native-awesome-alerts";
import Url from "url";

import Icons from "../../components/Image/Icons";
import ActionButton from "../../components/Buttons/ActionButton";
import FormTypes from "../../components/Form/FormTypes";
import IconButton from "../../components/Buttons/IconButton";
import ProfileLink from "../../components/Buttons/ProfileLink";

import { Theme } from "../../global/constants";
import { getNameInitials } from "../../global/utils";
import globalStyles from "../../global/styles";
import UserModel from "../../models/User";

import { saveEvent, removeEvent } from "../../store/actions";
import CollegeEventModel from "../../models/CollegeEvent";

const Description = ({ event }) => (
  <View>
    <HyperLink linkDefault>
      <Text>{event.description}</Text>
    </HyperLink>
  </View>
);

const Attendees = ({ navigation, event }) => (
  <View>
    {event.attendees?.map((user, i) => (
      <View centerV padding-10 key={i}>
        <ProfileLink navigation={navigation} user={user} size={35} key={i} />
      </View>
    ))}
  </View>
);

const alertMessages = ["", "Cancel Event?", "End Event?"];

const EventDetail = function ({
  route,
  navigation,
  user,
  saveEvent,
  removeEvent,
}) {
  const [event, setEvent] = useState(route.params?.event);
  const [saved, setSaved] = useState(user.saved[event.id]);
  const [alert, setAlert] = useState(false);
  const [index, setIndex] = useState(0);

  const handleAlertConfirm = () => {
    switch (alert) {
      case 1:
        CollegeEventModel.cancel(route.params.event.id);
        break;
      case 2:
        CollegeEventModel.remove(route.params.event);
        break;
    }
    setAlert(false);
  };

  useEffect(() => {
    return CollegeEventModel.subscribeOne(route.params.event.id, (event) =>
      setEvent(event.data())
    );
  }, []);
  const routes = [
    {
      key: "attendees",
      title: `Interested (${event?.attendees?.length || 0})`,
    },
    { key: "description", title: "Description" },
  ];

  const startDate = moment(event.startDate.toDate()).format("MMM Do, YYYY");
  const startTime = moment(event.startDate.toDate()).format("h:mm a");
  const isHost = auth().currentUser.uid === event.host.uid;
  const iconSize = 23;

  let button = (
    <ActionButton
      primary
      text="Join Event"
      onPress={() => Linking.openURL(event.link)}
    />
  );
  let text = <Text center>{event.link && Url.parse(event.link).hostname}</Text>;
  if (new Date() < event.startDate.toDate()) {
    if (isHost)
      button = (
        <ActionButton
          secondary
          text="Cancel Event"
          onPress={() => setAlert(1)}
        />
      );
    else if (saved)
      button = (
        <ActionButton
          secondary
          text="Saved to Calendar"
          onPress={() => {
            setSaved(!saved);
            UserModel.saveEvent(event.id, false);
            saveEvent(event);
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
            UserModel.saveEvent(event.id, false);
            removeEvent(event);
          }}
        />
      );

    if (!isHost)
      text = <Text center>Link available when the event starts.</Text>;
  } else if (isHost) {
    button = (
      <ActionButton
        backgroundColor={Theme.red}
        onPress={() => setAlert(2)}
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
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ ...styles.imageContainer, height: 175 }}>
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
              {startTime} on {startDate}
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
        style={{ width: "100%" }}
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

      <AwesomeAlert
        show={Boolean(alert)}
        showProgress={false}
        message={alertMessages[alert]}
        closeOnTouchOutside
        closeOnHardwareBackPress
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes, I'm sure"
        confirmButtonColor={Theme.red}
        onDismiss={() => setAlert(false)}
        onCancelPressed={() => setAlert(false)}
        onConfirmPressed={handleAlertConfirm}
      />
    </>
  );
};

export default connect(
  (state) => ({
    user: state.user,
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
