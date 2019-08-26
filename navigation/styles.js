import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    // HEADER
    container: {
        flex: 1
    },
    translucent: {
        position: 'absolute',
        opacity: .9,
        backgroundColor: 'grey',
        flex: 1,
        height: '100%',
        width: '100%'
    },
    clear: {
        flex: 0
    },
    formContainer: {
        position:'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        bottom: 0
    }
})