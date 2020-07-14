import React from "react";

import EventFilters from "./components/EventFilters";

import WithOverlayBottomSheet from "../../components/Container/WithOverlayBottomSheet";

export default ({ navigation, route }) => (
  <WithOverlayBottomSheet
    height={400}
    navigation={navigation}
    sheetContent={<EventFilters />}
  />
);
