import { ObjectId } from "bson";

export default class User {
  constructor({
    name = "",
    partition = "Berkeley",
    id = new ObjectId(),
    uid = "",
    instagram = "",
    linkedin = "",
    major = "",
    photoURL = "",
    location = "",
    snapchat = "",
    twitter = "",
    year = 2024,
    newUser = true,
  }) {
    this._partition = partition;
    this._id = id;
    this.uid = uid;
    this.name = name;
    this.hostedEvents = [];
    this.instagram = instagram;
    this.interestedEvents = [];
    this.linkedin = linkedin;
    this.major = major;
    this.location = location || null;
    this.pastEvents = [];
    this.snapchat = snapchat;
    this.twitter = twitter;
    this.photoURL = photoURL;
    this.year = year;
    this.newUser = newUser;
  }
  static schema = {
    name: "User",
    properties: {
      _id: "objectId",
      _partition: "string",
      uid: "string",
      displayName: "string",
      hostedEvents: {
        type: "linkingObjects",
        objectType: "Event",
        property: "host",
      },
      instagram: "string?",
      interestedEvents: "Event[]",
      linkedin: "string?",
      major: "string?",
      pastEvents: "Event[]",
      photoURL: "string",
      snapchat: "string?",
      twitter: "string?",
      year: "int?",
    },
    primaryKey: "_id",
  };

  static privateSchema = {
    name: "User",
    properties: {
      _id: "objectId",
      _partition: "string",
      uid: "string",
      displayName: "string",
      hostedEvents: {
        type: "linkingObjects",
        objectType: "Event",
        property: "host",
      },
      instagram: "string?",
      interestedEvents: "Event[]",
      linkedin: "string?",
      major: "string?",
      pastEvents: "Event[]",
      photoURL: "string",
      snapchat: "string?",
      twitter: "string?",
      year: "int?",
      email: "string?",
      newUser: "bool?",
    },
    primaryKey: "_id",
  };

  static get(realm, id) {
    const query = realm.objectForPrimaryKey("User", new ObjectId(id));
    return query;
  }

  static getUsers(realm, filters) {
    let query = realm.objects("User");
    if (filters.name) query = query.filtered("name like " + filters.name);
    if (filters.major) query = query.filtered("major == " + filters.major);
    if (filters.year) query = query.filtered("year == " + filters.year);
    return query.values;
  }

  // static saveEvent(eventID, status) {
  //   if (status) saveEvent(eventID);
  //   else unsaveEvent(eventID);
  // }

  static async update(realm, user, update) {
    realm.write(() => {
      if (update.newUser != null || update.newUser != undefined)
        user.newUser = update.newUser;
      if (update.newUser === false && update.displayName)
        user.displayName = update.displayName;
      if (update.year && user.year != update.year) user.year = update.year;
      if (update.major && user.major != update.major) user.major = update.major;
      if (update.bio && user.bio != update.bio) user.bio = update.bio;
      if (update.instagram && user.instagram != update.instagram)
        user.instagram = update.instagram;
      if (update.snapchat && user.snapchat != update.snapchat)
        user.snapchat = update.snapchat;
      if (update.linkedin && user.linkedin != update.linkedin)
        user.linkedin = update.linkedin;
    });
  }
  static async createNewProfile(realm, user, data) {
    await this.update(realm, user, { newUser: false, ...data });
  }
}
