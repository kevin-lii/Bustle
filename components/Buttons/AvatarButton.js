import React, { useContext } from "react";
import { Avatar, Colors } from "react-native-ui-lib";

import { UserContext } from "../../dataContainers/context";
import { Theme } from "../../global/constants";

import globalStyles from "../../global/styles";

export default function ({
  photoURL,
  init,
  onPress,
  size,
  marginTop = 20,
  marginRight = 10,
  marginBottom = 0,
  hasBorder,
  useUser,
}) {
  const user = useContext(UserContext);
  let photo;
  if (photoURL) {
    photo = photoURL;
  } else if (useUser && user && user.photoURL) {
    photo = user.photoURL;
  } else {
    photo = "";
  }
  let initials;
  if (init && !photo) {
    initials = init;
  } else if (useUser && user && user.displayName && !photo) {
    initials = user.displayName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("");
  } else {
    initials = "";
  }

  return (
    <Avatar
      onPress={onPress}
      containerStyle={[
        {
          marginTop,
          marginRight,
          marginBottom,
          borderWidth: hasBorder ? 1 : 0,
          borderColor: Theme.primary,
          overflow: "hidden",
        },
        globalStyles.overlayElementShadow,
      ]}
      imageStyle={{
        justifyContent: "center",
        flex: 1,
        width: null,
        height: null,
        resizeMode: "contain",
        overflow: "hidden",
      }}
      source={{ uri: photo }}
      label={initials}
      size={size}
      backgroundColor={photo ? Colors.white : Colors.yellow60}
      labelColor={Colors.orange20}
    />
  );
}
