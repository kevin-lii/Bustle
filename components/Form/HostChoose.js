import React from 'react'
import { View, Text, TouchableOpacity, Image, ListItem } from 'react-native-ui-lib'
import { ScrollView, FlatList } from 'react-native'

import firestore from '@react-native-firebase/firestore'

import FormCard from '../Window/FormCard'
import IconImage from '../../components/Image/IconImage'
import { UserContext } from '../../dataContainers/context'

import styles from './styles'

const ChooseListItem = function({ imgSource, text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} flex row centerV>
            <IconImage source={imgSource} />
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}


export default class HostChoose extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props)
    }

    render() {
        const content = []
        const user = this.context
        const submitHost = this.props.submitHost

        if (!user.groups || user.groups.length < 1) {
            content.push(<Text key={''}>Create groups or become a group~{"\n"} admin to post as a group!</Text>)
        } else {
            user.groups.foreach(groupId => {
                firestore().collection('groups').doc(groupId).get()
                .then(group => {
                    content.push(<ChooseListItem 
                        key={group.uri}
                        source={{uri: group.photoURL || ''}} 
                        text={group.name}
                        onPress={() => submitHost(groupId, group.type)}/>)
                });
                
            })
        }

        return (
            <View>                
                <FormCard height={100}>
                    <View row center style={styles.formTitle}><Text>Choose Host</Text></View>
                    <ChooseListItem 
                        imgSource={{uri: user.photoURL || ''}}
                        text={user.displayName}
                        onPress={() => submitHost(user.uid, 'INDIVIDUAL')}
                        />
                </FormCard>
                <FormCard height={200}>
                    <View row center style={styles.formTitle}><Text>Host as a group</Text></View>
                    <ScrollView style={{ backgroundColor: 'blue'}}>
                        <FlatList style={{ position: 'absolute', width:'100%', height:'100%', backgroundColor: 'red'}}>
                            <Text>Yeet</Text>
                            {content}
                        </FlatList>
                    </ScrollView>
                </FormCard>
            </View>
        )
    }
}