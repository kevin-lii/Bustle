// // import firestore from "@react-native-firebase/firestore";
// // import storage from "@react-native-firebase/storage";
import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Header,
  SearchBar,
} from "react-native-elements";
import { SocialIcon } from "react-native-elements";
import { openURL } from "../../global/utils";
import { ScrollView } from "react-native-gesture-handler";

export default function Discover() {
  const tempArray = [
    {
      name: "Manreet Atwal",
      year: "2021",
      major: "Haas",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      instagram: "m_atwal",
      linkedin: "yeet",
      snap: "yeet",
    },
    {
      name: "Jason Kang",
      year: "2021",
      major: "Computer Science",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      instagram: "m_atwal",
      twitter: "yeet",
    },
    {
      name: "Melissa H.",
      year: "2024",
      major: "Biology",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      twitter: "m_atwal",
    },
    {
      name: "Myles Garret.",
      year: "2023",
      major: "Gender Studies",
      avatar: "https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg",
      instagram: "m_atwal",
      snap: "yeet",
    },
  ];

  let renderArray;
  renderArray = tempArray.map((item) => {
    let subtitle = (
      <View>
        <Text>{item.major}</Text>
        <Text>{item.year}</Text>
        <View style={{ flexDirection: "row", marginLeft: -6 }}>
          {Boolean(item.instagram) && (
            <Icon
              name="instagram"
              onPress={() => openURL("m_atwal", "instagram")}
              type="font-awesome-5"
              size={21}
              style={{ padding: "3%" }}
            />
          )}
          {Boolean(item.twitter) && (
            <Icon
              name="twitter"
              color="#1da1f2"
              onPress={() => openURL("realDonaldTrump", "Twitter")}
              type="font-awesome-5"
              size={21}
              style={{ padding: "3%" }}
            />
          )}
          {Boolean(item.linkedin) && (
            <Icon
              name="linkedin"
              color="#0072b1"
              onPress={() => openURL("manreet-atwal", "LinkedIn")}
              type="font-awesome-5"
              size={21}
              style={{ padding: "3%" }}
            />
          )}
          {Boolean(item.snap) && (
            <Icon
              name="snapchat-ghost"
              type="font-awesome-5"
              size={21}
              style={{ padding: "3%" }}
            />
          )}
        </View>
      </View>
    );
    return (
      <ListItem
        title={item.name}
        subtitle={subtitle}
        subtitleStyle={{ fontSize: 16, color: "#1c004b" }}
        titleStyle={{ fontSize: 18, fontWeight: "bold", color: "#1C004B" }}
        leftAvatar={{ size: "medium", source: { uri: item.avatar } }}
        bottomDivider={true}
      ></ListItem>
    );
  });
  //  <Card containerStyle = {{paddingLeft:0, paddingRight:0}} style = {{marginTop: "1%", marginLeft: "2%"}}>

  //           /* <Text style = {{marginLeft: "4%"}}>
  //           <Text style = {{fontSize: 17}}> {item.major}</Text>
  //           <Text style = {{fontSize: 17}}> {item.year}</Text>
  //           {"\n"}
  //           </Text> */

  //  </Card>

  return (
    <View backgroundColor="#ffffff">
      <Header
        backgroundColor="#ffffff"
        placement="left"
        leftComponent={{
          text: "Discover",
          style: {
            color: "#ff7100",
            fontSize: 35,
            fontWeight: "bold",
            margin: "1%",
          },
        }}
      />
      <SearchBar
        platform="ios"
        placeholder="Search by major or year"
        lightTheme={true}
        containerStyle={{ borderWidth: 0 }}
      ></SearchBar>
      <ScrollView>{renderArray}</ScrollView>
    </View>
  );
}
