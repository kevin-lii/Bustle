import React, { Component } from "react";
import { getLocation } from "../utils";

import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

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

    // .get()
    // .then(doc => {
    //   return doc.size();
    // })
    // .catch(error => {
    //   console.log("Error getting document:", error);
  }
}
//   async create(user) {
//     const store = firestore();

//     const data = this.data;
//     data.createdAt = Date.now();

//     //1. create chat
//     const chat = await store.collection("chats").add({ createdAt: new Date() });
//     data.chatID = chat.id;
//     console.log("chat created");

//     //2. upload image
//     if (data.image) {
//       const ref = storage().ref(data.type + "/" + data.host);
//       const image = await ref.putFile(data.image.path);
//       data.photoURL = image.fullPath;
//       delete data.image;
//     } else {
//       data.photoURL = "";
//     }

//     //3.upload event
//     const eventRef = await geofirestore.collection("events").add(data);
//     console.log("pushed");

//     //4.denormed update
//     events.push(eventRef.id);
//     await store
//       .collection("users")
//       .doc(this.userID)
//       .update({ events: events });
//   }
// }

UserData.contextType = UserContext;
