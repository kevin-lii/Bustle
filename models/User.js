import storage from "@react-native-firebase/storage";
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
    let unsubscribe = ref
      .collection("public")
      .doc("profile")
      .onSnapshot(sub, console.log);

    if (uid === auth().currentUser?.uid) {
      let unsub = ref
        .collection("private")
        .doc("profile")
        .onSnapshot(sub, console.log);
      const unsub2 = unsubscribe;
      unsubscribe = () => {
        unsub2();
        unsub();
      };
    }

    return unsubscribe;
  }

  static async query() {}

  static async create(email, password) {
    await auth().createUserWithEmailAndPassword(email, password);
  }

  static async update(publicData, privateData) {
    const store = firestore();
    if (publicData.image) {
      const ref = storage().ref(data.type + "/" + data.host);
      const image = await ref.putFile(data.image.path);
      publicData.photoURL = image.fullPath;
      delete publicData.image;
    }

    const ref = store.collection("users").doc(auth().currentUser.uid);
    store.runTransaction(async (t) => {
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
