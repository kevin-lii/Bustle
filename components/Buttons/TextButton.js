import React from 'react'
import { Button, View, Text } from 'react-native-ui-lib'

import styles from './styles'
import { Theme } from '../../constants'

export default ({ primary, secondary, text, onPress }) => (
    <Button 
        label={text} 
        color={primary ? 'white' : Theme.primary} 
        backgroundColor={primary ? Theme.primary : 'white' } 
        outlineColor={primary ? Theme.primary : Theme.secondary }
        outlineWidth= {1}
        size="small"
        borderRadius={10}
        onPress={onPress} />
)