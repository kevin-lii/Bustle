import React from "react";
import { Text, View } from "react-native-ui-lib";
import moment from "moment";
import HyperLink from "react-native-hyperlink";

import ProfileHeader from "./components/ProfileHeader";
import Voter from "./components/Voter";
import Icons from "../Image/Icons";

import { Theme } from "../../global/constants";
import globalStyle from "../../global/styles";
import { forumTags } from "../../global/forumconfig";
import TagLinks from "./components/TagLinks";

export default ({
  author,
  replyCount,
  reply,
  votes,
  text,
  tags,
  createdAt,
  postID,
  isOP = false,
  condensed = false,
  containerStyle,
}) => (
  <View style={{ backgroundColor: "white", ...containerStyle }} padding-10>
    <ProfileHeader {...author} createdAt={createdAt} isOP={isOP} />
    <View row marginB-5>
      <View flex>
        <View marginT-10 paddingR-10>
          <HyperLink linkDefault={true}>
            <Text style={{ fontSize: reply ? 15 : 25 }}>{text}</Text>
          </HyperLink>
        </View>
      </View>
      <View centerV>
        <Voter
          postID={postID}
          reply={reply}
          votes={votes}
          height={condensed ? 70 : 120}
          condensed={condensed}
        />
      </View>
    </View>
    {!reply && (
      <View row spread paddingB-5>
        <TagLinks tags={tags} />
        <View row centerV>
          <Text text80 marginR-5>
            {replyCount || 0}
          </Text>
          <Icons icon="comment" />
        </View>
      </View>
    )}
  </View>
);
