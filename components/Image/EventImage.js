import React from "react";

import Icons from "./Icons";
import { Theme } from "../../global/constants";
import {} from "./Icons/";

exports.generateDefaultURL = function (genre) {
  switch (genre) {
    case "Dining":
      return (
        <Icons
          type="MaterialIcons"
          icon="food-fork-drink"
          color={color}
          size={iconSize}
        />
      );
    case "Drinks":
      return <Icons type="Entypo" icon="drink" color={color} size={iconSize} />;
    case "Professional":
      return (
        <Icons type="Entypo" icon="suitcase" color={color} size={iconSize} />
      );
    case "Athletic":
      return (
        <Icons
          icon="ios-basketball"
          color={color}
          size={iconSize}
          type="Ionicons"
        />
      );
    case "Learn":
      return (
        <Icons
          type="Entypo"
          icon="graduation-cap"
          color={color}
          size={iconSize}
        />
      );
    case "Spiritual":
      return <Icons type="Font" icon="cross" color={color} size={iconSize} />;
    case "Service":
      return (
        <Icons
          type="MaterialIcons"
          icon="room-service"
          color={color}
          size={iconSize}
        />
      );
    case "Social":
    default:
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
