import React from "react";
import { Text, View } from "react-native-ui-lib";
import moment from "moment";

import ProfileHeader from "./components/ProfileHeader";
import Voter from "./components/Voter";
import Icons from "../Image/Icons";

export default ({
  author,
  replyCount,
  reply,
  votes,
  text,
  createdAt,
  postID,
  isOP = false,
  containerStyle,
}) => (
  <View style={{ width: "100%", backgroundColor: "white", ...containerStyle }}>
    <View row padding-10>
      <View flex>
        <ProfileHeader {...author} createdAt={createdAt} isOP={isOP} />
        <View marginT-10 paddingR-5>
          <Text style={{ fontSize: reply ? 15 : 25 }}>{text}</Text>
        </View>
      </View>
      <View centerV>
        <Voter postID={postID} reply={reply} votes={votes} condensed />
      </View>
    </View>
    <View row spread paddingH-10 paddingB-5>
      <Text flex>{createdAt && moment(createdAt.toDate()).fromNow()}</Text>
      {replyCount != null && (
        <View row centerV>
          <Text text80 marginR-5>
            {replyCount}
          </Text>
          <Icons icon="comment" />
        </View>
      )}
      <View flex />
    </View>
  </View>
);
