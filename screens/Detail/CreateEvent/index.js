import React, { useState } from 'react'
import { View, Text, Card } from 'react-native-ui-lib'
import moment from 'moment'

import CategoryForm from '../../../components/Form/Category'
import HostChooseForm from '../../../components/Form/HostChoose'
import EventDetailsForm from '../../../components/Form/EventDetails'
import { setState } from 'expect/build/jestMatchersObject';

import { UserContext } from '../../../dataContainers/context'

export default function CreateEvent({ generateEvent }) {
    const [stage, setStage] = useState(1)

    const [category, setCategory] = useState('Social')

    const [type, setType] = useState(1)
    const [host, setHost] = useState()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [open, setOpen] = useState(true)
    const [isPublic, setPublic] = useState(true)
    const [date, setDate] = useState(Date.now())
    const [coordinates, setCoordinates] = useState()
    

    const submitCategory = (category) => {
        setCategory(category)
        setStage(stage+1)
    }

    const submitHost = (hostId, type) => {
        setHost(hostId)
        setType(type)
        setStage(stage+1)
    }

    const submitForm = () => {
        generateEvent({
            name,
            description,
            type,
            category,
            open,
            public: isPublic,
            active: date <= Date.now(),
            host,
            
        })
    }

    let content
    switch (stage) {
        case 1:
            content = <CategoryForm submitCategory={submitCategory} category={category}/>
            break;

        case 2:
            content = <HostChooseForm submitHost={submitHost}/>
            break;

        case 3:
            content = <EventDetailsForm setName={setName} setCoordinates={setCoordinates}
                        setDescription={setDescription} setOpen={setOpen} setPublic={setPublic}
                        setDate={setDate}/>
            break;
    
        default:
            content = <View></View>
            break;
    }

    return (content)
}