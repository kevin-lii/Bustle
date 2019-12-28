import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'

import EventData from "../../../models/Event";
import IconButton from "../../../components/Buttons/IconButton"
import EventDetail from "../../../components/Window/EventDetailCard"
import { UserContext } from "../../../dataContainers/context";

import styles from './styles'

class MyEvents extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
        eventList: []
    }
  }
  componentDidMount() {
        EventData.get({host: this.context.uid}, snapshot => {
            eventList = [];
            snapshot.forEach(doc => eventList.push({ ...doc.data(), id: doc.id }));
            this.setState({eventList})
        });
  }

  render() {
    const events = this.state.eventList.map((event, index) => (
        <EventDetail
            event={event} navigation={this.props.navigation} key={index}/>
    ))

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "flex-end", height: 50, marginTop: 10 }}>
                <View style={styles.closeContainer}>
                    <IconButton size={30} icon="close-a" onPress={() => this.props.navigation.goBack()}/>
                </View>
            </View>
            
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>My Events</Text>
                {events}
            </ScrollView>
        </View>
    )
  }
}

export default withNavigation(MyEvents)
