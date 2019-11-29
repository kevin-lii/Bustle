import React from 'react'
import { Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map() {
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={ {flex:1, borderColor: 'black', borderWidth: 1} }
            initialRegion={{
                latitude: 37.86835,
                longitude: -122.265,
                latitudeDelta: 0.0461,
                longitudeDelta: 0.0211,
                }}
        ></MapView>
    )
}
