import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import HeaderNavigator from './headerNavigator'
import AddButton from '../components/Buttons/Add'
import AddChoose from '../components/Buttons/AddChoose'

import CreateEvent from '../dataContainers/CreateEventContainer'

import styles from './styles'

export default class CustomNavigator extends React.Component {
    static router = HeaderNavigator.router;
    constructor(props) {
        super(props)
        this.state = { 
            overlay: false,
            buttonVisible: true,
            eventFromVisible: false,
            groupFormVisible: false
        }
    }

    render() {
        const { navigation } = this.props;

        const toggleOverlay = () => this.setState({ 
            overlay: !this.state.overlay,
            eventFormVisible: false,
            groupFormVisible: false
        })
        const openGroupForm = () => this.setState({ groupFormVisible: true })
        const openEventForm = () => this.setState({ eventFormVisible: true })
        const closeForm = () => this.setState({
            eventFormVisible: false,
            groupFormVisible: false
        })

        const buttons = !this.state.overlay ? (
                <AddButton toggleOverlay={toggleOverlay} />
            ) : (
                <AddChoose buttonVisible openEventForm={openEventForm} openGroupForm={openGroupForm}/>
            )

        let content
        if(this.state.eventFormVisible)
        // if(true)
            content = (
                <View style={ styles.formContainer } pointerEvents={'box-none'}>
                    <CreateEvent/>
                </View>)
        else if (this.state.groupFormVisible)
            content = (
                <View style={ styles.formContainer } pointerEvents={'box-none'}>
                    <Text>Group Form</Text>
                </View>)
        else
            content = buttons

        return (
            <View style={styles.container}>
                <HeaderNavigator navigation={navigation} />

                {/* Grey overlay */}
                <TouchableWithoutFeedback onPress={ toggleOverlay }>
                        <View style={ this.state.overlay ? styles.translucent : styles.clear }></View>
                </TouchableWithoutFeedback>
                
                {content}
            </View>
        );
    }
}