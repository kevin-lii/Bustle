import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { ImageBackground, StyleSheet, Linking } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { TabView, TabBar } from "react-native-tab-view";
import moment from "moment";
import HyperLink from "react-native-hyperlink";

import Icons from "../../components/Image/Icons";
import { Theme } from "../../global/constants";
import ActionButton from "../../components/Buttons/ActionButton";
import FormTypes from "../../components/Form/FormTypes";
import { getNameInitials } from "../../global/utils";
import globalStyles from "../../global/styles";
import IconButton from "../../components/Buttons/IconButton";
import CollegeEventModel from "../../models/CollegeEvent";
import ProfileLink from "../../components/Buttons/ProfileLink";

const Description = ({ event }) => (
  <View>
    <Text>{event.description}</Text>
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

export default function ({ route, navigation }) {
  const [event, setEvent] = useState(route.params?.event);
  const [index, setIndex] = useState(0);

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
  const iconSize = 23;

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
    <View flex>
      <View style={{ ...styles.imageContainer, height: 175 }}>
        <ImageBackground
          source={event.photoURL ? { uri: event.photoURL } : null}
          style={styles.image}
        >
          <View
            flex
            row
            spread
            paddingH-20
            paddingT-15
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
            {auth().currentUser.uid === event.host.uid && (
              <IconButton
                containerStyle={styles.iconCircle}
                iconStyle={{ paddingBottom: 2, paddingLeft: 1 }}
                onPress={() =>
                  navigation.navigate(FormTypes.EVENT_EDIT, { event })
                }
                type="Font"
                icon="edit"
                color={Theme.primary}
                size={iconSize - 5}
              />
            )}
          </View>
        </ImageBackground>
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
        <ActionButton primary />
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
    </View>
  );
}

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
    marginHorizontal: 15,
  },
  infoLine: {
    paddingLeft: 10,
    marginVertical: 10,
  },
});
