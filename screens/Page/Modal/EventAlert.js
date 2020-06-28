import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

import { Theme } from "../../../global/constants";

export default function ({ navigation, route }) {
  const { alertMessages, handleAlertConfirm } = route.params;
  return (
    <AwesomeAlert
      show
      showProgress={false}
      message={alertMessages}
      closeOnTouchOutside
      closeOnHardwareBackPress
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="No"
      confirmText="Yes, I'm sure"
      confirmButtonColor={Theme.red}
      onDismiss={navigation.goBack}
      onCancelPressed={navigation.goBack}
      onConfirmPressed={() => {
        handleAlertConfirm();
        navigation.goBack();
      }}
    />
  );
}
