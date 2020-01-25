import React, { useContext } from "react";
import { Avatar, Colors } from "react-native-ui-lib";

import { UserContext } from "../../dataContainers/context";

export default function({
  photoURL,
  init,
  nav,
  size,
  marginTop,
  marginRight,
  marginBottom,
  hasBorder,
  useUser
}) {
  const marginT = marginTop ? marginTop : 30;
  const marginR = marginRight ? marginRight : 30;
  const marginB = marginBottom ? marginBottom : 0;
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
      .map(name => name.charAt(0))
      .join("");
  } else {
    initials = "";
  }

  return (
    <Avatar
      onPress={nav}
      containerStyle={{
        marginTop: marginT,
        marginRight: marginR,
        marginBottom: marginB,
        borderWidth: 2,
        borderColor: hasBorder && Colors.orange20,
        overflow: "hidden"
      }}
      imageStyle={{
        justifyContent: "center",
        flex: 1,
        width: null,
        height: null,
        resizeMode: "contain",
        overflow: "hidden"
      }}
      imageSource={{ uri: photo }}
      label={initials}
      size={size}
      backgroundColor={photo ? Colors.white : Colors.yellow60}
      labelColor={Colors.orange20}
    />
  );
}
