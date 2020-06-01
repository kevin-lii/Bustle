import React, { useState, createRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, View, TextArea } from "react-native-ui-lib";
import { Picker } from "@react-native-community/picker";
import { connect } from "react-redux";
import { Value } from "react-native-reanimated";

import PostModel from "../../../models/Post";
import LocationLabel from "../../../components/Buttons/LocationLabel";
import WithOverlayBottomSheet from "../../../components/Container/WithOverlayBottomSheet";
import WithFormHeader from "../../../components/Container/WithFormHeader";
import Icons from "../../../components/Image/Icons";
import Tokenizer from "../../../components/Form/Tokenizer";

import { getDefaultRegionID, getDefaultZone } from "../../../global/utils";
import { Theme } from "../../../global/constants";
import { forumTags } from "../../../global/forumconfig";

const PostCreate = ({ navigation, route, user }) => {
  const [text, setText] = useState("");
  const zone = getDefaultZone();
  const [tags, setTags] = useState([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const sheet = createRef();

  const handleSubmit = async () => {
    try {
      await PostModel.create(
        {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        {
          tags: tags.map((t) => t.value),
          text,
          zone,
        }
      );
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const sheetContent = (
    <View row centerV>
      <Text text50>Location: </Text>
      <View flex></View>
    </View>
  );

  return (
    <WithOverlayBottomSheet
      navigation={navigation}
      height={400}
      ref={sheet}
      sheetContent={sheetOpen ? sheetContent : null}
    >
      <WithFormHeader
        onClose={navigation.goBack}
        onSubmit={handleSubmit}
        submitText="Post"
      >
        <ScrollView style={{ backgroundColor: "white", paddingHorizontal: 10 }}>
          <TextArea
            text50
            placeholder="What's on your mind?"
            onChangeText={(text) => setText(text)}
          />
        </ScrollView>
        <View padding-10 row style={{ backgroundColor: "white" }}>
          <View marginR-7 marginT-10>
            <Icons icon="hashtag" size={20} />
          </View>
          <View flex centerV>
            <Tokenizer
              value={tags}
              size={16}
              color="white"
              onChange={setTags}
              data={Object.keys(forumTags).map((tag) => ({
                label: "#" + tag,
                value: tag,
              }))}
            />
          </View>
        </View>
      </WithFormHeader>
    </WithOverlayBottomSheet>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "white",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
});

export default connect(
  (state) => ({
    user: state.user,
  }),
  {}
)(PostCreate);
