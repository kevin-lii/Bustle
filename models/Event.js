import React, { Component } from 'react'
import {getLocation} from '../utils'

import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
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
    constructor(userID, data) {
        now= Date.now()
        if(!data.name)
            throw new Error('Name not provided')

        console.log(userID)
        this.data = data
        this.userID = userID
        this.data.host = userID
        this.data.ended = false
        this.data.invited = [userID]
    }
    
    static async get(filters) {

    }

    async create(events) {
        const store = firestore()
        const geofirestore = new GeoFirestore(store)

        const data = this.data
        data.createdAt = Date.now()
        
        if (data.location) {
            const { lat, lng } = data.location.geometry.location
            data.coordinates = new firestore.GeoPoint(lat,lng)
        } else {
            const loc = await getLocation()
            data.coordinates = new firestore.GeoPoint(loc.coords.latitude,loc.coords.longitude)
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
        const eventRef = await geofirestore.collection('events').add(data)
        console.log("pushed")
        
        //4.denormed update
        events.push(eventRef.id)
        await store.collection('users').doc(this.userID).update({ events: events })
    }
}

EventData.contextType = UserContext