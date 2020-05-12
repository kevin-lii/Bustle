import React, { useState } from "react";
import { Button } from "react-native-ui-lib";

import { Theme } from "../../global/constants";
import Icons from "../Image/Icons";

export default ({ selected }) => {
  const [checked, setChecked] = useState(selected);

  return (
    <Button
      round
      style={{ width: 50 }}
      backgroundColor={checked ? Theme.secondary : Theme.disabled}
      onPress={() => setChecked(!checked)}
    >
      <Icons
        size={22}
        type="MaterialIcons"
        color={checked ? "white" : Theme.primary}
        icon={checked ? "calendar-check" : "calendar-blank"}
      />
    </Button>
  );
};
