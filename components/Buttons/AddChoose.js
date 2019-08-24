import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import styles from './styles'

export default ({ buttonVisible, openEventForm, openGroupForm }) => (
    <View style={ {display: buttonVisible ? 'flex' : 'none'}}>
        <TouchableOpacity style={ [styles.button, styles.eventButton] } onPress={ openEventForm }>
            <Text>Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ [styles.button, styles.groupButton] } onPress={ openGroupForm }>
            <Text>Group</Text>
        </TouchableOpacity>
    </View>
) 