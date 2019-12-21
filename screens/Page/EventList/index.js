import React from 'react'
import { Text } from 'react-native'
import Events from '../../../models/Event'

export default function EventList() {
    Events.get()
    return (
        <Text>Events</Text>
    )
}
