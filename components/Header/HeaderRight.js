import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native'

import IconImage from '../Image/IconImage'

import { UserContext } from '../../dataContainers/context'

export default function HeaderRight({ navigation }) {
    const margin = 30
    
    return (
        <TouchableOpacity onPress={() => navigation.openDrawer()}
            style={{
                marginTop: margin,
                marginRight: margin,
            }}>
            <UserContext.Consumer>
                {user => (
                    <IconImage source={{uri: user ? user.photoURL : ''}} />
                )}
            </UserContext.Consumer>
        </TouchableOpacity>
    )
}

