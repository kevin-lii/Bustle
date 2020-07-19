import { combineReducers } from "redux";
import { actionTypes } from "./actions";

const events = (state, action) => {
  if (
    action.type === actionTypes.UPDATE_EVENTS ||
    action.type === actionTypes.FILTER_EVENTS
  )
    return action.events;
  return state || [];
};

const eventFilters = (state, action) => {
  if (action.type === actionTypes.FILTER_EVENTS) return action.filters;
  return state || {};
};

const hostedEvents = (state, action) => {
  if (action.type === actionTypes.UPDATE_HOSTED_EVENTS)
    return action.hostedEvents;
  return state || [];
};

const savedEvents = (state, action) => {
  if (action.type === actionTypes.UPDATE_INTERESTED_EVENTS)
    return action.savedEvents;
  return state || [];
};

const event = (state, action) => {
  if (action.type === actionTypes.GET_EVENT) {
    return action.event;
  }
  return state || [];
};

const user = (state, action) => {
  if (action.type === actionTypes.UPDATE_USER) {
    return Object.assign({ ...state }, action.user);
  }
  if (
    action.type === actionTypes.LOGOUT ||
    action.type === actionTypes.REGISTER_APP
  ) {
    return {};
  }
  return state || null;
};

const app = (state, action) => {
  if (action.type === actionTypes.REGISTER_APP) {
    return action.app;
  }
  return state || null;
};

const userRealm = (state, action) => {
  if (action.type === actionTypes.UPDATE_USER) {
    return action.userRealm;
  }
  return state || null;
};

const eventRealm = (state, action) => {
  if (action.type === actionTypes.UPDATE_USER) {
    return action.eventRealm;
  }
  return state || null;
};

export default combineReducers({
  event,
  events,
  eventFilters,
  hostedEvents,
  savedEvents,
  user,
  app,
  userRealm,
  eventRealm,
});
