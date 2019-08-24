import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import styles from './styles'

export default ({ toggleOverlay }) => (
    <TouchableOpacity style={ [styles.button, styles.addButton] } onPress={ toggleOverlay }>
        <Text>Add</Text>
    </TouchableOpacity>
)