import React from "react";
import { Text, View } from "react-native-ui-lib";
import ActionButton from "../../../components/Buttons/ActionButton";

import { Theme } from "../../../global/constants";

export default ({
  title,
  children,
  first,
  last,
  validationMessage,
  onNext,
  onCancel,
}) => (
  <View flex spread padding-10>
    <View center marginT-30>
      {first && (
        <Text text40 marginB-10>
          Welcome to Bustle!
        </Text>
      )}
      <Text text50>{title}</Text>
    </View>
    <View flex center>
      {children}
    </View>
    <View>
      <Text color={Theme.red} center>
        {validationMessage}
      </Text>
      {first && (
        <ActionButton
          primary
          text="Continue"
          onPress={onNext}
          disabled={Boolean(validationMessage)}
        />
      )}
      {!first && (
        <View row>
          <ActionButton
            text="Back"
            onPress={onCancel}
            borderColor={Theme.grey}
            color={Theme.grey}
            disabled={Boolean(validationMessage)}
          />
          <ActionButton
            primary
            text={last ? "Finish" : "Continue"}
            onPress={onNext}
            disabled={Boolean(validationMessage)}
            style={{ flex: 1, marginLeft: 10 }}
          />
        </View>
      )}
    </View>
  </View>
);
