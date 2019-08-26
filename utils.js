import firestore from '@react-native-firebase/firestore'

exports.categories = ['Social', 'Dining', 'Drinks', 'Business', 'Athletic', 'Learn', 'Spiritual', 'Service'] 

exports.createChat = async function() {
    firestore().collection('chats').doc('{messages: []}')
}