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

    if (filters.host) query = query.where("host.uid", "==", filters.host);
    if (filters.categories?.length)
      query = query.where("category", "in", filters.categories);
    if (filters.live) query = query.where("ended", "==", false);
    if (filters.orderBy) query = query.where("ended", "==", false);
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

  static async getCollection() {
    return firestore().collection(collection);
  }

  static async remove(event) {
    await firestore()
      .collection(collection)
      .doc(event.id)
      .delete()
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    if (event.photoURL) await f.storage().refFromURL(event.photoURL).delete();
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
    await store.runTransaction(async (t) => {
      if (data.image) {
        if (data.photoURL) {
          await f.storage().refFromURL(data.photoURL).delete();
        }
        const fileName = `${uuid()}`;
        await f
          .storage()
          .ref(`${collection}/${fileName}`)
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
      return store.collection(collection).doc(eventID).update(data);
    });
  }
}

CollegeEventModel.contextType = UserContext;
