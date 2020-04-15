export default class Post {
  static async get(filters, func) {
    const store = firestore();
    const geofirestore = new GeoFirestore(store);
    let query = geofirestore.collection("posts");
    if (func) query.onSnapshot(func);
  }
}
