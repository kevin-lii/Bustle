import storage from "@react-native-firebase/storage";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { firebase as fire } from '@react-native-firebase/functions';
import auth from "@react-native-firebase/auth";

import { UserContext } from "../dataContainers/context";

export default class UserData {
  constructor(data) {
    if (!data.displayName) throw new Error("Name not provided");

    this.data = data;
  }

  static async get(userID) {
    const store = firestore();
    const query = store
      .collection("users")
      .doc(userID)
      .get();

    return query;
  }

  static async create(data, password) {
    auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then(async (cred) => {
        const emailAuth = fire.functions().httpsCallable("emailAuth");
        await emailAuth({ displayName: data.displayName }).then(result => {
          console.log(result);
        })
      })
    console.log("pushed");
  }

  static async update(userID, data) {
    const store = firestore();
    if (data.image) {
      const ref = storage().ref(data.type + "/" + data.host);
      const image = await ref.putFile(data.image.path);
      data.photoURL = image.fullPath;
      delete data.image;
    } else {
      data.photoURL = "";
    }
    await store
      .collection("users")
      .doc(userID)
      .update(data);
  }
  static async joinEvent(userID, eventID) {
    const joinEvent = fire.functions().httpsCallable("joinEvent");
    await firestore()
      .collection("users")
      .doc(userID)
      .update({ events: firebase.firestore.FieldValue.arrayUnion(eventID) });
    joinEvent({ uid: userID, eventID });
  }
  static async leaveEvent(userID, eventID) {
    const leaveEvent = fire.functions().httpsCallable("leaveEvent");
    await firestore()
      .collection("users")
      .doc(userID)
      .update({ events: firebase.firestore.FieldValue.arrayRemove(eventID) });
    leaveEvent({ uid: userID, eventID });
  }
}

UserData.contextType = UserContext;
