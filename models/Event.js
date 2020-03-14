import { getLocation } from "../utils";

import { firebase as f } from "@react-native-firebase/storage";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { firebase as fire } from '@react-native-firebase/functions';
import { GeoFirestore } from "geofirestore";
import uuid from 'uuid/v4';

import { UserContext } from "../dataContainers/context";

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

export default class EventData {
  constructor() { }

  static async get(filters, func) {
    const store = firestore();
    const geofirestore = new GeoFirestore(store);
    // const query = store.collection('events').orderBy('g').startAt(5)
    let query = geofirestore.collection("events");
    if (filters.active) query = query.where("ended", "==", false);
    if (filters.host) query = query.where("host", "==", filters.host);
    if (func) query.onSnapshot(func);
  }

  static async getCollection() {
    return firestore().collection("events");
  }


  static async remove(event) {
    // const deletePhoto = fire.functions().httpsCallable("deletePhoto");
    const deleteEvent = fire.functions().httpsCallable("deleteEvent");
    await firestore()
      .collection("events")
      .doc(event.id)
      .delete().catch(function (error) {
        console.error("Error removing document: ", error);
      });
    await firestore()
      .collection("chats")
      .doc(event.chatID)
      .delete();
    if (event.photoURL)
      await f.storage().refFromURL(event.photoURL).delete();
    await deletePhoto({ eventID: event.id, photoURL: event.photoURL });
    for (let count; count < event.invited; count++) {
      const userID = event.invited[count];
      await deleteEvent({ uid: userID, eventID: event.id });
    }
  }

  static async create(userID, data, events) {
    // const uploadPhoto = fire.functions().httpsCallable("uploadPhoto");
    if (!data.name) throw new Error("Name not provided");
    const store = firestore();
    const geofirestore = new GeoFirestore(store);

    const now = new Date();
    data.createdAt = now;
    data.date = data.date || now;
    data.time = data.time || now;

    data.host = userID;
    data.ended = false;
    data.invited = [userID];

    const loc = await getLocation();
    if (data.location) {
      const { lat, lng } = data.location.geometry.location;
      const distanceAway = Math.sqrt(Math.pow(69.1 * (lat - loc.coords.latitude), 2) +
        Math.pow(69.1 * (loc.coords.longitude - lng) * Math.cos(lat / 57.3), 2));
      if (distanceAway > 50) {
        throw new Error("Location is out of range. Please select a location that is within 50 miles")
      } else {
        data.coordinates = new firestore.GeoPoint(lat, lng);
      }
    } else {
      data.coordinates = new firestore.GeoPoint(
        loc.coords.latitude,
        loc.coords.longitude
      );
    }

    //1. create chat
    const chat = await store.collection("chats").add({ createdAt: new Date() });
    data.chatID = chat.id;
    console.log("chat created");

    //2. upload image
    if (data.image) {
      const fileName = `${uuid()}`;
      console.log(fileName);
      await f.storage()
        .ref(`events/${data.category}/${fileName}`)
        .put(data.image, { customMetadata: { 'uid': userID, 'eventID': event.id } })
        .on(
          f.storage.TaskEvent.STATE_CHANGED,
          async snapshot => {
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              const photoURL = await snapshot.ref.getDownloadURL();
              // await uploadPhoto({ eventID: event.id, photoURL: photoURL });
            }
          },
          error => {
            unsubscribe();
            alert('Sorry, Try again.');
          }
        );
    }
    data.photoURL = data.image;
    delete data.image;
    //3.upload event
    const eventRef = await geofirestore.collection("events").add(data);
    console.log("pushed");

    //4.denormed update
    events.push(eventRef.id);
    await store
      .collection("users")
      .doc(userID)
      .update({ events: events });

  }
  static async update(eventID, data) {
    // const deletePhoto = fire.functions().httpsCallable("deletePhoto");
    // const uploadPhoto = fire.functions().httpsCallable("uploadPhoto");
    if (!data.name) throw new Error("Name not provided");
    if (data.location) {
      const loc = await getLocation();
      const { lat, lng } = data.location.geometry.location;
      const distanceAway = Math.sqrt(Math.pow(69.1 * (lat - loc.coords.latitude), 2) +
        Math.pow(69.1 * (loc.coords.longitude - lng) * Math.cos(lat / 57.3), 2));
      if (distanceAway > 50) {
        throw new Error("Location is out of range. Please select a location that is within 50 miles")
      }
    }
    const store = firestore();
    const geofirestore = new GeoFirestore(store);
    if (data.image) {
      if (data.photoURL)
        await f.storage().refFromURL(event.photoURL).delete();
      //   await deletePhoto({ eventID: event.id, photoURL: event.photoURL });
      const fileName = `${uuid()}`;
      await f.storage()
        .ref(`events/${data.category}/${fileName}`)
        .put(data.image, { customMetadata: { 'uid': data.host, 'eventID': event.id } })
        .on(
          f.storage.TaskEvent.STATE_CHANGED,
          async snapshot => {
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              const photoURL = await snapshot.ref.getDownloadURL();
              // await uploadPhoto({ eventID: event.id, photoURL: photoURL });
            }
          }
        );
    }
    data.photoURL = data.image;
    delete data.image;
    await geofirestore.collection("events").doc(eventID).update(data);
  }
}

EventData.contextType = UserContext;
