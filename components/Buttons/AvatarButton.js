import React, { useContext } from "react";
import { Avatar, Colors } from "react-native-ui-lib";

import { UserContext } from "../../dataContainers/context";
import { Theme } from "../../global/constants";

import globalStyles from "../../global/styles";

export default function ({
  photoURL,
  name,
  onPress,
  size,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  borderWidth = 0,
  borderColor = Theme.primary,
  useUser,
  shadow = true,
}) {
  const user = useContext(UserContext);
  // set photo if photo is valid
  let photo;
  if (photoURL) {
    if (photoURL.indexOf("facebook") !== -1) photo = photoURL + "?height=150";
    else photo = photoURL;
  } else if (useUser && user && user.photoURL) {
    photo = user.photoURL;
  } else {
    photo = "";
  }
  // set initials if photo is invalid
  let initials;
  const displayName = name || user.displayName;
  if (name && !photo) {
    initials = displayName
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
          borderWidth,
          borderColor,
          overflow: "hidden",
        },
        shadow ? globalStyles.overlayElementShadow : null,
      ]}
      imageStyle={{
        justifyContent: "center",
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
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
