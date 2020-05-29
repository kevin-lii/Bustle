import React, { useEffect, useState } from "react";
import { Text, View } from "react-native-ui-lib";

import PostModel from "../../models/Post";
import PostCard from "../../components/Cards/PostCard";

export default ({ navigation, route }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    if (!content) {
      PostModel.get({ tag: route.params.tag }).then((docs) =>
        setContent(
          docs.map((doc, index) => (
            <PostCard post={doc} postID={doc.id} key={index} />
          ))
        )
      );
    }
  });

  return (
    <View flex paddingH-10>
      {content || <Text>Loading...</Text>}
    </View>
  );
};
