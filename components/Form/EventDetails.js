import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, ListItem, TextField } from 'react-native-ui-lib'
import {ScrollView} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';

import FormCard from '../Window/FormCard'
import FormGroup from './FormGroup'
import FormHeader from './FormHeader'
import TextButton from '../Buttons/TextButton'
import styles from './styles';
import { Theme } from '../../constants'

export default ({
    name,
    setName,
    location,
    setLocation,
    description,
    setDescription,
    image,
    setImage,
    open,
    setOpen,
    isPrivate,
    setPrivate,
    date,
    setDate,
    time,
    setTime,
    submit,
    headerAction
}) => {
    const [overlayContent, setOverlayContent] = useState(false)

    const Overlay = ({children}) => (
        <View center style={styles.formOverlay}>
            <TouchableWithoutFeedback onPress={() => setOverlayContent(false)}>
                <View style={{position: 'absolute', width: '100%', height: '100%'}}></View>
            </TouchableWithoutFeedback>
            {children}
        </View>
    )

    

    const validateSubmission = () => {

        submit()
    }

    return (
        <FormCard height={500}>
        <ScrollView style={{
            paddingLeft: 15,
            paddingRight: 15}}>
            <FormHeader icon='angle-left' title='Create Event' onPress={headerAction} 
                headerRight={<TextButton text={'Create'} onPress={validateSubmission} primary/>} />
            <TextField
                value={name}
                onChangeText={ text => setName(text) }
                containerStyle={{}}
                floatingPlaceholder
                placeholder="Title"
                validate={'required'}
                errorMessage={'Required field!'}
                floatOnFocus
                color={Theme.primary}
                floatingPlaceholderColor={Theme.primary}
                underlineColor={Theme.primary}
                />
            <View style={{height: 15}}></View>
            <TextButton text={image ? image.uri : 'Add Image'} onPress={() => {}} style={styles.imgButton}/>
            {/* Image picker */}
            <View style={{height: 15}}></View>
            <FormGroup type='date' label='Date' value={date} setValue={setDate} overlay={setOverlayContent}/>
            <FormGroup type='clock' label='Time' value={time} setValue={setTime} overlay={setOverlayContent}/>
            <FormGroup type='map-marker-alt' label='Location' value={location} setValue={setLocation} overlay={setOverlayContent}/>
            <FormGroup type='user-secret' label='Type' value={isPrivate} setValue={setPrivate} />
            {isPrivate && 
                <FormGroup type='shield' label={'Open Invite'} value={open} setValue={setOpen} />}
            <TextField
                value={description}
                containerStyle={{}}
                floatingPlaceholder
                placeholder="Description"
                multiline
                floatOnFocus
                onChangeText={ text => setDescription(text) }
                color={Theme.primary}
                floatingPlaceholderColor={Theme.primary}
                underlineColor={Theme.primary}
                />
            </ScrollView>
            {overlayContent && <Overlay>{overlayContent}</Overlay>}
        </FormCard>
    )
}