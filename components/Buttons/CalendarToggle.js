import React, { useState, useEffect } from "react";
import { Button } from "react-native-ui-lib";
import { connect } from "react-redux";
import { ObjectId } from "bson";

import { Theme } from "../../global/constants";
import Icons from "../Image/Icons";
import { saveEvent, removeEvent } from "../../store/actions";

const CalendarToggle = ({ event, saved, saveEvent, removeEvent }) => {
  const [checked, setChecked] = useState(saved?.includes(event._id.toString()));
  {
    saved &&
      useEffect(() => {
        setChecked(saved?.includes(event._id.toString()));
      }, [saved?.includes(event._id.toString())]);
  }
  return (
    <Button
      round
      style={{ width: 45 }}
      backgroundColor={checked ? Theme.primary : "white"}
      onPress={() => {
        setChecked(!checked);
        checked ? removeEvent(event._id) : saveEvent(event._id);
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
    saved: state.saved,
  }),
  {
    saveEvent,
    removeEvent,
  }
)(CalendarToggle);
