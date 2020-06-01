import React, { useState, createRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, View, TextArea } from "react-native-ui-lib";
import { connect } from "react-redux";

import PostModel from "../../../models/Post";
import WithOverlayBottomSheet from "../../../components/Container/WithOverlayBottomSheet";
import WithFormHeader from "../../../components/Container/WithFormHeader";
import Icons from "../../../components/Image/Icons";
import Tokenizer from "../../../components/Form/Tokenizer";

import { getDefaultZone } from "../../../global/utils";
import { Theme, forumTags } from "../../../global/constants";

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
        { text }
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
              pillColor={Theme.primary}
              color="white"
              onChange={setTags}
              data={forumTags.map((tag) => ({
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
