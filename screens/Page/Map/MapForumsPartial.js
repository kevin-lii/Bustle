import React from "react";
import { Polygon } from "react-native-maps";

import { forumRegions } from "../../../global/mapconfig";

export default {
  generatePolygons: function() {
    return forumRegions.map(region =>
      region.inactive ? null : (
        <Polygon
          key={region.name}
          coordinates={region.coordinates}
          tappable={true}
          onPress={() => console.log("tapped", region.name)}
        />
      )
    );
  }
};
