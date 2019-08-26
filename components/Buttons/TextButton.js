import React from 'react'
import { Button, View, Text } from 'react-native-ui-lib'

import styles from './styles'

export default ({ primary, secondary, text }) => (
    <Button 
        label={text} 
        color={primary ? 'white' : '#1c004b'} 
        backgroundColor={primary ? '#1c004b' : 'white' } 
        outlineColor={primary ? '#1c004b' : '#FFA45B' }
        outlineWidth= {1} />
)