import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/Fontisto'

import styles from './styles'

export default ({ toggleOverlay }) => (
    <TouchableOpacity style={ [styles.button, styles.addButton] } onPress={ toggleOverlay }>
        <View center>
                <Icon name="plus-a" size={20}/>
        </View>
    </TouchableOpacity>
)