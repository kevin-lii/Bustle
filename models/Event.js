import { getLocation, validateLocation } from "../global/utils";

import { firebase as f } from "@react-native-firebase/storage";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { firebase as fire } from "@react-native-firebase/functions";
import { GeoFirestore, GeoTransaction } from "geofirestore";

import { UserContext } from "../dataContainers/context";
// import { getDefaultImage } from "../global/utils";

// Event Class:
// {
//     category: one of ['Social', 'Dining', 'Drinks', 'Athletic', 'Learn', 'Business', 'Spiritual', 'Service']

//     host: firebase doc id

//     name: string
//     description: string, optional
//     image: null, { path, width, height, data, cropRect } https://github.com/ivpusic/react-native-image-crop-picker#readme
//     open: boolean
//     private: boolean

//     date: date object, null
//     time: date object containing time, null
//     location: Google Place Details, null

//     active: boolean
// invited: [uid]
// coordinates
// photoURL
// }

export default class EventModel {
  constructor() {}

  static async get(filters, onNext) {
    const store = firestore();
    const geofirestore = new GeoFirestore(store);
    let query = geofirestore.collection("events");

    if (filters.host) query = query.where("host.uid", "==", filters.host);
    if (filters.categories?.length)
      query = query.where("category", "in", filters.categories);
    if (filters.active) query = query.where("ended", "==", false);
    if (filters.radius > 0)
      query = query.near({
        center: new firestore.GeoPoint(37.86835, -122.265),
        radius: filters.radius,
      });
    if (filters.orderBy)
      query = query.orderBy(
        filters.orderBy,
        filters.orderByDir ? filters.orderByDir : "asc"
      );
    if (filters.limit) query = query.limit(filters.limit);
    if (onNext) query.onSnapshot(onNext, console.log);
  }

  static async getCollection() {
    return firestore().collection("events");
  }

  static async remove(event) {
    const deleteEvent = fire.functions().httpsCallable("deleteEvent");
    await firestore()
      .collection("events")
      .doc(event.id)
      .delete()
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    if (event.photoURL) await f.storage().refFromURL(event.photoURL).delete();
    for (let count; count < event.invited; count++) {
      const userID = event.invited[count];
      await deleteEvent({ uid: userID, eventID: event.id });
    }
  }

  static async create(user, data) {
    if (!data.name) throw new Error("Name not provided");
    const store = firestore();
    const geofirestore = new GeoFirestore(store);

    const now = firebase.firestore.FieldValue.serverTimestamp();
    data.createdAt = now;
    data.date = data.date || now;
    data.time = data.time || now;

    data.host = user;
    data.ended = false;
    data.invited = {};
    data.invited[user.uid] = true;

    const loc = await getLocation();
    if (data.location) {
      const { lat, lng } = data.location.geometry.location;
      // validateLocation(loc, lat, lng);
      data.coordinates = new firestore.GeoPoint(lat, lng);
    } else {
      data.coordinates = new firestore.GeoPoint(
        loc.coords.latitude,
        loc.coords.longitude
      );
    }

    await geofirestore.runTransaction(async (t) => {
      const transaction = new GeoTransaction(t);
      const eventRef = store.collection("events").doc();
      // upload image
      if (data.image) {
        await f
          .storage()
          .ref(`events/${data.category}/${eventRef}`)
          .putFile(data.image);
        data.photoURL = await f
          .storage()
          .ref(`events/${data.category}/${eventRef}`)
          .getDownloadURL();
        data.photoID = eventRef;
        delete data.image;
      }
      // upload event
      transaction.set(eventRef, data);

      // // denormed update on user
      return transaction.native.update(
        store
          .collection("users")
          .doc(user.uid)
          .collection("private")
          .doc("profile"),
        {
          events: firestore.FieldValue.arrayUnion(eventRef.id),
        }
      );
    });
  }

  static async update(eventID, data) {
    if (!data.name) throw new Error("Name not provided");
    if (data.location) {
      const loc = await getLocation();
      const { lat, lng } = data.location.geometry.location;
      validateLocation(loc, lat, lng);
    }
    const store = firestore();
    const geofirestore = new GeoFirestore(store);

    await geofirestore.runTransaction(async (t) => {
      const transaction = new GeoTransaction(t);
      if (data.image) {
        if (data.photoURL) {
          await f.storage().refFromURL(data.photoURL).delete();
        }
        await f
          .storage()
          .ref(`events/${data.category}/${eventID}`)
          .putFile(data.image);
        data.photoURL = await f
          .storage()
          .ref(`events/${data.category}/${eventID}`)
          .getDownloadURL();
        delete data.image;
      }
      transaction.update(store.collection(collection).doc(eventID), data);
    });
  }
}

EventModel.contextType = UserContext;
