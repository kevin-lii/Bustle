import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, ListItem, TextField } from 'react-native-ui-lib'
import { Alert, ScrollView, TouchableWithoutFeedback } from 'react-native'

import FormCard from '../Window/FormCard'
import FormGroup from './FormGroup'
import FormHeader from './FormHeader'
import TextButton from '../Buttons/TextButton'
import styles from './styles';
import { Theme } from '../../constants'

import EventData from '../../models/Event'
import { UserContext } from '../../dataContainers/context'

export default class EventCreate extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props)
        
        this.state = {
            overlayContent: false,
            name: '',
            description: '',
            date: null,
            time: null,
            location: null,
            category: 'Social',
            open: true,
            isPrivate: false,
            image: null
        }
    }

    render() {
        console.log(this.context)

        const submit = async () => {
            console.log(this.context.uid)
            try {
                const stateCopy = Object.assign({}, this.state);
                delete stateCopy.overlayContent
                await (new EventData(this.context.uid, stateCopy)).create(this.context.events)
            } catch (e) {
                console.log(e)
                Alert.alert('Error', e.message)
            }
        }        

        const validateSubmission = () => {
            submit()
        }

        setOverlayContent = content => this.setState({ overlayContent: content })

        const Overlay = ({children}) => (
            <View center style={styles.formOverlay}>
                <TouchableWithoutFeedback onPress={() => setOverlayContent(false)}>
                    <View style={{position: 'absolute', width: '100%', height: '100%'}}></View>
                </TouchableWithoutFeedback>
                {children}
            </View>
        )

        let imgText
        if (this.state.image) {
            const strStart = this.state.image.path.lastIndexOf('/') + 1
            imgText = this.state.image.path.substring(strStart, strStart + 15) + '...'
        } else {
            imgText = 'Add Image'
        }

        return (
            <FormCard height={500}>
                <FormHeader icon='close-a' title='Create Event' onPress={this.props.close} 
                    headerRight={<TextButton text={'Create'} onPress={validateSubmission} primary/>} />
                <ScrollView style={{
                    paddingLeft: 15,
                    paddingRight: 15}}>
                    <TextField
                        value={this.state.name}
                        onChangeText={ text => this.setState({ name: text }) }
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
                    
                    <FormGroup type='date' label='Date' value={this.state.date} 
                        setValue={d => this.setState({ date: d })} overlay={setOverlayContent}/>

                    <FormGroup type='clock' label='Time' value={this.state.time} 
                        setValue={t => this.setState({ time: t })} overlay={setOverlayContent}/>

                    <FormGroup type='map-marker-alt' label='Location' value={this.state.location} 
                        setValue={l => this.setState({ location: l })} overlay={setOverlayContent}/>
                    
                    
                    <FormGroup type='user-secret' label='Type' value={this.state.isPrivate} 
                        setValue={p => this.setState({ isPrivate: p })} />
                    
                    {this.state.isPrivate && 
                        <FormGroup type='shield' label={'Open Invite'} value={this.state.open}
                            setValue={o => this.setState({ open: o })} />}

                    <View style={{height: 15}}></View>
                    <TextButton text={imgText} style={styles.imgButton}/>
                    <View style={{height: 15}}></View>

                    <TextField
                        value={this.state.description}
                        containerStyle={{}}
                        floatingPlaceholder
                        placeholder="Description"
                        multiline
                        floatOnFocus
                        onChangeText={ text =>this.setState({ description: text }) }
                        color={Theme.primary}
                        floatingPlaceholderColor={Theme.primary}
                        underlineColor={Theme.primary}
                        />
                </ScrollView>
                {this.state.overlayContent && <Overlay>{this.state.overlayContent}</Overlay>}
            </FormCard>
        )
    }
}

