import React from "react";
import { ScrollView } from "react-native";
import { View, Picker } from "react-native-ui-lib";
import { connect } from "react-redux";

import Tokenizer from "./Tokenizer";
import Icons from "../Image/Icons";

import { setForumFilters } from "../../store/actions";
import { Theme } from "../../global/constants";
import { forumTags } from "../../global/forumconfig";

const ForumFilters = ({ forumFilters, setForumFilters }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={{ padding: 10 }}>
      <View flex row>
        <Icons icon="hashtag" size={20} />
        <Picker
          style={{ width: "100%" }}
          onChange={({ value }) =>
            setForumFilters({ ...forumFilters, tag: value })
          }
          mode="SINGLE"
          value={forumFilters.tag}
        >
          {forumTags.map((tag, i) => (
            <Picker.Item label={`#${tag}`} value={tag} key={i} />
          ))}
        </Picker>
      </View>
    </ScrollView>
  );
};

export default connect(
  (state) => ({
    forumFilters: state.forumFilters,
  }),
  {
    setForumFilters,
  }
)(ForumFilters);
