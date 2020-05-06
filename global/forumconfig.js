exports.zones = [
  {
    name: "UC Berkeley",
    id: "ucb",
  },
];

exports.forumRegions = [
  {
    name: "Campus",
    zone: "ucb",
    id: "ucb_campus",
  },
  {
    name: "Downtown",
    zone: "ucb",
    id: "ucb_downtown",
  },
  {
    name: "Frat Row",
    zone: "ucb",
    id: "ucb_fratrow",
    inactive: true,
  },
  {
    name: "Southside",
    zone: "ucb",
    id: "ucb_southside",
  },
  {
    name: "Northside",
    zone: "ucb",
    id: "ucb_northside",
  },
];

exports.regionByID = {};
exports.forumRegions.forEach(
  (region) => (exports.regionByID[region.id] = region)
);
Object.freeze(exports.regionByID);

exports.zonesByID = {};
exports.zones.forEach((zone) => (exports.zonesByID[zone.id] = zone));
Object.freeze(exports.zoneByID);

exports.defaultRegions = {
  ucb: "ucb_campus",
};
