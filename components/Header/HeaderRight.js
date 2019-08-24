import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native'

import { UserContext } from '../../dataContainers/context'

export default function HeaderRight({ navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <UserContext.Consumer>
                {user => (
                    <ImageBackground 
                        style={ styles.container } 
                        imageStyle={ styles.image }
                        source={{uri:user.photoURL}}>

                    </ImageBackground>
                )}
            </UserContext.Consumer>
        </TouchableOpacity>
    )
}

const edge = 40
const margin = 30

const styles = StyleSheet.create({
    container: {
        height: edge, 
        width: edge, 
        borderRadius: edge/2,
        marginTop: margin,
        marginRight: margin,
        backgroundColor: 'white'
    },
    image: {
        borderRadius: edge/2,
        borderWidth: 1,
        borderColor: 'black'
    }
})