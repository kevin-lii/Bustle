import React, { useState, createRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, TextArea } from "react-native-ui-lib";
import { connect } from "react-redux";
import { Value } from "react-native-reanimated";

import WithFormHeader from "../../../components/Container/WithFormHeader";

import PostModel from "../../../models/Post";
import LocationLabel from "../../../components/Buttons/LocationLabel";

import { getDefaultRegionID, getDefaultZone } from "../../../global/utils";
import PillButton from "../../../components/Buttons/PillButton";
import WithOverlayBottomSheet from "../../../components/Container/WithOverlayBottomSheet";

const PostCreate = ({ navigation, route, user }) => {
  const [text, setText] = useState("");
  const zone = getDefaultZone();
  const [regionID, setRegionID] = useState(getDefaultRegionID(zone));
  const [tags, setTags] = useState([]);

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

  return (
    <WithOverlayBottomSheet height={400} ref={sheet}>
      <WithFormHeader
        onClose={navigation.goBack}
        onSubmit={handleSubmit}
        submitText="Post"
        header={
          <LocationLabel
            onPress={() => sheet.current.snapTo(0)}
            zone={zone}
            regionID={regionID}
            size="large"
            editIcon={true}
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
