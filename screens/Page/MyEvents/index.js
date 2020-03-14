// import React from "react";
// import { View, Text, ScrollView, SafeAreaView } from "react-native";
// import { withNavigation } from "react-navigation";
// import Modal from "react-native-modal";

// import Icons from "../../../components/Image/Icons";
// import EventDetail from "../../../components/Window/EventDetailCard";
// import { UserContext } from "../../../dataContainers/context";
// import EditEvent from "../../../components/Form/EventCreate";

// import styles from "./styles";

// class MyEvents extends React.Component {
//   static contextType = UserContext;
//   state = {
//     hostedEvents: this.context.hostedEvents,
//     editEvent: null
//   };

//   componentDidMount() {
//     this.props.navigation.addListener("willFocus", () => {
//       this.setState({ hostedEvents: this.context.hostedEvents });
//     });
//   }

//   render() {
//     const { navigation, ...props } = this.props;
//     const changeContext = eventID => {
//       this.context.updateJoinedEvents(
//         this.context.events.filter(item => item !== eventID)
//       );
//       this.setState({ hostedEvents: this.context.hostedEvents });
//     };

//     const updateContext = () => {
//       this.setState({ hostedEvents: this.context.hostedEvents });
//     }

//     const toggleEditEvent = event => {
//       this.setState({ editEvent: event });
//     }
//     let events;
//     if (this.state.hostedEvents.length > 0)
//       events = this.state.hostedEvents.map((event, index) => (
//         <EventDetail
//           key={index}
//           event={event}
//           navigation={navigation}
//           map
//           edit={toggleEditEvent}
//           trash
//           changeContext={changeContext}
//           {...props}
//         />
//       ));
//     else events = <Text>You have not hosted any events.</Text>;
//     return (
//       <SafeAreaView style={styles.container}>
//         <ScrollView showsVerticalScrollIndicator={false} style={styles.scollView}>
//           <View
//             style={{
//               alignSelf: "flex-end",
//               marginRight: 25,
//               marginTop: 20
//             }}
//           >
//             <Icons
//               icon="close-a"
//               type="Fontisto"
//               size={25}
//               onPress={() => navigation.goBack(null)}
//             />
//           </View>
//           <Text style={styles.title}>My Events</Text>
//           {events}
//         </ScrollView>
//         <Modal
//           isVisible={this.state.editEvent}
//           style={styles.formContainer}
//           onBackdropPress={() => toggleEditEvent(false)}
//           animationIn="slideInUp"
//           animationOut="slideOutDown"
//           swipeDirection="down"
//           onSwipeComplete={() => toggleEditEvent(false)}
//           onBackButtonPress={() => toggleEditEvent(false)}
//           avoidKeyboard={false}
//         >
//           <EditEvent close={() => toggleEditEvent(false)} event={this.state.editEvent} update={updateContext} {...props} />
//         </Modal>
//       </SafeAreaView>
//     );
//   }
// }

// export default withNavigation(MyEvents);
