import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import Login from '../screens/Page/Login'
import Loading from '../components/Loading'
import Main from '../navigation'

import { UserContext } from './context' 

export default function AuthContainer() {
    // Set an initilizing state whilst Firebase connects
    const [initilizing, setInitilizing] = useState(true);
    const [user, setUser] = useState();
    const [userProfile, setUserProfile] = useState();
    
    // Handle user state changes
    async function onAuthStateChanged(user) {
        setUser(user);
        const profile = await firestore()
            .collection('users')
            .doc(user.uid)
            .get()
        setUserProfile(profile.data())
        if (initilizing) setInitilizing(false);
    }
    
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    
    if (initilizing) return <Loading />;
    
    if (!user) return <Login />
    
    const unsubscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(userProfile => {
            setUserProfile(userProfile.data())
        });

    return (
        <UserContext.Provider value={userProfile}>
            <Main />
        </UserContext.Provider>
    );
}