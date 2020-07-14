import React from "react";
import MapPlus from "./map-plus";
import PostPlus from "./post-plus";

export default ({ name, color, size }) => {
  switch (name) {
    case "map-plus":
      return <MapPlus color={color} size={size ? String(size) : null} />;
    case "post-plus":
      return <PostPlus color={color} size={size ? String(size) : null} />;
    default:
      return <React.Fragment />;
  }
};
