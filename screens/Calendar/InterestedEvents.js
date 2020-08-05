import React from "react";
import { Text, FlatList, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import EventDetail from "../../components/Cards/EventDetailCard";
import { getSavedEvents } from "../../store/actions";

import styles from "./styles";

class InterestedFeed extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getSavedEvents();
  }

  render() {
    const { navigation, savedEvents } = this.props;
    const renderFooter = () => {
      if (!savedEvents) {
        return <Text>Loading...</Text>;
      } else {
        return null;
      }
    };
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.scrollView}
          data={savedEvents}
          renderItem={({ item }) => {
            return <EventDetail event={item} navigation={navigation} />;
          }}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={() => (
            <Text marginT-10>You have no saved events.</Text>
          )}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    savedEvents: state.savedEvents,
  }),
  {
    getSavedEvents,
  }
)(InterestedFeed);
