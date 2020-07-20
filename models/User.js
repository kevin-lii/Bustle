export default class User {
  constructor({
    name,
    partition = "Berkeley",
    id = new ObjectId(),
    instagram = "",
    linkedin = "",
    major = "",
    photoURL = "",
    snapchat = "",
    twitter = "",
    year = "",
  }) {
    this._partition = partition;
    this._id = id;
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
  }
  static schema = {
    name: "User",
    properties: {
      _id: "objectId",
      _partition: "string",
      name: "string",
      hostedEvents: "Event[]",
      instagram: "string?",
      linkedin: "string?",
      major: "string?",
      pastEvents: "Event[]",
      photoURL: "string",
      snapchat: "string?",
      twitter: "string?",
      year: "string?",
    },
    primaryKey: "_id",
  };

  static privateSchema = {
    name: "PrivateUser",
    properties: {
      _id: "objectId",
      _partition: "string",
      name: "string",
      // hostedEvents: "Event?[]",
      instagram: "string?",
      // interestedEvents: "Event?[]",
      linkedin: "string?",
      major: "string?",
      // pastEvents: "Event?[]",
      photoURL: "string",
      snapchat: "string?",
      twitter: "string?",
      year: "string?",
      email: "string?",
      newUser: "bool?",
    },
    primaryKey: "_id",
  };

  static getPrivateUser(realm, id) {
    const query = realm.objectForPrimaryKey("PrivateUser", id);
    return query;
  }

  static get(realm, id) {
    const query = realm.objectForPrimaryKey("User", id);
    return query;
  }

  static getUsers(realm, filters) {
    let query = realm.objects("User");
    if (filters.name) query = query.filtered("name like " + filters.name);
    if (filters.major) query = query.filtered("major == " + filters.major);
    if (filters.year) query = query.filtered("year == " + filters.year);
    return query;
  }

  static saveEvent(eventID, status) {
    if (status) saveEvent(eventID);
    else unsaveEvent(eventID);
  }

  static async update(realm, user, update) {
    realm.write(() => {});
  }
  static async createNewProfile(realm, user, data) {
    await this.update(realm, user, { newUser: false, ...data });
  }
}
