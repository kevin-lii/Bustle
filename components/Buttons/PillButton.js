import React from "react";
import { Button, Text } from "react-native-ui-lib";

import { Theme } from "../../global/constants";

export default ({ label, onPress }) => (
  <Button
    borderRadius={30}
    onPress={onPress}
    size="large"
    outline
    outlineColor={Theme.primary}
    backgroundColor="white"
  >
    <Text>{label}</Text>
  </Button>
);
