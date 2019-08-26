import React from 'react'
import { Card, Text } from 'react-native-ui-lib';

export default function Feed() {
    return (
        <Card
            row // control the children flow direction
            borderRadius={12}
            height={150}
            containerStyle={{marginRight: 20}}
            enableShadow={true} >
            <Text>Feed</Text>
        </Card>
    )
}
