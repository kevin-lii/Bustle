import { ObjectId } from "bson";
import moment from "moment";
import _ from "lodash";
import S3 from "aws-sdk/clients/s3";
import { decode } from "base64-arraybuffer";
import * as RNFS from "react-native-fs";

export default class Event {
  constructor({
    id = new ObjectId(),
    name,
    partition = "Berkeley",
    regionID = "Berkeley",
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
    this.ended = false;
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
    this.regionID = regionID;
  }

  static schema = {
    name: "Event",
    properties: {
      _id: "objectId",
      _partition: "string",
      name: "string",
      cancelled: "bool",
      ended: "bool",
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
      regionID: "string?",
    },
    primaryKey: "_id",
  };

  static filter(query, filters) {
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
      query = query.filtered(filter);
    }
    if (filters.active) {
      query = query
        .filtered(
          "ended == false AND startDate >= " +
            moment().subtract(1, "d").format("YYYY-MM-DD@HH:MM:SS")
        )
        .filtered("cancelled == false");
      console.log(query);
    }
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
    realm.write(async () => {
      const id = new ObjectId();
      if (data.image?.data) {
        const s3bucket = new S3({
          accessKeyId: "AKIART42PSEQKVT24D62",
          secretAccessKey: "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",
          Bucket: "bustle-images",
          signatureVersion: "v4",
        });
        let contentDeposition = `inline;filename="${id.toString()}"`;
        const base64 = await RNFS.readFile(data.image.uri, "base64");
        const arrayBuffer = decode(base64);
        s3bucket.createBucket(() => {
          const params = {
            Bucket: "bustle-images",
            Key: `events/${id.toString()}`,
            Body: arrayBuffer,
            ContentDisposition: contentDeposition,
            ContentType: "image/jpeg",
          };
          s3bucket.upload(params, (err, newData) => {
            if (err) {
              console.log("error in callback");
            }
            console.log("success");
            console.log("Response URL : " + newData.Location);
            data.photoURL = newData.Location;
          });
        });
        delete data.image;
      }
      const newEvent = new Event({ id, ...data });
      realm.create("Event", newEvent);
    });
  }

  static async update(realm, event, update) {
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
    if (update.image?.data) {
      const s3bucket = new S3({
        accessKeyId: "AKIART42PSEQKVT24D62",
        secretAccessKey: "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",
        Bucket: "bustle-images",
        signatureVersion: "v4",
      });
      let contentDeposition = `inline;filename="${event._id.toString()}"`;
      const base64 = await RNFS.readFile(update.image.uri, "base64");
      const arrayBuffer = decode(base64);
      await s3bucket.createBucket(() => {
        const params = {
          Bucket: "bustle-images",
          Key: `events/${event._id.toString()}`,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: "image/jpeg",
        };
        s3bucket.upload(params, (err, data) => {
          if (err) {
            console.log("error in callback");
          }
          realm.write(() => {
            event.photoURL = data.Location + `?time=${new Date()}`;
          });
        });
      });
    }
  }

  static remove(realm, event) {
    realm.write(() => {
      realm.delete(event);
    });
  }

  static end(realm, event) {
    realm.write(() => {
      event.endDate = new Date();
      event.ended = true;
    });
  }

  static cancel(realm, event) {
    realm.write(() => {
      event.cancelled = true;
    });
  }
}
