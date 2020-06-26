import functions from "@react-native-firebase/functions";

const endpoints = {
  VOTE_POST: "votePost",
  FLAG_POST: "flagPost",
  SAVE_EVENT: "saveEvent",
};

const getEndpoint = (fn) => functions().httpsCallable(fn);

exports.votePost = function (postID, vote, reply) {
  getEndpoint(endpoints.VOTE_POST)({ postID, vote, reply });
};

exports.flagPost = function (postID) {
  getEndpoint(endpoints.FLAG_POST)({ postID });
};

exports.saveEvent = function (eventID) {
  getEndpoint(endpoints.SAVE_EVENT)({ eventID, unSave: false });
};

exports.unsaveEvent = function (eventID) {
  getEndpoint(endpoints.SAVE_EVENT)({ eventID, unSave: true });
};
