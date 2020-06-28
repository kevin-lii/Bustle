import React from "react";
import { View, Text } from "react-native-ui-lib";

import WithOverlayBottomSheet from "../../../components/Container/WithOverlayBottomSheet";
import EventFilters from "../../../components/Form/EventFilters";

export default ({ navigation, route }) => (
  <WithOverlayBottomSheet
    height={400}
    navigation={navigation}
    sheetContent={<EventFilters />}
  />
);
