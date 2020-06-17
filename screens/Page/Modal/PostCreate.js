import React, { useState, createRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, View, TextArea } from "react-native-ui-lib";
import { connect } from "react-redux";

import PostModel from "../../../models/Post";
import WithOverlayBottomSheet from "../../../components/Container/WithOverlayBottomSheet";
import WithFormHeader from "../../../components/Container/WithFormHeader";
import Icons from "../../../components/Image/Icons";
import Tokenizer from "../../../components/Form/Tokenizer";

import { getDefaultRegionID, getDefaultZone } from "../../../global/utils";
import { Theme } from "../../../global/constants";
import { forumTags } from "../../../global/forumconfig";
import { postAnonymously } from "../../../global/functions";
import PillButton from "../../../components/Buttons/PillButton";

const PostCreate = ({ navigation, route, user }) => {
  const [text, setText] = useState("");
  const zone = getDefaultZone();
  const [tags, setTags] = useState([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [anon, setAnon] = useState(false);

  const sheet = createRef();

  const handleSubmit = async () => {
    const data = {
      tags: tags.map((t) => t.value),
      text,
      zone,
    };
    try {
      if (anon) postAnonymously(data);
      else
        await PostModel.create(
          {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          data
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
            autoFocus={true}
          />
        </ScrollView>
        <View paddingH-10 style={{ backgroundColor: "white" }}>
          <View style={{ width: 156 }}>
            <PillButton
              icon="user-secret"
              label="Anonymous"
              iconSize={16}
              fontSize={18}
              active={anon}
              defaultColor={Theme.grey}
              onPress={() => setAnon(!anon)}
            />
          </View>
          <View row>
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
