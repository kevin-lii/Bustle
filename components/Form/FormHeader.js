import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/Fontisto'

import styles from './styles'

export default ({icon, title, onPress, headerRight}) => (
    <View row centerV style={styles.formTitle}>
        <TouchableOpacity onPress={onPress}>
            <View center style={ styles.icon }><Icon name={icon}/></View>
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <View>{headerRight}</View>
    </View>
)