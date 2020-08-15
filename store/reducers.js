import { combineReducers } from "redux";
import { actionTypes } from "./actions";

const events = (state, action) => {
  if (
    action.type === actionTypes.UPDATE_EVENTS ||
    action.type === actionTypes.FILTER_EVENTS
  )
    return action.events;
  if (action.type === actionTypes.LOGOUT) return [];
  return state || [];
};

const eventFilters = (state, action) => {
  if (action.type === actionTypes.FILTER_EVENTS) return action.filters;
  if (action.type === actionTypes.LOGOUT) return [];
  return state || {};
};

const hostedEvents = (state, action) => {
  if (action.type === actionTypes.UPDATE_HOSTED_EVENTS)
    return action.hostedEvents;
  if (action.type === actionTypes.LOGOUT) return [];
  return state || [];
};

const users = (state, action) => {
  if (action.type === actionTypes.GET_USER) return action.users;
  if (action.type === actionTypes.LOGOUT) return [];
  return state || [];
};

const user = (state, action) => {
  if (
    action.type === actionTypes.UPDATE_USER ||
    action.type === actionTypes.LOGIN
  )
    return action.user;
  if (
    action.type === actionTypes.LOGOUT ||
    action.type === actionTypes.REGISTER_APP
  )
    return [];
  return state || null;
};

const auth = (state, action) => {
  if (action.type === actionTypes.LOGIN) return action.auth;
  if (action.type === actionTypes.LOGOUT) return null;
  return state || null;
};

const app = (state, action) => {
  if (
    action.type === actionTypes.REGISTER_APP ||
    action.type === actionTypes.REGISTER_APP_LOGIN
  )
    return action.app;
  return state || null;
};

const userRealm = (state, action) => {
  if (action.type === actionTypes.LOGIN) return action.userRealm;
  if (action.type === actionTypes.LOGOUT) return null;
  return state || null;
};

const realm = (state, action) => {
  if (action.type === actionTypes.LOGIN) return action.realm;
  if (action.type === actionTypes.LOGOUT) return null;
  return state || null;
};

const saved = (state, action) => {
  if (action.type === actionTypes.UPDATE_INTERESTED_EVENTS) return action.saved;
  if (action.type === actionTypes.LOGOUT) return [];
  return state || [];
};

const savedEvents = (state, action) => {
  if (action.type === actionTypes.UPDATE_INTERESTED_EVENTS)
    return action.savedEvents;
  if (action.type === actionTypes.LOGOUT) return [];
  return state || [];
};

const usersFilters = (state, action) => {
  if (action.type === actionTypes.GET_USER) return action.usersFilters;
  if (action.type === actionTypes.LOGOUT) return [];
  return state || [];
};

const sessionID = (state, action) => {
  if (action.type === actionTypes.LOGIN) return action.sessionID;
  if (action.type === actionTypes.LOGOUT) return null;
  return state || null;
};

export default combineReducers({
  events,
  eventFilters,
  hostedEvents,
  user,
  users,
  app,
  auth,
  userRealm,
  usersFilters,
  realm,
  saved,
  savedEvents,
  sessionID,
});
