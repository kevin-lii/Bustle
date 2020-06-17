import functions from "@react-native-firebase/functions";

const endpoints = {
  VOTE_POST: "votePost",
  FLAG_POST: "flagPost",
  ANON_POST: "postAnonymously",
  DELETE_ANON_POST: "removeAnonPost",
};

const getEndpoint = (fn) => functions().httpsCallable(fn);

exports.votePost = function (postID, vote, reply) {
  getEndpoint(endpoints.VOTE_POST)({ postID, vote, reply });
};

exports.flagPost = function (postID) {
  getEndpoint(endpoints.FLAG_POST)({ postID });
};

exports.postAnonymously = function (data) {
  getEndpoint(endpoints.ANON_POST)(data);
};

exports.deleteAnonPost = function (postID) {
  getEndpoint(endpoints.DELETE_ANON_POST)({ postID });
};
