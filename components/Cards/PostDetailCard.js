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
  containerStyle,
}) => (
  <View style={{ backgroundColor: "white", ...containerStyle }}>
    <View row padding-10>
      <View flex>
        <ProfileHeader {...author} createdAt={createdAt} isOP={isOP} />
        <View marginT-10 paddingR-5>
          <HyperLink linkDefault={true}>
            <Text style={{ fontSize: reply ? 15 : 25 }}>{text}</Text>
          </HyperLink>
        </View>
      </View>
      <View centerV>
        <Voter postID={postID} reply={reply} votes={votes} condensed />
      </View>
    </View>
    {!reply && (
      <View row spread paddingH-10 paddingB-5>
        <View row>
          {tags.map((t) => (
            <Text text60 color={forumTags[t]}>{`#${t} `}</Text>
          ))}
        </View>
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
