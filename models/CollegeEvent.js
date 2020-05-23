import { getLocation, validateLocation } from "../global/utils";

import { firebase as f } from "@react-native-firebase/storage";
import firestore, { firebase } from "@react-native-firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import { UserContext } from "../dataContainers/context";
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
    if (filters.containsID)
      query = query.where(
        firestore.FieldPath.documentId(),
        "in",
        filters.containsID
      );
    if (filters.host) query = query.where("host.uid", "==", filters.host);
    if (filters.categories?.length)
      query = query.where("category", "in", filters.categories);
    if (filters.live) query = query.where("ended", "==", false);
    if (filters.orderBy) query = query.orderBy(filters.orderBy, "desc");
    if (filters.startAfter) query = query.startAfter(filters.startAfter);
    if (filters.limit) query = query.limit(filters.limit);
    return query;
  }

  static get(filters) {
    const query = this.genQuery(filters);
    return query.get();
  }

  static async subscribe(filters, onNext, onError = console.log) {
    const query = this.genQuery(filters);
    if (onNext) query.onSnapshot(onNext, onError);
  }

  static async remove(event) {
    await firestore().runTransaction(async (transaction) => {
      firestore()
        .collection(collection)
        .doc(event.id)
        .delete()
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
      // transaction.update(
      //   firestore()
      //     .collection("users")
      //     .doc(this..uid)
      //     .collection("private")
      //     .doc("profile"),
      //   {
      //     events: firestore.FieldValue.arrayRemove(event.id),
      //   }
      // );
      if (event.photoURL)
        await f.storage().ref(`${collection}/${event.id}`).delete();
    });
  }

  static async create(user, data) {
    if (!data.name) throw new Error("Name not provided");
    const store = firestore();

    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();

    data.host = user;
    data.invited = {};
    data.invited[user.uid] = true;

    await store.runTransaction(async (transaction) => {
      // upload image
      const eventRef = store.collection(collection).doc();

      if (data.image) {
        const fileName = eventRef.id;
        await f.storage().ref(`${collection}/${fileName}`).putFile(data.image);
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

CollegeEventModel.contextType = UserContext;
