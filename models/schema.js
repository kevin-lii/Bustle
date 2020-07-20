exports.eventSchema = {
  name: "Event",
  properties: {
    _id: "objectId",
    _partition: "string",
    name: "string",
    cancelled: "bool",
    category: "string",
    description: "string",
    photoURL: "string",
    startDate: "date",
    virtual: "bool",

    // attendees: "User?[]",
    endDate: "date?",
    // host: "User?",
    link: "string?",
    location: "string?",
  },
  primaryKey: "_id",
};

exports.smallUserSchema = {
  name: "User",
  properties: {
    _id: "objectId",
    _partition: "string",
    name: "string",
    photoURL: "string",
  },
  primaryKey: "_id",
};

exports.userSchema = {
  name: "User",
  properties: {
    _id: "objectId",
    _partition: "string",
    name: "string",
    hostedEvents: "Event?[]",
    instagram: "string?",
    linkedin: "string?",
    major: "string?",
    pastEvents: "Event?[]",
    photoURL: "string",
    snapchat: "string?",
    twitter: "string?",
    year: "string?",
  },
  primaryKey: "_id",
};

exports.privateSchema = {
  name: "PrivateUser",
  properties: {
    _id: "objectId",
    _partition: "string",
    name: "string",
    hostedEvents: "Event?[]",
    instagram: "string?",
    interestedEvents: "Event?[]",
    linkedin: "string?",
    major: "string?",
    pastEvents: "Event?[]",
    photoURL: "string",
    snapchat: "string?",
    twitter: "string?",
    year: "string?",
    email: "string?",
    newUser: "bool?",
  },
};
