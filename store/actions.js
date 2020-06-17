import auth from "@react-native-firebase/auth";
import _ from "lodash";

import EventModel from "../models/CollegeEvent";
import PostModel from "../models/Post";
import UserModel from "../models/User";
import { attachIDs } from "../global/utils";

export const actionTypes = {
  LOGOUT: "logout",
  UPDATE_USER: "update user",
  UPDATE_EVENTS: "event update",
  FILTER_EVENTS: "filter events",
  UPDATE_POSTS: "post update",
  FILTER_POSTS: "filter posts",
  UPDATE_HOSTED_EVENTS: "hosted event update",
  UPDATE_INTERESTED_EVENTS: "interested event update",
};

const subscriptions = {};

export const login = () => (dispatch) => {
  auth().onAuthStateChanged(async (user) => {
    if (user) {
      subscriptions.user = UserModel.subscribe(user.uid, (data) =>
        dispatch({
          type: actionTypes.UPDATE_USER,
          user: data,
        })
      );
    } else {
      for (fn of Object.values(subscriptions)) fn();
      dispatch({
        type: actionTypes.LOGOUT,
      });
    }
  });
};

export const getHostedEvents = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.hostedEvents) subscriptions.hostedEvents();
  const { user } = getState();
  subscriptions.hostedEvents = EventModel.subscribe(
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
  if (subscriptions.events) subscriptions.events();
  subscriptions.events = EventModel.subscribe(filters, (snapshot) => {
    dispatch({
      type: actionTypes.UPDATE_EVENTS,
      events: attachIDs(snapshot),
    });
  });
};

export const getPosts = (filters = {}) => (dispatch) => {
  if (subscriptions.posts) subscriptions.posts();
  subscriptions.posts = PostModel.subscribe(filters, (snapshot) => {
    dispatch({
      type: actionTypes.UPDATE_POSTS,
      posts: attachIDs(snapshot),
    });
  });
};

export const setEventFilters = (filters = {}) => (dispatch) => {
  if (subscriptions.events) subscriptions.events();
  subscriptions.events = EventModel.subscribe(filters, (snapshot) => {
    dispatch({
      type: actionTypes.FILTER_EVENTS,
      events: attachIDs(snapshot),
      filters,
    });
  });
};

export const removePost = (postID) => (dispatch, getState) => {
  const { posts } = getState();
  const allPosts = [];
  posts.map((p) => (p.id === postID ? null : allPosts.push(p)));

  dispatch({
    type: actionTypes.UPDATE_POSTS,
    posts: allPosts,
  });
};
