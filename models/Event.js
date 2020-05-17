import { getLocation, validateLocation } from "../global/utils";

import { firebase as f } from "@react-native-firebase/storage";
import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { firebase as fire } from "@react-native-firebase/functions";
import { GeoFirestore, GeoTransaction } from "geofirestore";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

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
    if (filters.category)
      query = query.where("category", "==", filters.category);
    if (filters.active) query = query.where("ended", "==", false);
    if (filters.radius > 0)
      query = query.near({
        center: new firestore.GeoPoint(37.86835, -122.265),
        radius: filters.radius,
      });
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
      // upload image
      if (data.image) {
        const fileName = `${uuid()}`;
        await f
          .storage()
          .ref(`events/${data.category}/${fileName}`)
          .putFile(data.image);
        data.photoURL = await f
          .storage()
          .ref(`events/${data.category}/${fileName}`)
          .getDownloadURL();
        data.photoID = fileName;
        delete data.image;
      }
      const eventRef = store.collection("events").doc();
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
    await store.runTransaction(async (t) => {
      if (data.image) {
        if (data.photoURL) {
          await f.storage().refFromURL(data.photoURL).delete();
        }
        const fileName = `${uuid()}`;
        await f
          .storage()
          .ref(`events/${data.category}/${fileName}`)
          // .put(data.image, {
          //   customMetadata: { uid: data.host, eventID: event.id }
          // })
          // .on(f.storage.TaskEvent.STATE_CHANGED, async snapshot => {
          //   if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          //     const photoURL = await snapshot.ref.getDownloadURL();
          //     // await uploadPhoto({ eventID: event.id, photoURL: photoURL });
          //   }
          // });
          .put(data.image)
          .then();
        data.photoURL = snapshot.ref.getDownloadURL();
        data.photoID = fileName;
        delete data.image;
      }
      return geofirestore.collection("events").doc(eventID).update(data);
    });
  }
}

EventModel.contextType = UserContext;
