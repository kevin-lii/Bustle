import React from "react";
import { ScrollView } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { connect } from "react-redux";

import Tokenizer from "../../../components/Form/Tokenizer";

import { getUsers } from "../../../store/actions";
import { Theme, gradeLevels, majors } from "../../../global/constants";
import { classes } from "../../../global/pickerItems";

const UserFilters = ({ usersFilters, getUsers }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={{ padding: 10 }}>
      <View>
        <Text text70 color={Theme.grey}>
          Year(s)
        </Text>
        <Tokenizer
          onChange={(values) =>
            getUsers({
              ...usersFilters,
              years: values.map((v) => v.value),
            })
          }
          value={
            usersFilters.years?.map((v) => ({
              label: "Class of " + v,
              value: v,
            })) || []
          }
          data={gradeLevels.map((grade) => ({
            label: "Class of " + grade,
            value: grade,
          }))}
        />
        <Text text70 marginT-10 color={Theme.grey}>
          Major(s)
        </Text>
        <Tokenizer
          onChange={(values) =>
            getUsers({
              ...usersFilters,
              majors: values.map((v) => v.value),
            })
          }
          value={
            usersFilters.majors?.map((v) => ({ label: v, value: v })) || []
          }
          data={majors.map((major) => ({
            label: major,
            value: major,
          }))}
        />
        <Text text70 marginT-10 color={Theme.grey}>
          Course(s)
        </Text>
        <Tokenizer
          onChange={(values) =>
            getUsers({
              ...usersFilters,
              classes: values.map((c) => c.value),
            })
          }
          value={
            usersFilters.classes?.map((c) => ({ label: c, value: c })) || []
          }
          data={classes.map((c) => ({
            label: c,
            value: c,
          }))}
        />
      </View>
    </ScrollView>
  );
};

export default connect(
  (state) => ({
    usersFilters: state.usersFilters,
  }),
  {
    getUsers,
  }
)(UserFilters);
