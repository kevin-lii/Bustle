import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createStackNavigator, withNavigation } from 'react-navigation'

import TabNavigator from './tabNavigator'

import { UserContext } from '../dataContainers/context'

import HeaderLeft from '../components/Header/HeaderLeft'
import HeaderRight from '../components/Header/HeaderRight'

export default createStackNavigator({
    TabNavigator
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerLeft: <HeaderLeft />,
            headerRight: <HeaderRight navigation={navigation} />,
            headerTransparent: true
        }
    }
})