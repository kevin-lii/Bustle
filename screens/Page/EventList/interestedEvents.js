import React from "react";
import { Text, FlatList, SafeAreaView } from "react-native";
import connect from "react-redux/lib/connect/connect";

import { getInterestedEvents } from "../../../store/actions";
import EventDetail from "../../../components/Cards/EventDetailCard";
import { UserContext } from "../../../dataContainers/context";

import styles from "./styles";

class InterestedFeed extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getInterestedEvents();
    this.props.navigation.addListener("focus", async () => {
      this.props.getInterestedEvents();
    });
  }

  render() {
    const { navigation, interested } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.scrollView}
          data={interested}
          renderItem={({ item, index }) => {
            return <EventDetail event={item} navigation={navigation} />;
          }}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Interested Events</Text>
          )}
          ListEmptyComponent={() => <Text>You have no events.</Text>}
        />
      </SafeAreaView>
    );
  }
}

export default connect((state) => ({ interested: state.interested }), {
  getInterestedEvents,
})(InterestedFeed);
