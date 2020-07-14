import React, { Component, createRef } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text, View } from "react-native-ui-lib";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

export default class WithOverlayBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.node = this.props.callbackNode || new Animated.Value(1);
    this.bs = createRef();

    this.state = { open: false };

    this.openSheet = this.openSheet.bind(this);
    this.closeSheet = this.closeSheet.bind(this);
    this.toggleSheet = this.toggleSheet.bind(this);
  }

  openSheet() {
    this.bs.current.snapTo(0);
    this.bs.current.snapTo(0);
  }

  closeSheet() {
    this.bs.current.snapTo(1);
    this.bs.current.snapTo(1);
  }

  toggleSheet() {
    this.bs.current.snapTo(this.state.open ? 0 : 1);
    this.bs.current.snapTo(this.state.open ? 0 : 1);
    this.setState({ open: !this.state.open });
  }

  componentDidUpdate() {
    if (this.props.sheetContent) this.openSheet();
    else this.closeSheet();
  }

  componentDidMount() {
    if (this.props.sheetContent) this.openSheet();
    else this.closeSheet();
  }

  render() {
    const { navigation, children, height, sheetContent } = this.props;

    return (
      <View style={{ height: "100%" }}>
        {children}
        {Boolean(sheetContent) && (
          <>
            <Animated.View
              style={{
                ...styles.overlay,
                backgroundColor: "#2c2c2f",
                opacity: Animated.sub(0.5, Animated.multiply(this.node, 0.9)),
              }}
              pointerEvents="none"
            />
            <TouchableWithoutFeedback onPress={navigation.goBack}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
          </>
        )}
        <BottomSheet
          ref={this.bs}
          snapPoints={[height, 0]}
          initialSnap={1}
          renderContent={() => (
            <View style={{ ...styles.card, height }}>{sheetContent}</View>
          )}
          enabledContentTapInteraction={false}
          callbackNode={this.node}
          callbackThreshold={0.1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
    padding: 10,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
  },
  handle: {
    width: 100,
    height: 10,
    borderRadius: 15,
  },
});
