// // import firestore from "@react-native-firebase/firestore";
// // import storage from "@react-native-firebase/storage";
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { View, Text, ListItem, ThemeManager } from "react-native-ui-lib";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";

import IconButton from "../../components/Buttons/IconButton";
import FeedHeader from "../../components/Header/FeedHeader";
import { getUsers } from "../../store/actions";
import { openURL } from "../../global/utils";
import AvatarButton from "../../components/Buttons/AvatarButton";

function Discover({ navigation, users, getUsers }) {
  const [search, changeSearch] = useState("");

  useEffect(() => {
    getUsers({ name: search });
  }, [search]);

  const renderRow = (item) => {
    return (
      <ListItem
        activeOpacity={0.3}
        height={90}
        key={item._id}
        containerStyle={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: ThemeManager.dividerColor,
        }}
        onPress={() => {
          navigation.push("profile", { user: item });
        }}
      >
        <ListItem.Part
          left
          containerStyle={{ marginHorizontal: 15, paddingVertical: 10 }}
        >
          <AvatarButton
            photoURL={item.photoURL}
            name={item.displayName}
            size={60}
          />
        </ListItem.Part>
        <ListItem.Part column containerStyle={{ paddingRight: 17 }}>
          <ListItem.Part>
            <Text text65>{item.displayName}</Text>
          </ListItem.Part>
          <ListItem.Part>
            <Text text75>{`${item.major}`}</Text>
          </ListItem.Part>
          <ListItem.Part>
            <Text text75>{`C/O ${item.year}`}</Text>
          </ListItem.Part>
          <View row>
            {Boolean(item.instagram) && (
              <IconButton
                icon="instagram"
                onPress={() => openURL(item.instagram, "instagram")}
                type="FontAwesome5"
                size={25}
                color="black"
                containerStyle={{ marginRight: 10 }}
              />
            )}
            {Boolean(item.snapchat) && (
              <IconButton
                icon="snapchat-ghost"
                type="FontAwesome5"
                onPress={() => openURL(item.snapchat, "snapchat")}
                size={25}
                color="black"
                containerStyle={{ marginRight: 10 }}
              />
            )}
            {Boolean(item.twitter) && (
              <IconButton
                icon="twitter"
                color="#1da1f2"
                onPress={() => openURL(item.twitter, "Twitter")}
                type="FontAwesome5"
                size={25}
                containerStyle={{ marginRight: 10 }}
              />
            )}
            {Boolean(item.linkedin) && (
              <IconButton
                icon="linkedin"
                color="#0072b1"
                onPress={() => openURL(item.linkedin, "LinkedIn")}
                type="FontAwesome5"
                size={25}
                containerStyle={{ marginRight: 10 }}
              />
            )}
          </View>
        </ListItem.Part>
      </ListItem>
    );
  };

  return (
    <View flex backgroundColor="white">
      <FeedHeader
        navigation={navigation}
        text="Discover"
        filterable="userfilters"
      />
      <View backgroundColor="white">
        <SearchBar
          placeholder="Search for other people"
          lightTheme={true}
          onChangeText={(e) => {
            changeSearch(e);
          }}
          value={search}
        />
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={(item) => item._id.toString()}
        ListEmptyComponent={() => (
          <View centerH centerV>
            <Text text65 style={{ fontWeight: "bold" }}>
              No users came up from your search
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export default connect(
  (state) => ({
    users: state.users,
  }),
  {
    getUsers,
  }
)(Discover);
