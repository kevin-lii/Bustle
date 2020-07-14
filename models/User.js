import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";

import { saveEvent, unsaveEvent } from "../global/functions";
import { UserContext } from "../dataContainers/context";

export default class UserModel {
  constructor(data) {
    if (!data.displayName) throw new Error("Name not provided");
    Object.assign(this, data);
  }

  static async get(id) {
    const store = firestore();
    const ref = store.collection("users").doc(id);
    let snapshot = await ref.collection("public").doc("profile").get();
    const profile = snapshot.data();
    profile.uid = id;

    if (id === auth().currentUser?.uid) {
      snapshot = await ref.collection("private").doc("profile").get();
      Object.assign(profile, snapshot.data());
    }

    return profile;
  }

  static subscribe(uid, callback) {
    const sub = (snapshot, type) => {
      if (snapshot && snapshot.data()) {
        const profile = snapshot.data();
        profile.uid = uid;
        if (type === "forums") profile.posts = new Set(profile.posts);

        callback(profile);
      }
      callback({});
    };

    const store = firestore();
    const ref = store.collection("users").doc(uid);
    const unsubs = [];
    unsubs.push(
      ref.collection("public").doc("profile").onSnapshot(sub, console.log)
    );

    if (uid === auth().currentUser?.uid) {
      const userRef = ref.collection("private");
      unsubs.push(userRef.doc("profile").onSnapshot(sub, console.log));
      unsubs.push(userRef.doc("votes").onSnapshot(sub, console.log));
      unsubs.push(
        userRef.doc("savedCollegeEvents").onSnapshot(sub, console.log)
      );
      unsubs.push(
        userRef.doc("forums").onSnapshot((s) => sub(s, "forums"), console.log)
      );
    }

    return () => unsubs.forEach((fn) => fn());
  }

  static async query() {}

  static async create(email, password) {
    await auth().createUserWithEmailAndPassword(email, password);
  }

  static async saveEvent(eventID, status) {
    if (status) saveEvent(eventID);
    else unsaveEvent(eventID);
  }

  static async update(publicData, privateData) {
    const uid = auth().currentUser.uid;
    const ref = firestore().collection("users").doc(uid);
    const imgRef = storage().ref(`user/profile/${uid}`);
    const coverImgRef = storage().ref(`user/cover/${auth().currentUser.uid}`);

    firestore().runTransaction(async (t) => {
      if (publicData.image?.data) {
        await imgRef.putString(publicData.image.data, "base64");
        publicData.photoURL = await imgRef.getDownloadURL();
        delete publicData.image;
      }
      delete publicData.image;
      if (publicData.coverImage?.data) {
        await coverImgRef.putString(publicData.coverImage.data, "base64");
        publicData.coverPhotoURL = await coverImgRef.getDownloadURL();
      }
      delete publicData.coverImage;

      await t
        .update(ref.collection("public").doc("profile"), publicData)
        .update(ref.collection("private").doc("profile"), privateData);
    });
  }

  static async createNewProfile(data) {
    await this.update(data, { newUser: false });
    await auth().currentUser.updateProfile({
      displayName: data.displayName,
    });
  }
}

UserModel.contextType = UserContext;
