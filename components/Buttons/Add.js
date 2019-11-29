import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'

import styles from './styles'

export default ({ toggleOverlay }) => (
    <TouchableOpacity style={ [styles.button, styles.addButton] } onPress={ toggleOverlay }>
        <Icon name="plus-a"/>
    </TouchableOpacity>
)