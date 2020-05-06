import React from "react";
import { Text, View } from "react-native-ui-lib";
import moment from "moment";

import LocationLabel from "../../Buttons/LocationLabel";

import { Theme } from "../../../global/constants";

export default ({ regionID, time }) => (
  <View row>
    <LocationLabel regionID={regionID} onPress={() => {}} />
    {time && (
      <Text style={{ color: Theme.secondary, fontSize: 13, paddingTop: 2 }}>
        {" "}
        - {moment(time.toDate()).fromNow()}
      </Text>
    )}
  </View>
);
