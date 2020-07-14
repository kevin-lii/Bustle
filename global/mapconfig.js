exports.initialMap = {
  latitude: 37.86835,
  longitude: -122.265,
  latitudeDelta: 0.0461,
  longitudeDelta: 0.0211,
};

exports.forumPolygons = {
  ucb_campus: [
    { latitude: 37.869774, longitude: -122.265768 }, // oxford st
    { latitude: 37.868741, longitude: -122.266186 }, // oxford st
    { latitude: 37.867844, longitude: -122.265997 }, //bottom left
    { latitude: 37.869631, longitude: -122.252249 }, // ihouse
    { latitude: 37.869156, longitude: -122.252177 }, // ihouse
    { latitude: 37.869441, longitude: -122.249724 }, // ihouse
    { latitude: 37.870138, longitude: -122.249698 }, //stadium
    { latitude: 37.870687, longitude: -122.249404 }, //stadium
    { latitude: 37.871225, longitude: -122.249568 }, //stadium
    { latitude: 37.874347, longitude: -122.252291 }, // foothill
    { latitude: 37.875651, longitude: -122.255402 }, //top right
    { latitude: 37.874165, longitude: -122.266286 }, //top left
  ],
  ucb_downtown: [
    { latitude: 37.869774, longitude: -122.265768 }, // oxford st
    { latitude: 37.868741, longitude: -122.266186 }, // oxford st
    { latitude: 37.864264, longitude: -122.265244 }, //bottom right
    { latitude: 37.863066, longitude: -122.274376 }, //bottom left
    { latitude: 37.87303, longitude: -122.275448 }, //top left
    { latitude: 37.874165, longitude: -122.266286 }, //top right
  ],
  ucb_fratrow: [
    { latitude: 37.869326, longitude: -122.254591 }, //top left
    { latitude: 37.869631, longitude: -122.252249 }, // ihouse
    { latitude: 37.869156, longitude: -122.252177 }, // ihouse
    { latitude: 37.869389, longitude: -122.250174 }, // ihouse
    { latitude: 37.866007, longitude: -122.249566 }, //bottom right
    { latitude: 37.865705, longitude: -122.253893 }, //bottom left
  ],
  ucb_southside: [
    { latitude: 37.867844, longitude: -122.265997 }, //top left
    { latitude: 37.864264, longitude: -122.265244 }, //downtown corner
    { latitude: 37.863362, longitude: -122.27209 }, //top left # 2
    { latitude: 37.854285, longitude: -122.271082 }, //bottom left
    { latitude: 37.854518, longitude: -122.269355 }, //ashby
    { latitude: 37.855018, longitude: -122.268465 }, //ashby
    { latitude: 37.85716, longitude: -122.252263 }, //ashby
    { latitude: 37.857736, longitude: -122.250675 }, //ashby
    { latitude: 37.858063, longitude: -122.245059 }, //bottom right
    { latitude: 37.866166, longitude: -122.246743 }, //clark kerr
    { latitude: 37.866007, longitude: -122.249566 }, //clark kerr
    { latitude: 37.869389, longitude: -122.250174 }, // ihouse
    { latitude: 37.869156, longitude: -122.252177 }, // ihouse
    { latitude: 37.869631, longitude: -122.252249 }, // ihouse + top right
  ],
  ucb_northside: [
    { latitude: 37.873327, longitude: -122.273199 }, //bottom left
    { latitude: 37.881461, longitude: -122.274097 }, //top left
    { latitude: 37.883554, longitude: -122.257861 }, //top right
    { latitude: 37.875651, longitude: -122.255402 }, //bottom right
  ],
};

exports.customMap = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7c93a3",
      },
      {
        lightness: "-10",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#a0a4a5",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#62838e",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#dde3e3",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#3f4a51",
      },
      {
        weight: "0.30",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.government",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.medical",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.school",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#c0c0c8",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: "-100",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#bbcacf",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        lightness: "0",
      },
      {
        color: "#bbcacf",
      },
      {
        weight: "0.50",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#a9b4b8",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        invert_lightness: true,
      },
      {
        saturation: "-7",
      },
      {
        lightness: "3",
      },
      {
        gamma: "1.80",
      },
      {
        weight: "0.01",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a3c7df",
      },
    ],
  },
];
