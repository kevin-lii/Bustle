import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

import HeaderNavigator from "./headerNavigator";
import AddButton from "../components/Buttons/Add";
import EventsList from "../components/MapUI/EventsListView";
import EventPreview from "../components/MapUI/EventBottomSheet";
import { navigateEvent } from "../global/utils";

import CreateEvent from "../components/Form/EventCreate";

import styles from "./styles";
import IconToggleSwitch from "../components/Form/IconToggleSwitch";

const customRouter = {
  ...HeaderNavigator.router,
  getStateForAction: (action, lastState) => {
    const state = HeaderNavigator.router.getStateForAction(action, lastState);
    state.params = action.params;
    return state;
  }
};

// Supports opening different forms via AddChoose. Currently only displays event creation form.
export default class CustomNavigator extends React.Component {
  static router = customRouter;
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.navigation.params != null,
      event: this.props.navigation.params
        ? this.props.navigation.params.preview
        : {},
      formVisible: false,
      form: -1,
      showForums: false
    };
  }

  render() {
    const { navigation, ...props } = this.props;
    const toggleOverlay = () =>
      this.setState({
        overlay: !this.state.overlay,
        formVisible: !this.state.formVisible
      });

    const closeForm = () =>
      this.setState({ formVisible: false, form: -1, overlay: false });

    const onSwitchToggle = state => this.setState({ showForums: state });

    const params = navigation.state.params;
    const showEventModal =
      params != null && params.event != null && params.events == null;
    const showEventListModal = params != null && params.events != null;

    return (
      <View style={styles.container}>
        <HeaderNavigator navigation={navigation} {...props} />

        <Modal
          isVisible={this.state.formVisible}
          style={styles.formContainer}
          onBackdropPress={closeForm}
          coverScreen={false}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          swipeDirection="down"
          onSwipeComplete={toggleOverlay}
          onBackButtonPress={toggleOverlay}
          avoidKeyboard={false}
        >
          <CreateEvent close={closeForm} {...props} />
        </Modal>

        {showEventModal ? (
          <EventPreview
            event={params.event}
            navigateTo={({ event, events }) => {
              navigateEvent({
                navigation,
                event,
                events
              });
            }}
            {...props}
          />
        ) : null}

        {showEventListModal ? (
          <EventsList
            show={showEventListModal}
            eventList={params.events}
            navigateTo={({ event, events }) => {
              navigateEvent({
                navigation,
                event,
                events
              });
            }}
            {...props}
          />
        ) : null}
        {!this.state.formVisible && !showEventModal && !showEventListModal && (
          <View style={styles.buttons}>
            <AddButton toggleOverlay={toggleOverlay} />
            <View style={{ marginTop: 10 }}>
              <IconToggleSwitch
                onToggle={onSwitchToggle}
                isOn={this.state.showForums}
                icon="map"
                offIcon="comments"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}
