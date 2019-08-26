import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'

export default ({source}) => (
    <ImageBackground 
        style={ styles.container } 
        imageStyle={ styles.image }
        source={source}>
    </ImageBackground>
)

const edge = 40

const styles = StyleSheet.create({
    container: {
        height: edge, 
        width: edge, 
        borderRadius: edge/2,
        backgroundColor: 'white'
    },
    image: {
        borderRadius: edge/2,
        borderWidth: .1,
        borderColor: 'black'
    }
})