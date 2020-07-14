import React, { useState, useEffect } from "react";
import { Button } from "react-native-ui-lib";
import { connect } from "react-redux";

import { Theme } from "../../global/constants";
import Icons from "../Image/Icons";

import UserModel from "../../models/User";
import { saveEvent, removeEvent } from "../../store/actions";

const CalendarToggle = ({ event, user, saveEvent, removeEvent }) => {
  const [checked, setChecked] = useState(user.saved && user.saved[event.id]);
  {
    user.saved &&
      useEffect(() => {
        setChecked(user.saved[event.id]);
      }, [user.saved[event.id]]);
  }
  return (
    <Button
      round
      style={{ width: 45 }}
      backgroundColor={checked ? Theme.primary : "white"}
      onPress={() => {
        setChecked(!checked);
        UserModel.saveEvent(event.id, !checked);
        checked ? removeEvent(event.id) : saveEvent(event);
      }}
    >
      <Icons
        size={18}
        type="Font"
        color={checked ? "white" : Theme.primary}
        icon={checked ? "calendar-check" : "calendar"}
      />
    </Button>
  );
};

export default connect(
  (state) => ({
    user: state.user,
  }),
  {
    saveEvent,
    removeEvent,
  }
)(CalendarToggle);
