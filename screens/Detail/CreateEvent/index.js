import React, { useState } from 'react'
import { View, Text, Card } from 'react-native-ui-lib'
import moment from 'moment'

import CategoryForm from '../../../components/Form/Category'
import HostChooseForm from '../../../components/Form/HostChoose'
import EventDetailsForm from '../../../components/Form/EventDetails'
import { setState } from 'expect/build/jestMatchersObject';

import { UserContext } from '../../../dataContainers/context'

export default function CreateEvent({ generateEvent, close }) {
    const [stage, setStage] = useState(3)

    const [category, setCategory] = useState('Social')

    const [type, setType] = useState('INDIVIDUAL')
    const [host, setHost] = useState()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState()
    const [open, setOpen] = useState(true)
    const [isPrivate, setPrivate] = useState(false)
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [location, setLocation] = useState()
    

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
            Private: isPrivate,
            active: date <= Date.now(),
            host,
            
        })
    }

    const goBack = () => setStage(stage-1)

    let content
    switch (stage) {
        case 1:
            content = <CategoryForm submitCategory={submitCategory} category={category} headerAction={close}/>
            break;

        case 2:
            content = <HostChooseForm submitHost={submitHost} headerAction={goBack}/>
            break;

        case 3:
            content = <EventDetailsForm name={name} setName={setName} open={open} isPrivate={isPrivate}
                        description={description} setDescription={setDescription} setOpen={setOpen} 
                        setPrivate={setPrivate} date={date} setDate={setDate} time={time} setTime={setTime} 
                        submit={submitForm} location={location} setLocation={setLocation} close={close} 
                        headerAction={goBack} image={image} setImage={setImage}/>
            break;
    
        default:
            content = <View></View>
            break;
    }

    return (content)
}