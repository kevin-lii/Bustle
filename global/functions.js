import functions from "@react-native-firebase/functions";

const endpoints = {
  VOTE_POST: "votePost",
};

const getEndpoint = (fn) => functions().httpsCallable(fn);

exports.votePost = function (postID, vote) {
  getEndpoint(endpoints.VOTE_POST)({ postID, vote });
};
