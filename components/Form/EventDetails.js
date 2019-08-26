import React from 'react'
import { View, Text, TouchableOpacity, Image, ListItem } from 'react-native-ui-lib'
import { ScrollView, FlatList } from 'react-native'

import firestore from '@react-native-firebase/firestore'

import FormCard from '../Window/FormCard'
import TextButton from '../Buttons/TextButton'

export default ({
    setName, 
    setCoordinates, 
    setDescription,
    setOpen,
    setPublic,
    setDate
}) => {

    return (
        <FormCard height={400}>

        </FormCard>
    )
}