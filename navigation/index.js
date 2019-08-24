import React from 'react'
import { Alert, View, Text, TouchableOpacity } from 'react-native'
import { createAppContainer } from "react-navigation";

import DrawerNavigator from './drawerNavigator'

export default createAppContainer(DrawerNavigator);