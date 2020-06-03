import React, { useState } from "react";
import { Text, View } from "react-native-ui-lib";
import IconButton from "../../Buttons/IconButton";
import { connect } from "react-redux";

import { Theme } from "../../../global/constants";
import PostModel from "../../../models/Post";

const Voter = ({ user, postID, votes, reply, height, condensed = false }) => {
  const [numVotes, setVotes] = useState(votes);

  const upVoted = user.upvoted ? Boolean(user.upvoted[reply || postID]) : false;
  const [up, setUp] = useState(upVoted);
  const downVoted = user.downvoted
    ? Boolean(user.downvoted[reply || postID])
    : false;
  const [down, setDown] = useState(downVoted);

  const iconSize = condensed ? 35 : 50;
  const fontSize = condensed ? 15 : 20;

  const hitBox = { top: 3, left: 8, right: 8 };

  return (
    <View centerH spread style={{ height }}>
      <IconButton
        type="Ionicons"
        icon="ios-arrow-up"
        size={iconSize}
        onPress={() => {
          if (!up) {
            PostModel.upvote(postID, reply);
            setVotes(numVotes + 1 + Boolean(down));
            setUp(true);
            setDown(false);
          }
        }}
        color={up ? Theme.secondary : Theme.grey}
        hitBox={hitBox}
      />
      <Text
        style={{
          fontSize,
          position: "absolute",
          top: "50%",
          marginTop: -fontSize * 0.65,
        }}
      >
        {numVotes}
      </Text>
      <IconButton
        type="Ionicons"
        icon="ios-arrow-down"
        size={iconSize}
        onPress={() => {
          if (!down) {
            PostModel.downvote(postID, reply);
            setVotes(numVotes - 1 - Boolean(up));
            setUp(false);
            setDown(true);
          }
        }}
        color={down ? Theme.secondary : Theme.grey}
        hitBox={hitBox}
      />
    </View>
  );
};

export default connect((state) => ({ user: state.user }), {})(Voter);
