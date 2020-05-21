import React from "react";
import { Text, View } from "react-native-ui-lib";
import moment from "moment";

import LocationLabel from "../../Buttons/LocationLabel";

import { Theme } from "../../../global/constants";

export default ({ regionID, time, onPick }) => (
  <View row>
    <LocationLabel regionID={regionID} onPick={onPick} />
    {time && (
      <Text style={{ color: Theme.primary, fontSize: 13, paddingTop: 2 }}>
        {" "}
        - {moment(time.toDate()).fromNow()}
      </Text>
    )}
  </View>
);
