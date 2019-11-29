import { Alert } from 'react-native'

import firestore from '@react-native-firebase/firestore'
import Permissions from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

exports.categories = ['Social', 'Dining', 'Drinks', 'Business', 'Athletic', 'Learn', 'Spiritual', 'Service'] 

exports.createChat = async function() {
    firestore().collection('chats').doc('{messages: []}')
}

exports.getLocation = async function() {
    let locationPermission = await Permissions.check('location')
    if(locationPermission == 'undetermined')
        locationPermission = await Permissions.request('location')
    
    if(locationPermission != 'authorized')
        return Alert.alert('Enable Location', 'Please enable location permissions in app settings to continue')

    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
        position => resolve(position), 
        err => reject(err),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
    })
}