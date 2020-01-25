import storage from "@react-native-firebase/storage";
import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { UserContext } from "../dataContainers/context";
import { useContext } from "react";

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
    const store = firestore();
    data.photoURL = "";
    data.phone = "";
    data.directChats = [];
    data.events = [];
    data.groups = [];
    data.invitations = [];
    auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then(cred => {
        return store
          .collection("users")
          .doc(cred.user.uid)
          .set(data);
      });
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
    await firestore()
      .collection("users")
      .doc(userID)
      .update({ events: firebase.firestore.FieldValue.arrayUnion(eventID) });
    // await firestore()
    //   .collection("events")
    //   .doc(eventID)
    //   .update({ invited: firebase.firestore.FieldValue.arrayUnion(userID) });
  }
  static async leaveEvent(userID, eventID) {
    await firestore()
      .collection("users")
      .doc(userID)
      .update({ events: firebase.firestore.FieldValue.arrayRemove(eventID) });
  }
}

UserData.contextType = UserContext;
