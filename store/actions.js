import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import _ from "lodash";
import EventModel from "../models/CollegeEvent";
import PostModel from "../models/Post";
import UserModel from "../models/User";

export const actionTypes = {
  LOGOUT: "logout",
  UPDATE_USER: "update user",
  UPDATE_EVENTS: "event update",
  FILTER_EVENTS: "filter events",
  UPDATE_POSTS: "post update",
  UPDATE_HOSTED_EVENTS: "hosted event update",
  UPDATE_INTERESTED_EVENTS: "interested event update",
};

const subscriptions = [];

const attachIDs = (snapshot) => {
  const docs = [];
  snapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
};

export const login = () => (dispatch) => {
  auth().onAuthStateChanged(async (user) => {
    if (user) {
      const unsub = UserModel.subscribe(user.uid, (data) =>
        dispatch({
          type: actionTypes.UPDATE_USER,
          user: data,
        })
      );
      subscriptions.push(unsub);
    } else {
      subscriptions.forEach((fn) => fn());
      dispatch({
        type: actionTypes.LOGOUT,
      });
    }
  });
};

export const getHostedEvents = (filters = {}) => (dispatch, getState) => {
  const { user } = getState();
  EventModel.subscribe(
    { host: filters.host ? filters.host : user.uid, orderBy: "startDate" },
    (snapshot) => {
      dispatch({
        type: actionTypes.UPDATE_HOSTED_EVENTS,
        hostedEvents: attachIDs(snapshot),
      });
    }
  );
};

export const getEvents = (filters = {}) => (dispatch) => {
  EventModel.subscribe(filters, (snapshot) => {
    dispatch({
      type: actionTypes.UPDATE_EVENTS,
      events: attachIDs(snapshot),
    });
  });
};

export const getPosts = (filters = {}) => (dispatch) => {
  PostModel.get(filters, (snapshot) => {
    dispatch({
      type: actionTypes.UPDATE_POSTS,
      posts: attachIDs(snapshot),
    });
  });
};
export const setEventFilters = (filters = {}) => (dispatch) => {
  EventModel.subscribe(filters, (snapshot) => {
    dispatch({
      type: actionTypes.FILTER_EVENTS,
      events: attachIDs(snapshot),
      filters,
    });
  });
};
