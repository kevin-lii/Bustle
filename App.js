/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';

import {ThemeManager} from 'react-native-ui-lib'

import AuthContainer from './dataContainers/AuthContainer'

export default () => {
    return (
      <AuthContainer />
    )
}