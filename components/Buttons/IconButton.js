import React from 'react'
import { TouchableNativeFeedback, View } from 'react-native'

import Icons from '../Image/Icons'
import { Theme } from '../../constants'

const iconContainer = {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
}

export default ({ size, icon, color, onPress }) => (
    <TouchableNativeFeedback onPress={onPress}>
        <View style={iconContainer}>
            <Icons 
                type={Theme.icon}
                size={size || 30}
                icon={icon}
                color={color || Theme.primary}/>
        </View>
    </TouchableNativeFeedback>
)

