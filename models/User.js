export default class User {
  static schema = {
    name: "User",
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
    },
    primaryKey: "_id",
  };

  static privateSchema = {
    name: "User",
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
      email: "string",
      newUser: "bool",
    },
  };

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
