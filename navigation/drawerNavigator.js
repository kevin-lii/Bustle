import React from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerItems, SafeAreaView, withNavigation } from 'react-navigation'
import auth from '@react-native-firebase/auth'

import Invites from '../screens/Page/Invites'
import Profile from '../screens/Detail/Profile'

import OverlayNavigator from './overlayNavigator'

const CustomDrawerContentComponent = props => (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
        <TouchableOpacity onPress={async () => await auth().signOut()}>
            <Text>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
);

export default createDrawerNavigator({
    Dashboard: OverlayNavigator,
    Invites,
    Profile
}, {
    drawerPosition: 'right',
    drawerType: 'front',
    overlayColor: 'grey',
    drawerWidth: 200,
    contentComponent: CustomDrawerContentComponent
})

