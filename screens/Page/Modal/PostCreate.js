import React from "react";
import { View } from "react-native-ui-lib";
import { connect } from "react-redux";

import WithFormHeader from "../../../components/Container/WithFormHeader";

const PostCreate = ({ navigation, route }) => (
  <WithFormHeader
    onClose={navigation.goBack}
    onSubmit={() => {}}
    submitText="Post"
  ></WithFormHeader>
);

export default connect(
  (state) => ({
    user: state.user,
  }),
  {}
)(PostCreate);
