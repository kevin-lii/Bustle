import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { ImageBackground, StyleSheet, Linking } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { TabView, TabBar } from "react-native-tab-view";
import moment from "moment";
import HyperLink from "react-native-hyperlink";

import Icons from "../../components/Image/Icons";
import Avatar from "../../components/Buttons/AvatarButton";
import { Theme } from "../../global/constants";
import ActionButton from "../../components/Buttons/ActionButton";
import FormTypes from "../../components/Form/FormTypes";
import { getNameInitials } from "../../global/utils";
import globalStyles from "../../global/styles";
import IconButton from "../../components/Buttons/IconButton";

function Temp({ event }) {
  return (
    <View>
      <Text>{event.description}</Text>
    </View>
  );
}

function Temp1() {
  return <View></View>;
}

export default function ({ route, navigation }) {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: "description", title: "Description" },
    { key: "discussion", title: "Discussion" },
  ];
  const event = route.params?.event;
  const startDate = moment(event.startDate.toDate()).format("MMM Do, YYYY");
  const startTime = moment(event.startDate.toDate()).format("h:mm a");
  const iconSize = 23;

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "description":
        return <Temp event={event} navigation={navigation} />;
      case "discussion":
        return <Temp1 event={event} navigation={navigation} />;
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
        <View marginT-5 centerV row>
          <Avatar
            photoURL={event.host.photoURL}
            init={getNameInitials(event.host.displayName)}
            size={25}
            shadow={false}
            borderWidth={1}
          />
          <TouchableOpacity
            onPress={() => navigation.push("profile", { user: event.host })}
          >
            <Text text80 marginL-7 numberOfLines={1}>
              by {event.host.displayName}
            </Text>
          </TouchableOpacity>
        </View>
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
