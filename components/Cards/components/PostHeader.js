import React from "react";
import { Avatar, Text, View } from "react-native-ui-lib";

import LocationLabel from "../../Buttons/LocationLabel";

export default ({ photoURL, displayName, regionID }) => (
  <View row>
    <View marginR-5>
      <Avatar source={{ uri: photoURL }} size={35} />
    </View>
    <View>
      <Text text90>{displayName}</Text>
      <LocationLabel pinIcon={false} regionID={regionID} onPress={() => {}} />
    </View>
  </View>
);
