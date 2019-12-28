import React from "react";
import { View } from "react-native";

import HeaderNavigator from "./headerNavigator";
import AddButton from "../components/Buttons/Add";
import AddChoose from "../components/Buttons/AddChoose";
import EventPreview from "../components/MapUI/EventBottomSheet"
import Modal from "react-native-modal";

import CreateEvent from "../components/Form/EventCreate";

import styles from "./styles";

const customRouter = {
  ...HeaderNavigator.router,
  getStateForAction: (action, lastState) => {
    const state = HeaderNavigator.router.getStateForAction(action, lastState)
    state.params = action.params
    return state
  }
}

// Supports opening different forms via AddChoose. Currently only displays event creation form.
export default class CustomNavigator extends React.Component {
  static router = customRouter;
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.navigation.params != null,
      event: this.props.navigation.params ? this.props.navigation.params.preview : {},
      formVisible: false,
      form: -1
    };
  }

  render() {
    const { navigation } = this.props;

    const toggleOverlay = () =>
      this.setState({
        overlay: !this.state.overlay,
        formVisible: !this.state.formVisible
      });

    const closeForm = () =>
      this.setState({ formVisible: false, form: -1, overlay: false });

    const params = navigation.state.params
    const showModal = params != null && params.preview != null

    return (
      <View style={styles.container}>
        <HeaderNavigator navigation={navigation} />

        <Modal
          isVisible={this.state.formVisible}
          style={styles.formContainer}
          onBackdropPress={closeForm}
          coverScreen={false}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          swipeDirection="down"
          onSwipeComplete={toggleOverlay}
          avoidKeyboard={false}>
          <CreateEvent close={closeForm} />
        </Modal>

        <Modal
          isVisible={showModal}
          style={styles.preview}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          coverScreen={false}
          hasBackdrop={false}
          onSwipeComplete={() => navigation.navigate("Map", {})}
          swipeDirection="down">
          <View>{showModal && <EventPreview event={params.preview} />}</View>
        </Modal>

        { (!this.state.formVisible && !showModal) && <AddButton toggleOverlay={toggleOverlay} /> }
      </View>
    );
  }
}

