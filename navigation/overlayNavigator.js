import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

import HeaderNavigator from "./headerNavigator";
import AddButton from "../components/Buttons/Add";
import AddChoose from "../components/Buttons/AddChoose";

import CreateEvent from "../components/Form/EventCreate";

import styles from "./styles";

// Supports opening different forms via AddChoose. Currently only displays event creation form.
export default class CustomNavigator extends React.Component {
  static router = HeaderNavigator.router;
  constructor(props) {
    super(props);
    this.state = {
      overlay: false,
      buttonVisible: true,
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
    const openForm = id => this.setState({ formVisible: true, form: id });
    const closeForm = () =>
      this.setState({ formVisible: false, form: -1, overlay: false });

    let content;
    if (this.state.formVisible)
      content = (
        <View style={styles.formContainer} pointerEvents={"box-none"}>
          <CreateEvent close={closeForm} />
        </View>
      );
    else content = <AddButton toggleOverlay={toggleOverlay} />;

    return (
      <View style={styles.container}>
        <HeaderNavigator navigation={navigation} />

        {/* Grey overlay */}
        <TouchableWithoutFeedback onPress={toggleOverlay}>
          <View
            style={this.state.overlay ? styles.translucent : styles.clear}
          ></View>
        </TouchableWithoutFeedback>

        {content}
      </View>
    );
  }
}
