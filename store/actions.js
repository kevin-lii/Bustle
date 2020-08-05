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
  GET_USER: "get user",
};
const subscriptions = {};
export const registerApp = () => async (dispatch, getState) => {
  const appConfig = {
    id: realmID,
    timeout: 10000,
    app: {
      name: "default",
      version: "1",
    },
  };
  const data = new Realm.App(appConfig);
  dispatch({
    type: actionTypes.REGISTER_APP,
    app: data,
  });
};

export const login = (creds) => async (dispatch, getState) => {
  const { app, auth } = getState();
  if (auth != null) {
    console.warn("Already logged in -- can't log out!");
    return;
  }
  console.log("signing in");
  const authUser = await app.logIn(creds);
  console.log(authUser.identity);

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
  const realm = await Realm.open(config);
  const userRealm = new Realm(userConfig);
  const query = UserModel.get(userRealm, authUser.identity);
  dispatch({
    type: actionTypes.LOGIN,
    user: query,
    userRealm,
    realm,
    auth: authUser,
  });
  query.addListener((obj, change) => {
    if (!_.values(change).every(_.isEmpty)) {
      dispatch({
        type: actionTypes.UPDATE_USER,
        user: obj,
      });
    }
  });
};

export const logout = () => async (dispatch, getState) => {
  const { user, userRealm, realm, auth } = getState();
  if (auth == null) {
    console.warn("Not logged in -- can't log out!");
    return;
  }

  userRealm.removeAllListeners();
  userRealm.close();

  realm.removeAllListeners();
  realm.close();

  console.log("Logging out...");
  auth.logOut();
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

export const getUser = (id) => (dispatch, getState) => {
  const { realm } = getState();
  const query = UserModel.get(realm, id);
  dispatch({
    type: actionTypes.GET_USER,
    users: query,
  });
};

export const setEventFilters = (filters = {}) => (dispatch, getState) => {
  if (subscriptions.getEvents) {
    subscriptions.getEvents();
    return;
  }
  const { eventFilters, realm } = getState();
  const query = EventModel.get(realm, { ...eventFilters, ...filters });
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
// export const saveEvent = (event) => (dispatch, getState) => {
//   const { user, saved, userRealm } = getState();
//   const allEvents = [];
//   let flag = true;
//   const boundary = Date.now();
//   saved.forEach((e) => {
//     if (e.startDate < boundary) {
//       allEvents.push(e);
//       flag = false;
//     } else if (e.startDate.toDate() > boundary) {
//       saved[e._id] = false;
//     } else {
//       allEvents.push(e);
//       saved[e._id] = true;
//     }
//   });
//   if (flag && event.startDate < boundary) {
//     allEvents.push(event);
//     saved[event._id] = true;
//   }
//   userRealm.write(() => {
//     user.interestedEvents = allEvents;
//   });
//   dispatch({
//     type: actionTypes.UPDATE_INTERESTED_EVENTS,
//     saved,
//   });
// };

// export const removeEvent = (eventID) => (dispatch, getState) => {
//   const { user, saved, userRealm } = getState();
//   const allEvents = [];
//   user.interestedEvents?.forEach((e) => {
//     if (e._id === eventID) {
//       saved[e._id] = false;
//     } else {
//       allEvents.push(e);
//       saved[e._id] = true;
//     }
//   });
//   userRealm.write(() => {
//     user.interestedEvents = allEvents;
//   })
//   dispatch({
//     type: actionTypes.UPDATE_INTERESTED_EVENTS,
//     saved,
//   });
// };
