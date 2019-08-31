import React from 'react'
import { View, Card } from 'react-native-ui-lib'

export default ({ children, height, padded }) => (
    <Card
        white40
        borderRadius={12}
        
        height={height}
        width={340}
        containerStyle={[{
            marginBottom: 20,
            borderWidth: 2,
            borderColor: '#FFA45B'
        }, padded ? {
            paddingLeft: 15,
            paddingRight: 15
        } : {}]}>
        {children} 
    </Card>
)