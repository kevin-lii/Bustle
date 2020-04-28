import React, { useState, useEffect } from "react";
import { Text, View } from "react-native-ui-lib";
import IconButton from "../../Buttons/IconButton";
import { connect } from "react-redux";

import { Theme } from "../../../global/constants";
import PostModel from "../../../models/Post";

const Voter = ({ user, postID, votes }) => {
  const [numVotes, setVotes] = useState(votes);

  useEffect(() => {
    if (votes != numVotes) setVotes(votes);
  });

  const upVoted = user.upvoted ? user.upvoted[postID] : false;
  const downVoted = user.downvoted ? user.downvoted[postID] : false;

  return (
    <View centerH style={{ width: 40 }}>
      <IconButton
        type="Ionicons"
        icon="ios-arrow-up"
        size={50}
        onPress={() => PostModel.upvote(postID)}
        color={upVoted ? Theme.primary : Theme.grey}
      />
      <Text>{votes}</Text>
      <IconButton
        type="Ionicons"
        icon="ios-arrow-down"
        size={50}
        onPress={() => PostModel.downvote(postID)}
        color={downVoted ? Theme.primary : Theme.grey}
      />
    </View>
  );
};

export default connect((state) => ({ user: state.user }), {})(Voter);
