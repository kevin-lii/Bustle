import _ from "lodash";
import Realm from "realm";

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
  const config = {
    schema: [EventModel.schema, UserModel.schema],
    path: "userConfig.realm",
    sync: {
      user: authUser,
      partitionValue: "Berkeley",
    },
    mayWrite: false,
    mayRead: true,
  };
  const userRealm = new Realm(userConfig);
  const realm = new Realm(config);
  const query = UserModel.get(userRealm, authUser.id);
  return { realm, userRealm, query };
};

export const registerApp = () => async (dispatch, getState) => {
  // const { sessionKey, sessionID } = getState();
  const { sessionID } = getState();
  const appConfig = {
    id: realmID,
    timeout: 10000,
    app: {
      name: "default",
      version: "1",
    },
  };
  const data = new Realm.App(appConfig);
  if (data?.currentUser?.id === sessionID) {
    const { query, userRealm, realm } = generateUser(data.currentUser);
    dispatch({
      type: actionTypes.REGISTER_APP_LOGIN,
      app: data,
    });
    dispatch({
      type: actionTypes.LOGIN,
      user: query,
      userRealm,
      realm,
      auth: data.currentUser,
      // sessionKey,
      sessionID,
    });
    query.addListener((obj, change) => {
      if (!_.values(change).every(_.isEmpty)) {
        dispatch({
          type: actionTypes.UPDATE_USER,
          user: Object.assign(obj, query),
        });
      }
    });
  } else {
    dispatch({
      type: actionTypes.REGISTER_APP,
      app: data,
    });
  }
};

export const login = (crendetials) => async (dispatch, getState) => {
  const { app, auth } = getState();
  if (auth != null) {
    console.warn("Already logged in -- can't log out!");
    return;
  }

  // const newName = new ObjectId();
  // const apiKey = await authUser.apiKeys.create(newName.toString());
  // const apiCredentials = Realm.Credentials.userApiKey(apiKey.key);
  // const temp = await app.logIn(apiCredentials);
  let userData;
  let authUser;
  let count = 0;
  while (!userData?.query && count < 5) {
    authUser = await app.logIn(crendetials);
    userData = generateUser(authUser);
    if (!userData?.query) {
      userData.userRealm.close();
      userData.realm.close();
      count++;
    }
  }
  if (!userData?.query) return;

  dispatch({
    type: actionTypes.LOGIN,
    user: userData.query,
    userRealm: userData.userRealm,
    realm: userData.realm,
    auth: authUser,
    sessionID: authUser.id,
    // sessionKey: apiKey.key,
    // sessionID: apiKey.id.toString(),
  });

  userData.query.addListener((obj, change) => {
    if (!_.values(change).every(_.isEmpty)) {
      dispatch({
        type: actionTypes.UPDATE_USER,
        user: Object.assign(obj, userData.query),
      });
    }
  });
};

export const logout = () => async (dispatch, getState) => {
  const { sessionID, userRealm, realm, auth, app } = getState();
  if (auth == null) {
    console.warn("Not logged in -- can't log out!");
    return;
  }
  userRealm.removeAllListeners();
  userRealm.close();

  realm.removeAllListeners();
  realm.close();

  console.log("Logging out...");
  // await app.removeUser(app.currentUser, true);
  await auth.logOut();
  // const temp = await app.currentUser.apiKeys.delete(new ObjectId(sessionID));

  dispatch({
    type: actionTypes.LOGOUT,
  });
};

export const getHostedEvents = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.hostedEvents) {
    subscriptions.hostedEvents();
    return;
  }
  const { user } = getState();
  const query = EventModel.filter(user.hostedEvents, filters);
  const hostedEvents = Array.from(query.values());

  dispatch({
    type: actionTypes.UPDATE_HOSTED_EVENTS,
    hostedEvents,
  });
  subscriptions.hostedEvents = query.addListener((collection, change) => {
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
    subscriptions.savedEvents();
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
  subscriptions.savedEvents = query.addListener((collection, change) => {
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
  const { realm, usersFilters } = getState();
  const newFilters = { ...usersFilters, ...filters };
  const query = Array.from(UserModel.getUsers(realm, newFilters));
  dispatch({
    type: actionTypes.GET_USER,
    users: query,
    usersFilters: newFilters,
  });
};

export const setEventFilters = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.getEvents) {
    subscriptions.getEvents();
    return;
  }
  const { eventFilters, userRealm } = getState();
  const query = EventModel.get(userRealm, { ...eventFilters, ...filters });
  dispatch({
    type: actionTypes.FILTER_EVENTS,
    events: Array.from(query.values()),
    filters: { ...eventFilters, ...filters },
  });
  subscriptions.getEvents = query.addListener((collection, change) => {
    if (!_.values(change).every(_.isEmpty)) {
      dispatch({
        type: actionTypes.UPDATE_EVENTS,
        events: Array.from(collection.values()),
      });
    }
  });
};

export const saveEvent = (eventID) => (dispatch, getState) => {
  const { user, saved, savedEvents, userRealm } = getState();
  const event = EventModel.getOne(userRealm, eventID);
  userRealm.write(() => {
    user.interestedEvents.push(event);
  });
};

export const removeEvent = (eventID) => (dispatch, getState) => {
  const { user, saved, savedEvents, userRealm } = getState();
  const index = saved.indexOf(eventID.toString());
  if (index >= 0)
    userRealm.write(() => {
      user.interestedEvents.splice(index, 1);
    });
};
