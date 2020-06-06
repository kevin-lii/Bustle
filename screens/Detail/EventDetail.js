import React, { useState } from "react";
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
            row
            style={{
              paddingHorizontal: 20,
              paddingTop: 15,
              flex: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View centerV center style={styles.iconCircle}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icons icon="arrow-left" size={25} color={Theme.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      <Text style={styles.popupTitle}>{event.name}</Text>
      <View style={styles.info}>
        <View style={styles.infoLine} centerV row>
          <Avatar
            photoURL={event.host.photoURL}
            init={getNameInitials(event.host.displayName)}
            size={40}
          />
          <Text text65 numberOfLines={1} style={styles.infoText}>
            Hosted by {event.host.displayName}
          </Text>
        </View>
        <View row centerV style={styles.infoLine}>
          <Icons type="Entypo" icon="calendar" size={40}></Icons>
          <Text text65 numberOfLines={1} style={styles.infoText}>
            {startTime} on {startDate}
          </Text>
        </View>
        <View row centerV style={styles.infoLine}>
          <Icons icon="link" size={40}></Icons>
          <Text text65 numberOfLines={1} style={styles.infoText}>
            {event.link}
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
    opacity: 0.75,
  },
  iconCircle: {
    backgroundColor: "white",
    opacity: 1,
    borderRadius: 20,
    height: 35,
    width: 35,
  },
  popupTitle: {
    fontSize: 35,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  infoText: {
    fontWeight: "bold",
    marginLeft: "10%",
    marginBottom: 7.5,
  },
  info: {
    marginHorizontal: 15,
  },
  infoLine: {
    marginBottom: 10,
    marginRight: "20%",
  },
});
