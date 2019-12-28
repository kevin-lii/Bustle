import React from 'react'
import { View, Text, Card } from 'react-native-ui-lib'
import moment from 'moment'

import IconButton from '../Buttons/IconButton'
import Events from "../../models/Event"
import { Theme } from '../../constants'

export default ({ children, event, navigation }) => (
    <Card
        flex
        white50
        borderRadius={12}
        row
        height={80}
        width={"100%"}
        containerStyle={[{
            marginBottom: 20,
            borderColor: Theme.primary,
            borderWidth: 2,
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center"
        }]}>
        
        <View>
            <Text style={{ fontSize: 20, color: Theme.primary, fontWeight: "bold"}}>
                {event.name.length > 23 ? event.name.substring(0, 20) + "..." : event.name}
            </Text>
            <Text style={{ fontSize: 15, color: Theme.primary}}>
                {event.time && moment(event.time.toDate()).format('h:mm a')} on {event.date && moment(event.date.toDate()).format('MMM Do, YYYY')}
            </Text>
        </View>
        <View row spread width={80}>
            <View><IconButton icon="map" size={30} 
                    onPress={() => navigation.navigate('Map', { 'preview': event })}/></View>
            <View><IconButton icon="trash" size={30} onPress={() => { Events.remove(event) }}/></View>
        </View>
        
        {children} 
    </Card>
)