import firestore from "@react-native-firebase/firestore";

import { votePost } from "../global/functions";
import UserModel from "./User";

// Post Class: {
//   text
//   author
//   createdAt
//   regionID
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
    if (next)
      query.onSnapshot({
        next,
        error: (error) => console.log(error),
      });
  }

  static async create(author, data, parent = null) {
    if (!data.text) throw new Error("No text");
    data.author = author;
    data.createdAt = firestore.FieldValue.serverTimestamp();
    data.tags = data.tags || [];
    data.flags = 0;
    data.votes = 0;
    data.views = 0;

    await firestore().collection("posts").add(data);
  }

  static async upvote(postID) {
    await votePost(postID, true);
  }

  static async downvote(postID) {
    await votePost(postID, false);
  }

  static async reply(postID, data) {
    if (!data.text) throw new Error("No text");
    await firestore()
      .collection("posts")
      .doc(postID)
      .collection("replies")
      .add(data);
  }
}
