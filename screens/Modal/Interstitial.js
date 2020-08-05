import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { connect } from "react-redux";

import EventModel from "../../models/Event";

import { Theme } from "../../global/constants";

const alertMessages = {
  cancelEvent: "Cancel Event?",
  deleteEvent: "Remove Event?",
  endEvent: "End Event?",
};
const Interstitial = ({ navigation, route, realm }) => {
  const type = route.params.alertType;

  const handleAlertConfirm = () => {
    switch (type) {
      case "cancelEvent":
        EventModel.cancel(realm, route.params.event);
        break;
      case "deleteEvent":
        EventModel.remove(realm, route.params.event);
        break;
      case "endEvent":
        EventModel.end(realm, route.params.event);
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

export default connect(
  (state) => ({
    realm: state.userRealm,
  }),
  {}
)(Interstitial);
