import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { votePost, deleteAnonPost } from "../global/functions";
import { getDefaultZone, attachIDs } from "../global/utils";
import UserModel from "./User";

// Post Class: {
//   text
//   author
//   createdAt
//   regionID
//   sectorID
//   replies
//   tags
//   flags
//   views
//   parent
// }

export default class Post {
  static genQuery(filters) {
    let query = firestore().collection("posts");
    if (filters.containsID)
      query = query.where(
        firestore.FieldPath.documentId(),
        "in",
        filters.containsID
      );
    if (filters.author) query = query.where("author.uid", "==", filters.author);
    if (filters.regionIDs && filters.regionIDs.length > 0)
      query = query.where("regionID", "in", filters.regionIDs);
    if (filters.tag) query = query.where("tags", "array-contains", filters.tag);
    if (filters.orderBy) query = query.orderBy(filters.orderBy, "desc");
    return query;
  }

  static async get(filters) {
    const query = this.genQuery(filters);
    return attachIDs(await query.get());
  }

  static subscribe(filters, next) {
    const query = this.genQuery(filters);
    if (next)
      return query.onSnapshot({
        next,
        error: (error) => console.log(error),
      });
  }

  static async create(author, data, parent = null) {
    // CHANGES HERE MUST BE REFLECTED IN POSTANONYMOUSLY FUNCTION
    if (!data.text) throw new Error("No text");
    data.author = author;
    data.createdAt = firestore.FieldValue.serverTimestamp();
    data.tags = data.tags || [];
    data.flags = 0;
    data.votes = 0;
    data.views = 0;
    data.replyCount = 0;
    data.zone = getDefaultZone();

    await firestore().collection("posts").add(data);
  }

  static async upvote(postID, reply = false) {
    await votePost(postID, true, reply);
  }

  static async downvote(postID, reply = false) {
    await votePost(postID, false, reply);
  }

  static subscribeReplies(postID, fn) {
    return firestore()
      .collection("posts")
      .doc(postID)
      .collection("replies")
      .orderBy("createdAt", "asc")
      .onSnapshot({
        next: (snapshot) => fn(snapshot.docs),
        error: console.log,
      });
  }

  static subscribePost(postID, fn) {
    return firestore()
      .collection("posts")
      .doc(postID)
      .onSnapshot({
        next: (doc) => fn(doc.data()),
        error: console.log,
      });
  }

  static async reply(postID, author, data) {
    if (!data.text) throw new Error("No text");
    data.author = author;
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    data.votes = 0;
    await firestore()
      .collection("posts")
      .doc(postID)
      .collection("replies")
      .add(data);
  }

  static async remove(postID, anon = false) {
    if (anon) {
      deleteAnonPost(postID);
    } else firestore().collection("posts").doc(postID).delete();
  }
}
