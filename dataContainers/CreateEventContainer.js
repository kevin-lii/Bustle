import React from 'react'
import { View } from 'react-native'

import CreateEventForm from '../screens/Detail/CreateEvent'

export default function(props) {


    const generateEvent = (data) => {
        data.createdAt = Date.now()
        data.chat = ''
        data.invited = ''
    }

    return <CreateEventForm generateEvent/>
}

