import React, { useState } from "react";
import { View, TextArea } from "react-native-ui-lib";
import { connect } from "react-redux";

import WithFormHeader from "../../../components/Container/WithFormHeader";

import PostModel from "../../../models/Post";
import LocationLabel from "../../../components/Buttons/LocationLabel";

import { getDefaultRegionID } from "../../../global/utils";

const PostCreate = ({ navigation, route, user }) => {
  const [text, setText] = useState("");
  const [regionID, setRegionID] = useState(getDefaultRegionID());

  const handleSubmit = async () => {
    try {
      await PostModel.create(
        {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        { text, regionID }
      );
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <WithFormHeader
      onClose={navigation.goBack}
      onSubmit={handleSubmit}
      submitText="Post"
      header={
        <LocationLabel
          onPress={() => {}}
          regionID={regionID}
          size="large"
          editIcon={true}
        />
      }
    >
      <TextArea
        text50
        placeholder="Epstein didn't kill himself"
        onChangeText={(text) => setText(text)}
      />
    </WithFormHeader>
  );
};

export default connect(
  (state) => ({
    user: state.user,
  }),
  {}
)(PostCreate);
