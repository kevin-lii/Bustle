import firestore, { firebase } from "@react-native-firebase/firestore";

import { votePost, postReply } from "../global/functions";
import { getDefaultZone } from "../global/utils";

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
    if (filters.containsID)
      query = query.where(
        firestore.FieldPath.documentId(),
        "in",
        filters.containsID
      );
    if (filters.author) query = query.where("author.uid", "==", filters.author);
    if (filters.regionIDs && filters.regionIDs.length > 0)
      query = query.where("regionID", "in", filters.regionIDs);
    if (filters.orderBy) query = query.orderBy(filters.orderBy);
    if (filters.startAfter) query = query.startAfter(filters.startAfter);
    if (filters.limit) query = query.limit(filters.limit);
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
    const store = firestore();
    await store.runTransaction(async (transaction) => {
      data.author = author;
      data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      data.votes = 0;
      const reply = store
        .collection("posts")
        .doc(postID)
        .collection("replies")
        .doc();
      transaction.set(reply, data);
      transaction.update(
        store
          .collection("users")
          .doc(user.uid)
          .collection("public")
          .doc("profile"),
        {
          replies: firestore.FieldValue.arrayUnion(reply.id),
        }
      );
    });
  }
}
