import firestore, { firebase } from "@react-native-firebase/firestore";
import Geofirestore from "geofirestore";

import { votePost, postReply } from "../global/functions";
import { getDefaultZone } from "../global/utils";
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
  static async get(filters, next) {
    const store = firestore();
    let query = store.collection("posts");
    if (filters.regionIDs && filters.regionIDs.length > 0)
      query = query.where("regionID", "in", filters.regionIDs);
    if (next)
      query.onSnapshot({
        next,
        error: (error) => console.log(error),
      });
  }

  static async create(author, data, parent = null) {
    if (!data.text) throw new Error("No text");
    data.author = author;
    data.zone = getDefaultZone();
    data.createdAt = firestore.FieldValue.serverTimestamp();
    data.tags = data.tags || [];
    data.flags = 0;
    data.votes = 0;
    data.views = 0;
    data.replyCount = 0;

    await firestore().collection("posts").add(data);
  }

  static async upvote(postID, reply = false) {
    await votePost(postID, true, reply);
  }

  static async downvote(postID, reply = false) {
    await votePost(postID, false, reply);
  }

  static async subscribeReplies(postID, fn) {
    firestore()
      .collection("posts")
      .doc(postID)
      .collection("replies")
      .orderBy("createdAt", "asc")
      .onSnapshot({
        next: (snapshot) => fn(snapshot.docs),
        error: console.log,
      });
  }

  static async reply(postID, author, data) {
    if (!data.text) throw new Error("No text");
    data.author = author;
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    data.votes = 0;
    firestore().collection("posts").doc(postID).collection("replies").add(data);
  }
}
