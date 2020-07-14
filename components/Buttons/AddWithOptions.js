import React from "react";
import { View, TouchableOpacity, Text } from "react-native-ui-lib";

import styles from "./styles";
import globalStyles from "../../global/styles";
import IconButton from "./IconButton";

export default ({
  primaryIcon,
  primaryLabel,
  secondaryIcon,
  secondaryLabel,
  onPressPrimary,
  onPressSecondary,
  containerStyle,
}) => (
  <View
    flex
    spread
    style={[{ height: 110, alignItems: "flex-end" }, containerStyle]}
  >
    <View row centerV spread style={{ width: 90 }}>
      <Text>{secondaryLabel}</Text>
      <IconButton
        touchStyle={[
          styles.button,
          styles.smallButton,
          globalStyles.overlayElementShadow,
        ]}
        onPress={onPressSecondary}
        icon={secondaryIcon}
        size={20}
      />
    </View>
    <View row centerV spread style={{ width: 90 }}>
      <Text>{primaryLabel}</Text>
      <IconButton
        touchStyle={[
          styles.button,
          styles.smallButton,
          globalStyles.overlayElementShadow,
        ]}
        onPress={onPressPrimary}
        icon={primaryIcon}
        size={20}
      />
    </View>
  </View>
);
