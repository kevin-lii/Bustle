import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native-ui-lib'

import styles from './styles'

export default ({ category, submitCategory, current }) => (
    <TouchableOpacity onPress={ () => submitCategory(category) }>
        <View style={ [styles.categoryButton, current ? styles.hightlight : {} ] }>
            <Text>{ category }</Text>
        </View>
    </TouchableOpacity>
)