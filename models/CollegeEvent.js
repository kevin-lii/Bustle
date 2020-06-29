import { getLocation, validateLocation } from "../global/utils";
import auth from "@react-native-firebase/auth";
import { firebase as f } from "@react-native-firebase/storage";
import firestore, { firebase } from "@react-native-firebase/firestore";

import { UserContext } from "../dataContainers/context";
import moment from "moment";

import { joinEvent } from "../global/functions";
// import { getDefaultImage } from "../global/utils";

// Event Class:
// {
//     category

//     host: firebase doc id

//     name: string
//     description: string, optional
//     image: null, { path, width, height, data, cropRect } https://github.com/ivpusic/react-native-image-crop-picker#readme
//     open: boolean
//     private: boolean
//     virtual: boolean

//     date: date object, null
//     time: date object containing time, null
//     location: Google Place Details, null

//     active: boolean
//     invited: [uid]
//     coordinates
//     tags
//     link
//     photoURL
// }
const collection = "college_events";

export default class CollegeEventModel {
  constructor() {}

  static genQuery(filters) {
    let query = firestore().collection(collection);
    if (filters.containsID && filters.containsID.length)
      query = query.where(
        firestore.FieldPath.documentId(),
        "in",
        filters.containsID
      );
    if (filters.interested)
      query = query.where(
        "interested",
        "array-contains",
        auth().currentUser.uid
      );
    if (filters.host) query = query.where("host.uid", "==", filters.host);
    if (filters.categories?.length)
      query = query.where("category", "in", filters.categories);
    if (filters.tags?.length)
      query = query.where("tags", "array-contains-any", filters.tags);
    if (filters.active)
      query = query
        .where("startDate", ">=", moment().subtract(1, "d").toDate())
        .where("cancelled", "==", false);
    if (filters.live) query = query.where("ended", "==", false);
    if (filters.orderBy) query = query.orderBy(filters.orderBy, "desc");
    if (filters.startAfter) query = query.startAfter(filters.startAfter);
    if (filters.limit) query = query.limit(filters.limit);
    return query;
  }

  static async get(filters) {
    const query = this.genQuery(filters);
    return await query.get();
  }

  static subscribe(filters, onNext, onError = console.log) {
    const query = this.genQuery(filters);
    if (onNext) return query.onSnapshot(onNext, onError);
  }

  static subscribeOne(eventID, onNext, onError = console.log) {
    const query = firestore().collection(collection).doc(eventID);
    if (onNext) return query.onSnapshot(onNext, onError);
  }

  static async remove(event) {
    if (event.photoURL)
      await f.storage().ref(`${collection}/${event.id}`).delete();
    firestore()
      .collection(collection)
      .doc(event.id)
      .delete()
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  static async end(eventId) {
    await firestore()
      .collection(collection)
      .doc(eventId)
      .update({ endDate: new Date() });
  }

  static async cancel(eventId) {
    await firestore()
      .collection(collection)
      .doc(eventId)
      .update({ cancelled: true });
  }

  static join(eventId) {
    joinEvent(eventId);
  }

  static async create(user, data) {
    if (!data.name) throw new Error("Name not provided");
    const store = firestore();

    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();

    data.host = user;
    data.invited = {};
    data.cancelled = false;
    data.invited[user.uid] = true;

    await store.runTransaction(async (transaction) => {
      // upload image
      const eventRef = store.collection(collection).doc();

      if (data.image?.data) {
        const fileName = eventRef.id;
        await f
          .storage()
          .ref(`${collection}/${fileName}`)
          .putString(data.image.data, "base64");
        data.photoURL = await f
          .storage()
          .ref(`${collection}/${fileName}`)
          .getDownloadURL();
        data.photoID = fileName;
        delete data.image;
      }

      // upload event
      transaction.set(eventRef, data);

      // // denormed update on user
      return transaction.update(
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
    await store.runTransaction(async (transaction) => {
      if (data.image?.data) {
        await f
          .storage()
          .ref(`${collection}/${eventID}`)
          .putString(data.image.data, "base64");
        data.photoURL = await f
          .storage()
          .ref(`${collection}/${eventID}`)
          .getDownloadURL();
        delete data.image;
      }
      transaction.update(store.collection(collection).doc(eventID), data);
    });
  }
}

CollegeEventModel.contextType = UserContext;
