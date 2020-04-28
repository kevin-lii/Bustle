import { combineReducers } from "redux";
import { actionTypes } from "./actions";

const events = (state, action) => {
  if (action.type === actionTypes.UPDATE_EVENTS) return action.events;
  return state || null;
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

export default combineReducers({
  events,
  posts,
  hostedEvents,
  user,
});
