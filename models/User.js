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
  }
}

UserData.contextType = UserContext;
