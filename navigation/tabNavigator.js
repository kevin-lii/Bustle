import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator, withNavigation } from "react-navigation";
import Icon from 'react-native-vector-icons/Fontisto'

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
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          const iconSize = 20
          if (routeName === 'Feed') {
            return <Icon name={'nav-icon-list'} size={iconSize} color={tintColor} />;
          } else if (routeName === 'Map') {
            return <Icon name={'earth'} size={iconSize} color={tintColor} />;
          } else {
              return <Icon name={'ticket'} size={iconSize} color={tintColor} />;
          }
        },
      }),
    initialRouteName: 'Map'
});