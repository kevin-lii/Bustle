import React from "react";
import { Avatar, Text, View } from "react-native-ui-lib";

import LocationLabel from "../../Buttons/LocationLabel";
import Icons from "../../Image/Icons";

import { Theme } from "../../../global/constants";

export default ({ photoURL, displayName, uid, regionID, isOP }) => (
  <View row>
    <View marginR-5>
      <Avatar source={{ uri: photoURL }} size={25} />
    </View>
    <View>
      <Text style={{ fontSize: regionID ? 10 : 15 }}>{displayName}</Text>
      {regionID && (
        <LocationLabel pinIcon={false} regionID={regionID} onPress={() => {}} />
      )}
    </View>
    {isOP && (
      <View marginL-5>
        <Icons
          icon={"md-megaphone"}
          type="Ionicons"
          size={20}
          color={Theme.secondary}
        />
      </View>
    )}
  </View>
);
