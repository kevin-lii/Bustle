import React, { useState, createRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, View, TextArea } from "react-native-ui-lib";
import { Picker } from "@react-native-community/picker";
import { connect } from "react-redux";
import { Value } from "react-native-reanimated";

import PostModel from "../../../models/Post";
import LocationLabel from "../../../components/Buttons/LocationLabel";
import PillButton from "../../../components/Buttons/PillButton";
import WithOverlayBottomSheet from "../../../components/Container/WithOverlayBottomSheet";
import WithFormHeader from "../../../components/Container/WithFormHeader";

import { getDefaultRegionID, getDefaultZone } from "../../../global/utils";

const PostCreate = ({ navigation, route, user }) => {
  const [text, setText] = useState("");
  const zone = getDefaultZone();
  const [regionID, setRegionID] = useState(getDefaultRegionID(zone));
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
        { text, regionID }
      );
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const pills = tags.map((tag, i) => <PillButton label={tag} key={i} />);
  pills.unshift(<PillButton label="+  Add Tag" key={0} />);

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
        header={
          <LocationLabel
            zone={zone}
            regionID={regionID}
            size="large"
            onPick={({ value }) => setRegionID(value)}
          />
        }
      >
        <ScrollView style={{ backgroundColor: "white", paddingHorizontal: 10 }}>
          <TextArea
            text50
            placeholder="What's on your mind?"
            onChangeText={(text) => setText(text)}
          />
        </ScrollView>
        <View padding-10 style={styles.tag}>
          {pills}
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
