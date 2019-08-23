import React from 'react'
import { Alert, View, Text, TouchableOpacity } from 'react-native'
import {
    createSwitchNavigator,
    createAppContainer 
} from "react-navigation";

import Login from '../screens/Page/Login'

import DrawerNavigator from './drawerNavigator'

const LoginGate = createSwitchNavigator({
    Login,
    Main: DrawerNavigator,
})

export default createAppContainer(DrawerNavigator);