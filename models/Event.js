import { ObjectId } from "bson";

export default class Event {
  constructor({
    name,
    partition,
    id = new ObjectId(),
    category,
    link,
    host,
    location,
    description,
    endDate,
    photoURL,
    startDate,
    virtual,
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.cancelled = false;
    this.category = category;
    this.attendees = [];
    this.host = host;
    this.link = link || null;
    this.location = location || null;
    this.description = description;
    this.endDate = endDate;
    this.photoURL = photoURL;
    this.startDate = startDate;
    this.virtual = virtual;
  }
  static schema = {
    name: "Event",
    properties: {
      _id: "objectId",
      _partition: "string",
      name: "string",
      attendees: "User?[]",
      cancelled: "bool",
      category: "string",
      location: "object?",
      description: "string",
      endDate: "date?",
      host: "User?",
      link: "string?",
      photoURL: "string",
      startDate: "date",
      virtual: "bool",
    },
    primaryKey: "_id",
  };

  static get(realm, filters) {
    let query = realm.objects("Event").snapshot();
    if (filters.containsID && filters.containsID.length)
      query = query.where(
        firestore.FieldPath.documentId(),
        "in",
        filters.containsID
      );
    if (filters.host) query = query.filtered("host == ", filters.host);
    if (filters.categories?.length)
      query = query.filtered("category in " + filters.categories);
    if (filters.active)
      query = query
        .filtered("startDate >= " + moment().subtract(1, "d").toDate())
        .filtered("endDate < " + moment().toDate())
        .filtered("cancelled == false");

    if (filters.live) query = query.filtered("ended == false");
    if (filters.orderBy) query = query.sorted([filters.orderBy, false]);
    return query;
  }

  static subscribe(realm, filters) {
    let query = realm.objects("Event");
    if (filters.containsID && filters.containsID.length)
      query = query.where(
        firestore.FieldPath.documentId(),
        "in",
        filters.containsID
      );
    if (filters.host) query = query.filtered("host == ", filters.host);
    if (filters.categories?.length)
      query = query.filtered("category in " + filters.categories);
    if (filters.active)
      query = query
        .filtered("startDate >= " + moment().subtract(1, "d").toDate())
        .filtered("endDate < " + moment().toDate())
        .filtered("cancelled == false");

    if (filters.live) query = query.filtered("ended == false");
    if (filters.orderBy) query = query.sorted([filters.orderBy, false]);
    return query;
  }

  static getOne(realm, id) {
    const query = realm.objectForPrimaryKey("Event", id);
    return query;
  }

  static async create(realm, user, data) {
    if (!data.name) throw new Error("Name not provided");
    realm.write(() => {
      const newEvent = new Event({ ...data });
      realm.create("Event", newEvent);
      user.hostedEvents.push(newEvent);
    });
  }

  static async update(realm) {
    realm.write(() => {});
  }

  static remove(realm, event) {
    realm.write(() => {
      const user = event.host;
      realm.delete(event);
      const index = user.hostedEvents.findIndex((ev) => ev._id == event._id);
      user.hostedEvents.splice(index, 1);
    });
  }

  static end(realm, event) {
    realm.write(() => {
      event.endDate = new Date();
    });
  }

  static cancel(realm, event) {
    realm.write(() => {
      event.cancelled = true;
    });
  }
}
