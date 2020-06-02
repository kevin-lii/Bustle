import React from "react";
import { View, Text } from "react-native-ui-lib";

import WithOverlayBottomSheet from "../../../components/Container/WithOverlayBottomSheet";
import PostOptions from "../../../components/Form/PostOptions";

export default ({ navigation, route }) => (
  <WithOverlayBottomSheet
    height={200}
    navigation={navigation}
    sheetContent={<PostOptions {...route.params} navigation={navigation} />}
  />
);
