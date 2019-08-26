import React from 'react'
import { Card } from 'react-native-ui-lib'

export default ({ children, height }) => (
    <Card
        white40
        borderRadius={12}
        height={height}
        width={340}
        containerStyle={{
            marginBottom: 20
        }}>
        
        {children}    
    </Card>
)