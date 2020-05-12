import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import EventModel from "../models/Event";
import PostModel from "../models/Post";
import UserModel from "../models/User";

export const actionTypes = {
  LOGOUT: "logout",
  UPDATE_USER: "update user",
  UPDATE_EVENTS: "event update",
  FILTER_EVENTS: "filter events",
  UPDATE_POSTS: "post update",
  UPDATE_HOSTED_EVENTS: "hosted event update",
};

const subscriptions = [];

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

export const getHostedEvents = () => (dispatch, getState) => {
  const { user } = getState();
  EventModel.get({ host: user.uid }, (snapshot) => {
    const hostedEvents = [];
    snapshot.forEach((doc) => {
      hostedEvents.push({ ...doc.data(), id: doc.id });
    });
    dispatch({
      type: actionTypes.UPDATE_HOSTED_EVENTS,
      hostedEvents,
    });
  });
};

export const getEvents = (filters = {}) => (dispatch) => {
  EventModel.get(filters, (snapshot) => {
    dispatch({
      type: actionTypes.UPDATE_EVENTS,
      events: snapshot.docs,
    });
  });
};

export const getPosts = (filters = {}) => (dispatch) => {
  PostModel.get(filters, (snapshot) => {
    dispatch({
      type: actionTypes.UPDATE_POSTS,
      posts: snapshot.docs,
    });
  });
};
export const setEventFilters = (filters = {}) => (dispatch) => {
  EventModel.get(filters, (snapshot) => {
    dispatch({
      type: actionTypes.FILTER_EVENTS,
      events: snapshot.docs,
      filters,
    });
  });
};
