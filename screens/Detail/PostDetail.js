import React, { Component, createRef } from "react";
import auth from "@react-native-firebase/auth";
import { Text, TextArea, View, TextField } from "react-native-ui-lib";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import Toast from "react-native-simple-toast";

import DetailHeader from "../../components/Header/DetailHeader";
import IconButton from "../../components/Buttons/IconButton";
import PostDetailCard from "../../components/Cards/PostDetailCard";

import PostModel from "../../models/Post";
import { Theme } from "../../global/constants";
import globalStyles from "../../global/styles";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      height: 0,
      post: props.route.params.post,
    };
    this.scroll = createRef();
    this.subscriptions = [];
  }

  componentDidMount() {
    const postID = this.props.route.params?.postID;
    this.subscriptions.push(
      PostModel.subscribeReplies(postID, (docs) => {
        this.setState({
          replies: docs.map((doc) => ({
            reply: doc.id,
            postID,
            ...doc.data(),
          })),
        });
      })
    );

    this.subscriptions.push(
      PostModel.subscribePost(postID, (post) => this.setState({ post }))
    );
  }

  componentWillUnmount() {
    for (fn of this.subscriptions) fn();
  }

  render() {
    const { navigation, route, user } = this.props;
    const { post, postID } = route.params;

    const sendReply = () => {
      if (!this.state.reply) return;
      try {
        PostModel.reply(
          postID,
          {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          { text: this.state.reply }
        );
      } catch (e) {
        console.log(e);
        Toast.showWithGravity("Reply failed to send.");
      }

      this.setState({ reply: "" });
    };

    const replies = this.state.replies ? (
      this.state.replies.map((data, index) => (
        <PostDetailCard
          containerStyle={{
            borderRadius: 12,
            marginHorizontal: 10,
            marginBottom: 5,
            ...globalStyles.cardShadow,
          }}
          {...data}
          isOP={data.author.uid === user.uid}
          key={index}
          condensed
        />
      ))
    ) : (
      <Text>Loading...</Text>
    );

    return (
      <View flex style={{ backgroundColor: Theme.defaultBackground }}>
        <View flex>
          <ScrollView ref={this.scroll}>
            <PostDetailCard
              {...post}
              postID={postID}
              containerStyle={{ marginVertical: 5 }}
            />
            {replies}
          </ScrollView>
        </View>
        <View row paddingH-10 style={styles.replyBar}>
          <TextInput
            onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height });
            }}
            style={{ ...styles.input, height: Math.max(35, this.state.height) }}
            multiline={true}
            autoFocus={route.params.focusInput}
            placeholder="Write your reply..."
            onChangeText={(reply) => this.setState({ reply })}
            value={this.state.reply}
          />
          <IconButton icon="paper-plane" size={20} onPress={sendReply} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  replyBar: {
    width: "100%",
    minHeight: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
    fontSize: 16,
  },
});

export default connect(
  (state) => ({
    user: state.user,
  }),
  {}
)(PostDetail);
