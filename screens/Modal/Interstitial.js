import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

import CollegeEventModel from "../../models/CollegeEvent";

import { Theme } from "../../global/constants";

const alertMessages = {
  cancelEvent: "Cancel Event?",
  deleteEvent: "Remove Event?",
  endEvent: "End Event?",
};

export default ({ navigation, route }) => {
  const type = route.params.alertType;

  const handleAlertConfirm = () => {
    switch (type) {
      case "cancelEvent":
        CollegeEventModel.cancel(route.params.event.id);
        break;
      case "deleteEvent":
        CollegeEventModel.remove(route.params.event);
        break;
      case "endEvent":
        CollegeEventModel.end(route.params.event.id);
        break;
    }
    navigation.goBack();
  };

  return (
    <AwesomeAlert
      show={true}
      showProgress={false}
      message={alertMessages[type]}
      closeOnTouchOutside
      closeOnHardwareBackPress
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="No"
      confirmText="Yes, I'm sure"
      confirmButtonColor={Theme.red}
      onDismiss={navigation.goBack}
      onCancelPressed={navigation.goBack}
      onConfirmPressed={handleAlertConfirm}
    />
  );
};
