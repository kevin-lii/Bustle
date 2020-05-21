import React, { Component } from "react";
import auth from "@react-native-firebase/auth";
import { Text, TextArea, View } from "react-native-ui-lib";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";

import DetailHeader from "../../components/Header/DetailHeader";
import IconButton from "../../components/Buttons/IconButton";
import PostDetailCard from "../../components/Cards/PostDetailCard";

import PostModel from "../../models/Post";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { reply: "" };
  }

  componentDidMount() {
    const postID = this.props.route.params?.postID;
    PostModel.subscribeReplies(postID, (docs) => {
      this.setState({
        replies: docs.map((doc) => ({
          reply: doc.id,
          postID,
          ...doc.data(),
        })),
      });
    });
  }

  render() {
    const { navigation, route, user } = this.props;
    const { post, postID } = route.params;

    const sendReply = () => {
      PostModel.reply(
        postID,
        {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        { text: this.state.reply }
      );
    };

    const replies = this.state.replies ? (
      this.state.replies.map((data, index) => (
        <PostDetailCard
          containerStyle={{
            borderTopWidth: index > 0 ? StyleSheet.hairlineWidth : 0,
          }}
          {...data}
          isOP={data.author.uid === user.uid}
          key={index}
        />
      ))
    ) : (
      <Text>Loading...</Text>
    );

    return (
      <>
        <View flex>
          <ScrollView>
            <PostDetailCard
              {...post}
              postID={postID}
              containerStyle={{ marginVertical: 5 }}
            />
            {replies}
          </ScrollView>
        </View>
        <View row paddingH-10 style={styles.replyBar}>
          <TextArea
            placeholder="Write your reply..."
            hideUnderline={true}
            onChangeText={(reply) => this.setState({ reply })}
          />
          <IconButton icon="paper-plane" size={20} onPress={sendReply} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  replyBar: {
    height: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
  },
});

export default connect(
  (state) => ({
    user: state.user,
  }),
  {}
)(PostDetail);
