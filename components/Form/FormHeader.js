import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/Fontisto'

import styles from './styles'

export default ({icon, title, onPress, headerRight}) => (
    <View row centerV spread style={styles.formTitle}>
        <TouchableOpacity onPress={onPress}><Icon name={icon}/></TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <View>{headerRight}</View>
    </View>
)