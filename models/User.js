import { firebase as storage } from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

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
    profile.id = snapshot.id;

    if (id === auth().currentUser?.uid) {
      snapshot = await ref.collection("private").doc("profile").get();
      Object.assign(profile, snapshot.data());
    }

    return profile;
  }

  static subscribe(uid, callback) {
    const sub = (snapshot) => {
      if (snapshot && snapshot.data()) {
        const profile = snapshot.data();
        profile.uid = uid;
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
    }

    return () => unsubs.forEach((fn) => fn());
  }

  static async query() {}

  static async create(email, password) {
    await auth().createUserWithEmailAndPassword(email, password);
  }

  static async saveEvent(eventID, status) {
    await firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("private")
      .doc("savedCollegeEvents")
      .update({
        ["saved." + eventID]: status,
      });
  }

  static async update(publicData, privateData) {
    const store = firestore();
    const ref = store.collection("users").doc(auth().currentUser.uid);
    store.runTransaction(async (t) => {
      if (publicData.image?.data) {
        await storage
          .storage()
          .ref(`user/profile/${auth().currentUser.uid}`)
          .putString(publicData.image.data, "base64");
        publicData.photoURL = await storage
          .storage()
          .ref(`user/profile/${auth().currentUser.uid}`)
          .getDownloadURL();
      }
      delete publicData.image;
      if (publicData.coverImage?.data) {
        await storage
          .storage()
          .ref(`user/cover/${auth().currentUser.uid}`)
          .putString(publicData.coverImage.data, "base64");
        publicData.coverPhotoURL = await storage
          .storage()
          .ref(`user/cover/${auth().currentUser.uid}`)
          .getDownloadURL();
      }
      delete publicData.coverImage;
      await t.update(ref.collection("public").doc("profile"), publicData);
      return t.update(ref.collection("private").doc("profile"), privateData);
    });
  }

  static async createNewProfile(displayName, image) {
    // handle new user image
    const photoURL = "";

    await this.update({ displayName }, { newUser: false });
    await auth().currentUser.updateProfile({
      displayName,
      photoURL,
    });
  }
}

UserModel.contextType = UserContext;
