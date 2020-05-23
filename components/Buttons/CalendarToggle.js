import React, { useState } from "react";
import { Button } from "react-native-ui-lib";
import { connect } from "react-redux";

import { Theme } from "../../global/constants";
import Icons from "../Image/Icons";

import UserModel from "../../models/User";

const CalendarToggle = ({ eventID, user }) => {
  const [checked, setChecked] = useState(user.saved && user.saved[eventID]);

  return (
    <Button
      round
      style={{ width: 45 }}
      backgroundColor={checked ? Theme.primary : "white"}
      onPress={() => {
        setChecked(!checked);
        UserModel.saveEvent(eventID, !checked);
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

export default connect((state) => ({ user: state.user }), {})(CalendarToggle);
