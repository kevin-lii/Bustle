import React from "react";

import Icons from "./Icons";
import { Theme } from "../../global/constants";

export default ({ type, color, size }) => {
  let iconSize;
  switch (type) {
    case "Dining":
      iconSize = size ? size : 25;
      return (
        <Icons
          type="MaterialIcons"
          icon="food-fork-drink"
          color={color}
          size={iconSize}
        />
      );
    case "Drinks":
      iconSize = size ? size : 20;
      return <Icons type="Entypo" icon="drink" color={color} size={iconSize} />;
    case "Professional":
      iconSize = size ? size : 25;
      return (
        <Icons type="Entypo" icon="suitcase" color={color} size={iconSize} />
      );
    case "Athletic":
      iconSize = size ? size : 25;
      return (
        <Icons
          icon="ios-basketball"
          color={color}
          size={iconSize}
          type="Ionicons"
        />
      );
    case "Learn":
      iconSize = size ? size : 25;
      return (
        <Icons
          type="Entypo"
          icon="graduation-cap"
          color={color}
          size={iconSize}
        />
      );
    case "Social":
      iconSize = size ? size : 25;
      return (
        <Icons type="Fontisto" icon="persons" color={color} size={iconSize} />
      );
    case "Service":
      iconSize = size ? size : 25;
      return (
        <Icons
          type="MaterialIcons"
          icon="room-service"
          color={color}
          size={iconSize}
        />
      );
    case "Community":
    default:
      iconSize = size ? size : 25;
      return (
        <Icons
          type="MaterialIcons"
          icon="earth"
          color={color}
          size={iconSize}
        />
      );
  }
};
