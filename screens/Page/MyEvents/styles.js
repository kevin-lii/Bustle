import { StyleSheet } from 'react-native'

import { Theme } from '../../../constants';

export default StyleSheet.create({
    container: {
        marginLeft: Theme.margin,
        marginRight: Theme.margin,
        display: "flex",
        height: "100%"
    },
    title: {
        color: Theme.primary,
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 30,
        marginLeft: 2
    },
    iconContainer: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    closeContainer: {
        width: 40,
        height: "100%",
        right: 0
    }
})