import React from 'react'
import { Card, View, Text, TouchableOpacity } from 'react-native-ui-lib'

import FormCard from '../Window/FormCard'
import FormHeader from './FormHeader'
import CategoryButton from '../Buttons/Category'

import styles from './styles'

export default function({ category, submitCategory, headerAction }) {
    
    return (
        <FormCard height={200} padded>
            <FormHeader icon='close' title='Choose Category' onPress={headerAction} />
            <View flex row spread centerV style={styles.buttonRow}>
                <CategoryButton category='Social' submitCategory={submitCategory} current={category} />
                <CategoryButton category='Dining' submitCategory={submitCategory} current={category} />
                <CategoryButton category='Drinks' submitCategory={submitCategory} current={category} />
                <CategoryButton category='Athletic' submitCategory={submitCategory} current={category}/>
            </View>
            <View flex row spread centerV style={styles.buttonRow}> 
                <CategoryButton category='Learn' submitCategory={submitCategory} current={category}/>
                <CategoryButton category='Business' submitCategory={submitCategory} current={category} />
                <CategoryButton category='Spiritual' submitCategory={submitCategory} current={category} />
                <CategoryButton category='Service' submitCategory={submitCategory} current={category}/>
            </View>
        </FormCard>
    )
}
