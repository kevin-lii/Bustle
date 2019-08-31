import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { View } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/Fontisto'

export default function Loading() {

    return (
        <View flex center><Icon name="spinner-fidget" size={100}/></View>
    )
}
