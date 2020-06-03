import React from "react";
import { Avatar, Text, View } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import LocationLabel from "../../Buttons/LocationLabel";
import Icons from "../../Image/Icons";

import { Theme } from "../../../global/constants";
import { anonymous } from "../../../global/forumconfig";
import { navigatePath } from "../../../global/utils";
import IconButton from "../../Buttons/IconButton";
import { TouchableOpacity, StyleSheet } from "react-native";
import UserModel from "../../../models/User";

export default ({
  photoURL,
  displayName,
  uid,
  createdAt,
  postID,
  regionID,
  isOP,
}) => {
  const date = createdAt?.toDate ? createdAt.toDate() : new Date();
  const navigation = useNavigation();
  const isAnon = displayName === anonymous;
  const navigateProfile = () =>
    navigation.navigate("profile", {
      user: { photoURL, displayName, uid },
    });

  return (
    <View row spread>
      <TouchableOpacity
        style={{ alignItems: "center", flexDirection: "row" }}
        disabled={isAnon}
        onPress={!isAnon ? navigateProfile : null}
      >
        <View marginR-5>
          {!isAnon ? (
            <Avatar source={{ uri: photoURL }} size={25} />
          ) : (
            <View center style={styles.anonImage}>
              <Icons icon="user-secret" size={15} />
            </View>
          )}
        </View>
        <View row centerV>
          <Text
            style={{
              color: isAnon ? Theme.grey : Theme.secondary,
              fontSize: regionID ? 10 : 15,
              fontWeight: "bold",
            }}
          >
            {isAnon ? "Anonymous" : displayName}
          </Text>
          <Text color={Theme.grey}> - {moment(date).fromNow(true)}</Text>
          {regionID && (
            <LocationLabel
              pinIcon={false}
              regionID={regionID}
              onPress={() => {}}
            />
          )}
        </View>
        {isOP && (
          <View marginL-5>
            <Icons
              icon={"md-megaphone"}
              type="Ionicons"
              size={20}
              color={Theme.primary}
            />
          </View>
        )}
      </TouchableOpacity>
      <View marginR-5 centerV>
        <IconButton
          icon="move-h-a"
          color={Theme.secondary}
          size={15}
          onPress={() =>
            navigatePath(navigation, "sheet/postoptions", {
              postID,
              authorID: uid,
            })
          }
          hitBox={{ top: 10, bottom: 5, left: 5, right: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  anonImage: {
    borderWidth: 1,
    borderRadius: 20,
    width: 25,
    height: 25,
    borderColor: Theme.grey,
  },
});
