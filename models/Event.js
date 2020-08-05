import { ObjectId } from "bson";
import moment from "moment";
import _ from "lodash";

export default class Event {
  constructor({
    name,
    partition = "Berkeley",
    id = new ObjectId(),
    category = "",
    link = "",
    host,
    location = "",
    description = "",
    endDate = null,
    photoURL = "",
    startDate = new Date(),
    tags,
    virtual = false,
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
    this.tags = tags || [];
    this.virtual = virtual;
  }

  static schema = {
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
      attendees: {
        type: "linkingObjects",
        objectType: "User",
        property: "interestedEvents",
      },
      endDate: "date?",
      host: "User?",
      link: "string?",
      location: "string?",
      tags: "string[]",
    },
    primaryKey: "_id",
  };

  static filter(query, filters) {
    console.log(query);
    if (filters.containsID?.length)
      query = query.filtered("_id in " + filters.containsID);
    if (filters.host) query = query.filtered(`host == "${filters.host}"`);
    if (filters.categories?.length) {
      const filter = filters.categories
        .map((category) => `category ==  "${category}"`)
        .join(" OR ");
      query = query.filtered(filter);
    }
    if (filters.tags?.length) {
      const filter = filters.tags.map((tag) => `"${tag}" in tags`).join(" OR ");
      å;
      query = query.filtered(filter);
    }
    if (filters.active)
      query = query
        .filtered(
          "startDate >= " +
            moment().subtract(1, "d").format("YYYY-MM-DD@HH:MM:SS")
        )
        .filtered(
          "endDate == null OR endDate < " +
            moment().format("YYYY-MM-DD@HH:MM:SS")
        )
        .filtered("cancelled == false");
    if (filters.live) query = query.filtered("ended == false");
    if (filters.orderBy) query = query.sorted([[filters.orderBy, false]]);
    return query;
  }

  static get(realm, filters) {
    let query = realm.objects("Event");
    return this.filter(query, filters);
  }

  static getOne(realm, id) {
    const query = realm.objectForPrimaryKey("Event", new ObjectId(id));
    return query;
  }

  static async create(realm, data) {
    if (!data.name) throw new Error("Name not provided");
    realm.write(() => {
      const newEvent = new Event({ ...data });
      realm.create("Event", newEvent);
      console.log("success");
    });
  }

  static async update(realm, event, update) {
    console.log("update");
    console.log(update);
    realm.write(() => {
      if (
        (update.virtual != null || update.virtual != undefined) &&
        update.virtual != event.virtual
      )
        event.virtual = update.virtual;
      if (update.name && update.name != event.name) event.name = update.name;
      if (update.category && event.category != update.category)
        event.category = update.category;
      if (update.link && event.link != update.link) event.link = update.link;
      if (update.location && event.location != update.location)
        event.location = update.location;
      if (update.description && event.description != update.description)
        event.description = update.description;
      if (update.endDate && !_.isEqual(event.endDate, update.endDate))
        event.endDate = update.endDate;
      if (update.photoURL && event.photoURL != update.photoURL)
        event.photoURL = update.photoURL;
      if (update.startDate && !_.isEqual(event.startDate, update.startDate))
        event.startDate = update.startDate;
      if (update.tags && !_.isEqual(event.tags, update.tags))
        event.tags = update.tags;
    });
    console.log(event);
  }

  static remove(realm, event) {
    realm.write(() => {
      realm.delete(event);
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
