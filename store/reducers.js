import { combineReducers } from "redux";
import { actionTypes } from "./actions";

const events = (state, action) => {
  if (
    action.type === actionTypes.UPDATE_EVENTS ||
    action.type === actionTypes.FILTER_EVENTS
  )
    return action.events;
  return state || null;
};

const eventFilters = (state, action) => {
  if (action.type === actionTypes.FILTER_EVENTS) return action.filters;
  return state || {};
};

const posts = (state, action) => {
  if (action.type === actionTypes.UPDATE_POSTS) return action.posts;
  return state || null;
};

const hostedEvents = (state, action) => {
  if (action.type === actionTypes.UPDATE_HOSTED_EVENTS)
    return action.hostedEvents;
  return state || null;
};

const user = (state, action) => {
  if (action.type === actionTypes.UPDATE_USER) {
    return Object.assign({ ...state }, action.user);
  }
  if (action.type === actionTypes.LOGOUT) {
    return {};
  }
  return state || null;
};

const interested = (state, action) => {
  if (action.type === actionTypes.UPDATE_INTERESTED_EVENTS)
    return action.interested;
  return state || null;
};

export default combineReducers({
  events,
  eventFilters,
  posts,
  hostedEvents,
  user,
  interested,
});
