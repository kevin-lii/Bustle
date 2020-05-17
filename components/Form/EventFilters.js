import React from "react";
import { ScrollView } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { connect } from "react-redux";

import Tokenizer from "./Tokenizer";

import { setEventFilters } from "../../store/actions";
import { Theme, categories } from "../../global/constants";

const EventFilters = ({ eventFilters, setEventFilters }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={{ padding: 10 }}>
      <View>
        <Text text60 marginB-5 color={Theme.grey}>
          Categories
        </Text>
        <Tokenizer
          onChange={(values) =>
            setEventFilters({
              ...eventFilters,
              categories: values.map((v) => v.value),
            })
          }
          value={
            eventFilters.categories?.map((v) => ({ label: v, value: v })) || []
          }
          data={categories.map((category) => ({
            label: category,
            value: category,
          }))}
        />
      </View>
    </ScrollView>
  );
};

export default connect(
  (state) => ({
    eventFilters: state.eventFilters,
  }),
  {
    setEventFilters,
  }
)(EventFilters);
