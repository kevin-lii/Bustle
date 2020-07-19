import _ from "lodash";
import Realm from "realm";

import EventModel from "../models/Event";
import UserModel from "../models/User";
import { attachIDs } from "../global/utils";
import { realmID } from "../global/secrets";

export const actionTypes = {
  LOGOUT: "logout",
  UPDATE_USER: "update user",
  UPDATE_EVENTS: "event update",
  FILTER_EVENTS: "filter events",
  UPDATE_HOSTED_EVENTS: "hosted event update",
  UPDATE_INTERESTED_EVENTS: "interested event update",
  REGISTER_APP: "register realm app",
  GET_EVENT: "get event",
};

const subscriptions = {};
let authUser = null;

export const registerApp = () => async (dispatch) => {
  const appConfig = {
    id: realmID,
    timeout: 10000,
    app: {
      name: "default",
      version: "0",
    },
  };
  const data = new Realm.App(appConfig);
  dispatch({
    type: actionTypes.REGISTER_APP,
    app: data,
  });
};

export const login = (email, password) => async (dispatch, getState) => {
  if (authUser != null) {
    console.warn("Already logged in -- can't log out!");
    return;
  }
  const { app } = getState();
  console.log(`Logging in as ${email}...`);
  const creds = Realm.Credentials.emailPassword(email, password);
  authUser = await app.logIn(creds);
  console.log(`Logged in as ${authUser.identity}`);

  const privateUserConfig = {
    schema: [UserModel.privateSchema],
    sync: {
      user: authUser,
      partitionValue: "Berkeley",
    },
  };
  const userConfig = {
    schema: [UserModel.schema],
    sync: {
      user: authUser,
      partionValue: "Berkeley",
    },
  };
  const eventConfig = {
    schema: [EventModel.schema],
    sync: {
      user: authUser,
      partionValue: "Berkeley",
    },
  };
  let privateUserRealm = await Realm.open(privateUserConfig);
  let userRealm = await Realm.open(userConfig);
  let eventRealm = await Realm.open(eventConfig);

  const query = UserModel.get(privateUserRealm, authUser.identity);
  dispatch({
    type: actionTypes.UPDATE_USER,
    user: query,
    userRealm,
    eventRealm,
  });
  query.addListener((obj) => {
    console.log(obj);
    dispatch({
      type: actionTypes.UPDATE_USER,
      user: obj,
    });
  });
  console.log(query);
};

export const logout = () => async (dispatch, getState) => {
  const { user } = getState();
  if (authUser == null) {
    console.warn("Not logged in -- can't log out!");
    return;
  }

  user.removeAllListeners();
  userRealm.removeAllListeners();
  eventRealm.removeAllListeners();

  console.log("Logging out...");
  authUser.logOut();
  authUser = null;
  dispatch({
    type: actionTypes.LOGOUT,
  });
};

export const getHostedEvents = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.hostedEvents) subscriptions.hostedEvents();
  const { user } = getState();
};

export const getSavedEvents = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.savedEvents) subscriptions.savedEvents();
  const { user } = getState();

  subscriptions.savedEvents = EventModel.subscribe(
    { interested: true, orderBy: "startDate", ...filters },
    (snapshot) => {
      dispatch({
        type: actionTypes.UPDATE_INTERESTED_EVENTS,
        savedEvents: attachIDs(snapshot),
      });
    }
  );
};

export const getEvent = (id) => (dispatch, getState) => {
  if (subscriptions.events) subscriptions.events();
  const { eventRealm } = getState();
  const query = EventModel.getOne(eventRealm, id);
  dispatch({
    type: actionTypes.GET_EVENT,
    event: query,
  });
};

export const setEventFilters = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.events) subscriptions.events();
  const { eventFilters } = getState();
  const query = EventModel.get(eventRealm, id, filters);
  dispatch({
    type: actionTypes.FILTER_EVENTS,
    events: query,
    filters: { ...eventFilters, ...filters },
  });
  query.addListener((collection) => {
    dispatch({
      type: actionTypes.FILTER_EVENTS,
      events: collection,
    });
  });
};

export const saveEvent = (event) => (dispatch, getState) => {
  const { savedEvents } = getState();
  const allEvents = [];
  let flag = true;
  const boundary = event.startDate.toDate();
  savedEvents?.forEach((e) => {
    if (e.startDate.toDate() > boundary && flag) {
      allEvents.push(event);
      flag = false;
    }
    allEvents.push(e);
  });
  if (flag) allEvents.push(event);
  dispatch({
    type: actionTypes.UPDATE_INTERESTED_EVENTS,
    savedEvents: allEvents,
  });
};

export const removeEvent = (eventID) => (dispatch, getState) => {
  const { savedEvents } = getState();
  const allEvents = [];
  savedEvents?.forEach((e) => {
    if (e.id !== eventID) allEvents.push(e);
  });
  dispatch({
    type: actionTypes.UPDATE_INTERESTED_EVENTS,
    savedEvents: allEvents,
  });
};
