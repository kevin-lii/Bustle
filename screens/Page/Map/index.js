import React from 'react'
import { Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map() {
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={ {flex:1, borderColor: 'black', borderWidth: 1} }
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
        ></MapView>
    )
}
