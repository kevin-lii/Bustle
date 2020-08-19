import _ from "lodash";
import Realm from "realm";
import { ObjectId } from "bson";

import EventModel from "../models/Event";
import UserModel from "../models/User";
import { realmID } from "../global/secrets";

export const actionTypes = {
  LOGOUT: "logout",
  LOGIN: "login",
  UPDATE_USER: "update user",
  UPDATE_EVENTS: "event update",
  FILTER_EVENTS: "filter events",
  UPDATE_HOSTED_EVENTS: "hosted event update",
  UPDATE_INTERESTED_EVENTS: "interested event update",
  REGISTER_APP: "register realm app",
  REGISTER_APP_LOGIN: "register realm app and login",
  GET_USER: "get user",
  INITIALIZE_TOKEN: "set token",
};
const subscriptions = {};

const generateUser = (authUser) => {
  const userConfig = {
    schema: [EventModel.schema, UserModel.privateSchema],
    sync: {
      user: authUser,
      partitionValue: "Berkeley",
    },
  };
  const userRealm = new Realm(userConfig);
  // const realm = new Realm(config);
  const query = UserModel.get(userRealm, authUser.identity);
  return { userRealm, query };
};

export const registerApp = () => async (dispatch, getState) => {
  const { sessionID, sessionToken } = getState();
  const appConfig = {
    id: realmID,
    timeout: 10000,
    app: {
      name: "default",
      version: "1",
    },
  };
  const data = new Realm.App(appConfig);
  if (data?.currentUser()?.identity === sessionID && sessionToken != null) {
    await data.currentUser().logOut();
    let credentials;
    try {
      credentials = Realm.Credentials.userAPIKey(sessionToken[sessionID]);
    } catch {
      dispatch({
        type: actionTypes.REGISTER_APP,
        app: data,
      });
    }
    let userData;
    let authUser;
    let count = 0;
    while (!userData?.query && count < 5) {
      try {
        authUser = await data.logIn(credentials);
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
      userData = generateUser(authUser);
      if (!userData?.query) {
        userData.userRealm.close();
        count++;
      }
    }

    dispatch({
      type: actionTypes.REGISTER_APP_LOGIN,
      app: data,
      user: userData.query,
      userRealm: userData.userRealm,
      // realm,
      auth: data.currentUser(),
      sessionID,
    });
  } else {
    dispatch({
      type: actionTypes.REGISTER_APP,
      app: data,
    });
  }
};

export const realmDisable = () => (dispatch, getState) => {
  const { userRealm } = getState();
  userRealm.syncSession.pause();
};

export const login = (crendetials, handleError) => async (
  dispatch,
  getState
) => {
  const { app, auth, sessionToken } = getState();
  if (auth != null) {
    handleError({ message: "Already logged in -- can't log out!" });
    return;
  }
  let userData;
  let authUser;
  let count = 0;
  while (!userData?.query && count < 5) {
    try {
      authUser = await app.logIn(crendetials);
    } catch (e) {
      handleError(e);
      return;
    }
    userData = generateUser(authUser);
    if (!userData?.query) {
      userData.userRealm.close();
      // userData.realm.close();
      count++;
    }
  }
  if (!userData?.query) {
    handleError({ message: "Something went wrong. Please try again!" });
    return;
  }

  dispatch({
    type: actionTypes.LOGIN,
    user: userData.query,
    userRealm: userData.userRealm,
    // realm: userData.realm,
    auth: authUser,
    sessionID: authUser.identity,
  });
  if (sessionToken == null || !sessionToken[authUser.identity]) {
    const name = new ObjectId().toString();
    const key = await app.currentUser().auth.apiKeys.createAPIKey(name);
    const object = {};
    object[authUser.identity] = key.key;
    dispatch({
      type: actionTypes.INITIALIZE_TOKEN,
      sessionToken: { ...object, ...sessionToken },
    });
  }
};

export const logout = () => async (dispatch, getState) => {
  // const { userRealm, realm, auth } = getState();
  const { userRealm, auth, app } = getState();
  if (auth == null) {
    console.warn("Not logged in -- can't log out!");
    return;
  }

  Object.keys(subscriptions).forEach(function (key) {
    subscriptions[key].removeAllListeners();
    delete subscriptions[key];
  });
  userRealm.close();

  // realm.removeAllListeners();
  // realm.close();

  await auth.logOut();
  dispatch({
    type: actionTypes.LOGOUT,
  });
};

export const getHostedEvents = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.hostedEvents) {
    return;
  }
  const { user } = getState();
  const query = EventModel.filter(user.hostedEvents, filters);
  const hostedEvents = Array.from(query.values());

  dispatch({
    type: actionTypes.UPDATE_HOSTED_EVENTS,
    hostedEvents,
  });
  subscriptions.hostedEvents = query;
  query.addListener((collection, change) => {
    if (!_.values(change).every(_.isEmpty)) {
      const hostedEvents = Array.from(collection.values());
      dispatch({
        type: actionTypes.UPDATE_HOSTED_EVENTS,
        hostedEvents,
      });
    }
  });
};

export const getSavedEvents = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.savedEvents) {
    return;
  }
  const { user } = getState();
  const query = EventModel.filter(user.interestedEvents, filters);
  const savedEvents = Array.from(query.values());
  const saved = savedEvents.map((item) => item._id.toString());
  dispatch({
    type: actionTypes.UPDATE_INTERESTED_EVENTS,
    saved,
    savedEvents,
  });
  subscriptions.savedEvents = query;
  query.addListener((collection, change) => {
    if (!_.values(change).every(_.isEmpty)) {
      const savedEvents = Array.from(collection.values());
      const saved = savedEvents.map((item) => item._id.toString());
      dispatch({
        type: actionTypes.UPDATE_INTERESTED_EVENTS,
        saved,
        savedEvents,
      });
    }
  });
};

export const getUsers = (filters = {}) => (dispatch, getState) => {
  const { userRealm, usersFilters } = getState();
  const newFilters = { ...usersFilters, ...filters };
  const query = Array.from(UserModel.getUsers(userRealm, newFilters));
  dispatch({
    type: actionTypes.GET_USER,
    users: query,
    usersFilters: newFilters,
  });
};

export const setEventFilters = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.getEvents) {
    return;
  }
  const { eventFilters, userRealm } = getState();
  const query = EventModel.get(userRealm, { ...eventFilters, ...filters });
  dispatch({
    type: actionTypes.FILTER_EVENTS,
    events: Array.from(query.values()),
    filters: { ...eventFilters, ...filters },
  });
  subscriptions.getEvents = query;
  query.addListener((collection, change) => {
    if (!_.values(change).every(_.isEmpty)) {
      // const { events } = getState();
      const events = Array.from(collection.values());
      dispatch({
        type: actionTypes.UPDATE_EVENTS,
        events,
      });
    }
  });
};

export const saveEvent = (eventID) => (dispatch, getState) => {
  const { user, saved, userRealm } = getState();
  const event = EventModel.getOne(userRealm, eventID);
  userRealm.write(() => {
    user.interestedEvents.push(event);
  });
};

export const removeEvent = (eventID) => (dispatch, getState) => {
  const { user, saved, userRealm } = getState();
  const index = saved.indexOf(eventID.toString());
  if (index >= 0)
    userRealm.write(() => {
      user.interestedEvents.splice(index, 1);
    });
};
