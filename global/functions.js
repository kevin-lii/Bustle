import functions from "@react-native-firebase/functions";

const endpoints = {
  VOTE_POST: "votePost",
  FLAG_POST: "flagPost",
  SAVE_EVENT: "saveEvent",
  JOIN_EVENT: "joinEvent",
};

const getEndpoint = (fn) => functions().httpsCallable(fn);

export const votePost = function (postID, vote, reply) {
  getEndpoint(endpoints.VOTE_POST)({ postID, vote, reply });
};

export const flagPost = function (postID) {
  getEndpoint(endpoints.FLAG_POST)({ postID });
};

export const saveEvent = function (eventID) {
  getEndpoint(endpoints.SAVE_EVENT)({ eventID, unSave: false });
};

export const unsaveEvent = function (eventID) {
  getEndpoint(endpoints.SAVE_EVENT)({ eventID, unSave: true });
};

export const joinEvent = function (eventID) {
  getEndpoint(endpoints.JOIN_EVENT)({ eventID });
};
