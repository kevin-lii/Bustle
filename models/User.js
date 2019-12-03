import React, { Component } from "react";
import { getLocation } from "../utils";

import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { GeoFirestore } from "geofirestore";

import { UserContext } from "../dataContainers/context";

export default class UserData {
  constructor(data) {
    if (!data.displayName) throw new Error("Name not provided");

    this.data = data;
    this.data.ended = false;
    this.data.invited = [userID];
  }

  static async get(userID) {}

  async create(user) {
    const store = firestore();
    const geofirestore = new GeoFirestore(store);

    const data = this.data;
    data.createdAt = Date.now();

    if (data.location) {
      const { lat, lng } = data.location.geometry.location;
      data.coordinates = new firestore.GeoPoint(lat, lng);
    } else {
      const loc = await getLocation();
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
      const ref = storage().ref(data.type + "/" + data.host);
      const image = await ref.putFile(data.image.path);
      data.photoURL = image.fullPath;
      delete data.image;
    } else {
      data.photoURL = "";
    }

    //3.upload event
    const eventRef = await geofirestore.collection("events").add(data);
    console.log("pushed");

    //4.denormed update
    events.push(eventRef.id);
    await store
      .collection("users")
      .doc(this.userID)
      .update({ events: events });
  }
}

UserData.contextType = UserContext;
