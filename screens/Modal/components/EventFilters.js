import React from "react";
import { ScrollView } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { connect } from "react-redux";

import Tokenizer from "../../../components/Form/Tokenizer";

import { setEventFilters } from "../../../store/actions";
import { Theme, categories, allEventTags } from "../../../global/constants";

const EventFilters = ({ eventFilters, setEventFilters }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={{ padding: 10 }}>
      <View>
        <Text text70 color={Theme.grey}>
          Categories
        </Text>
        <Tokenizer
          onChange={(values) =>
            setEventFilters({
              ...eventFilters,
              categories: values.map((v) => v.value),
              tags: [],
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
        <Text text70 marginT-10 color={Theme.grey}>
          Tags{console.log(allEventTags)}
        </Text>
        <Tokenizer
          onChange={(values) =>
            setEventFilters({
              ...eventFilters,
              tags: values.map((v) => v.value),
              categories: [],
            })
          }
          value={eventFilters.tags?.map((v) => ({ label: v, value: v })) || []}
          data={allEventTags.map((tag) => ({
            label: tag,
            value: tag,
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
