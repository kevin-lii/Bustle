import React from "react";
import { FlatList } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

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
            <View centerV centerH flex>
              <Text text60 style={{ fontWeight: "bold" }}>
                You have no saved events.
              </Text>
            </View>
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
