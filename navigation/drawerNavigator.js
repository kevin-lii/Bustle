import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'

import Invites from '../screens/Page/Invites'
import Profile from '../screens/Detail/Profile'

import TabNavigator from './tabNavigator'

const Dashboard = createStackNavigator({
    TabNavigator
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerRight: (
                <Text style={{ paddingRight: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} >Menu</Text>
            )
        }
    },
    navigationOptions: {
        //custom header
    }
})

export default createDrawerNavigator({
    Dashboard,
    Invites,
    Profile
}, {
    drawerPosition: 'right',
    drawerType: 'front',
    overlayColor: 'grey',
    drawerWidth: 200,
    // contentComponent: custom ting
})