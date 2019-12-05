import React, { Component } from 'react'
import {getLocation} from '../utils'

import storage from '@react-native-firebase/storage'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { GeoFirestore } from 'geofirestore'

import { UserContext } from '../dataContainers/context'

// Event Class: 
// {
//     category: one of ['Social', 'Dining', 'Drinks', 'Athletic', 'Learn', 'Business', 'Spiritual', 'Service']


//     host: firebase doc id

//     name: string
//     description: string, optional
//     image: null, { path, width, height, data, cropRect } https://github.com/ivpusic/react-native-image-crop-picker#readme
//     open: boolean
//     private: boolean

//     date: date object, null
//     time: date object containing time, null
//     location: Google Place Details, null 

//     active: boolean
    // invited: [uid]
    // coordinates 
    // photoURL
// }

export default class EventData {
    constructor() {

    }
    
    static async get(filters, func) {
        const store = firestore()
        const geofirestore = new GeoFirestore(store)
        // const query = store.collection('events').orderBy('g').startAt(5)
        const query = geofirestore.collection('events')
        query.onSnapshot(func)
    }

    static async create(userID, data, events) {
        if(!data.name)
            throw new Error('Name not provided')

        const store = firestore()
        const geofirestore = new GeoFirestore(store)
        // const geo = geofirex.init(firebase())

        const now = new Date()
        data.createdAt = now
        data.date = data.date || now
        data.time = data.time || now

        data.host = userID
        data.ended = false
        data.invited = [userID]
        
        if (data.location) {
            const { lat, lng } = data.location.geometry.location
            data.coordinates = new firestore.GeoPoint(lat,lng)
            // data.position = geo.point(lat,lng)
        } else {
            const loc = await getLocation()
            data.coordinates = new firestore.GeoPoint(loc.coords.latitude,loc.coords.longitude)
            // data.position = geo.point(loc.coords.latitude,loc.coords.longitude)
        }
        
        
        //1. create chat
        const chat = await store.collection('chats').add({ createdAt: new Date() })
        data.chatID = chat.id
        console.log("chat created")

        
        //2. upload image
        if (data.image) {
            const ref = storage().ref(data.type + "/" + data.host)
            const image = await ref.putFile(data.image.path)
            data.photoURL = image.fullPath
            delete data.image
        } else {
            data.photoURL = ''
        }

        //3.upload event
        const eventRef = await store.collection('events').add(data)
        console.log("pushed")
        
        //4.denormed update
        events.push(eventRef.id)
        await store.collection('users').doc(userID).update({ events: events })
    }
}

EventData.contextType = UserContext