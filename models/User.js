import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { GeoFirestore } from "geofirestore";

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

  static async create(data) {
    const store = firestoxre();
    data.photoURL =
      "https://www.pinclipart.com/picdir/big/8-82428_profile-clipart-generic-user-gender-neutral-head-icon.png";
    data.phone = "";
    data.directChats = [];
    data.events = [];
    data.groups = [];
    data.invitations = [];
    alert("hello");
    // await store.collection("users").add({ name: "kevin" });
    // alert("pushed");
    await store.collection("users");
    // .doc()
    // .set(data);
    alert("Finished");
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
}

UserData.contextType = UserContext;
