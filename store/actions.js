import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import EventModel from "../models/Event";

export const actionTypes = {
  UPDATE_USER: "update user",
  UPDATE_EVENTS: "event update",
  UPDATE_HOSTED_EVENTS: "hosted event update"
};

export const login = () => dispatch => {
  auth().onAuthStateChanged(async user => {
    if (user) {
      const profile = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      const data = profile.data();
      data.uid = user.uid;
      dispatch({
        type: actionTypes.UPDATE_USER,
        user: data
      });
    } else {
      dispatch({
        type: actionTypes.UPDATE_USER,
        user: {}
      });
    }
  });
};

export const getHostedEvents = () => (dispatch, getState) => {
  const { user } = getState();
  EventModel.get({ host: user.uid }, snapshot => {
    const hostedEvents = [];
    snapshot.forEach(doc => {
      hostedEvents.push({ ...doc.data(), id: doc.id });
    });
    dispatch({
      type: actionTypes.UPDATE_HOSTED_EVENTS,
      hostedEvents
    });
  });
};

export const getEvents = (filters = {}) => dispatch => {
  EventModel.get(filters, snapshot => {
    dispatch({
      type: actionTypes.UPDATE_EVENTS,
      events: snapshot
    });
  });
};
