import React from "react";

import UserFilters from "./components/UserFilters";

import WithOverlayBottomSheet from "../../components/Container/WithOverlayBottomSheet";

export default ({ navigation, route }) => (
  <WithOverlayBottomSheet
    height={600}
    navigation={navigation}
    sheetContent={<UserFilters />}
  />
);
