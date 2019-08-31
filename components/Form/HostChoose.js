import React from 'react'
import { View, Text, TouchableOpacity, Image, ListItem } from 'react-native-ui-lib'
import { ScrollView, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'

import firestore from '@react-native-firebase/firestore'

import FormCard from '../Window/FormCard'
import FormHeader from './FormHeader'
import IconImage from '../../components/Image/IconImage'
import { UserContext } from '../../dataContainers/context'

import styles from './styles'

const ChooseListItem = function({ item }) {
    return (
        <View style={{
            height: 50,
            borderTopColor: '#FFA45B',
            borderBottomColor: '#FFA45B',
            borderWidth: .5,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent'
            }}>
        <TouchableOpacity onPress={item.onPress} flex row centerV spread style={styles.listItem} >
            <IconImage source={item.imgSource} />
            <Text>{item.text}</Text>
            <Icon name='angle-right' size={15}/>
        </TouchableOpacity>
        </View>
    )
}


export default class HostChoose extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props)
    }

    render() {
        let content
        const user = this.context
        const { submitHost, headerAction } = this.props

        const userItem = {
            imgSource: {uri: user.photoURL || ''},
            text: user.displayName,
            onPress: () => submitHost(user.uid, 'INDIVIDUAL')
        }

        if (!user.groups || user.groups.length < 1) {
        // if(false) {
            content = (
                <View flex center style={styles.fillerText}>
                    <Text key={''} center>Create groups or become a group{"\n"} admin to post as a group!</Text>
                </View>
            )
        } else {
            const list = []
            user.groups.foreach(groupId => {
                firestore().collection('groups').doc(groupId).get()
                .then(group => {
                    list.push({
                        key: group.uid,
                        source: {uri: group.photoURL || ''},
                        text: group.name,
                        onPress: () => submitHost(groupId, group.type)
                    })

                    content = (
                        <FlatList 
                            style={{ flex: 1, backgroundColor: 'red'}}
                            data={list}
                            renderItem={ChooseListItem}
                        />)
                });
                
            })
        }

        return (
            <View>                
                <FormCard height={400}>
                    <FormHeader icon='angle-left' title='Choose a Host' onPress={headerAction} />
                    <View style={{paddingBottom: 15}}><ChooseListItem item={userItem}/></View>
                    {/* <View>line</View> */}
                    <View row center style={styles.formTitle}><Text>Host as a group</Text></View>
                    <ScrollView>
                        {/* {content} */}
                        <FlatList 
                            style={{ flex:1 }}
                            data={[{
                                key: 'f',
                                imgSource: {uri: user.photoURL || ''},
                                text: user.displayName,
                                onPress: () => submitHost(user.uid, 'INDIVIDUAL')
                            }, {
                                key: 'g',
                                imgSource: {uri: user.photoURL || ''},
                                text: user.displayName,
                                onPress: () => submitHost(user.uid, 'INDIVIDUAL')
                            }]}
                            renderItem={ChooseListItem}
                        />
                    </ScrollView>
                </FormCard>
            </View>
        )
    }
}