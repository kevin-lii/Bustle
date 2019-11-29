import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator, withNavigation } from "react-navigation";

import Feed from '../screens/Page/Feed'
import Map from '../screens/Page/Map'
import EventList from '../screens/Page/EventList'
import GroupList from '../screens/Page/GroupList'
import ChatList from '../screens/Page/ChatList'

export default createBottomTabNavigator({
    Feed,
    Map,
    Events: EventList
},
{
    initialRouteName: 'Map'
});