import React from "react";
import { Avatar, Text, View } from "react-native-ui-lib";
import moment from "moment";

import LocationLabel from "../../Buttons/LocationLabel";
import Icons from "../../Image/Icons";

import { Theme } from "../../../global/constants";

export default ({ photoURL, displayName, uid, createdAt, regionID, isOP }) => {
  const date = createdAt?.toDate ? createdAt.toDate() : new Date();
  return (
    <View row centerV>
      <View marginR-5>
        <Avatar source={{ uri: photoURL }} size={25} />
      </View>
      <View row centerV>
        <Text style={{ fontSize: regionID ? 10 : 15 }}>{displayName}</Text>
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
    </View>
  );
};
