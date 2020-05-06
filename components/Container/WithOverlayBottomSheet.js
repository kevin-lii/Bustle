import React, { useRef, forwardRef } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import Modal from "react-native-modal";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import IconButton from "../Buttons/IconButton";
import CircleIconButton from "../Buttons/CircleIconButton";

export default forwardRef(
  ({ children, height, callbackNode, sheetContent }, ref) => {
    const node = callbackNode || new Animated.Value(1);
    return (
      <View style={{ height: "100%", backgroundColor: "#2c2c2f" }}>
        <Animated.View
          style={{
            opacity: Animated.add(0.1, Animated.multiply(node, 0.9)),
          }}
        >
          {children}
        </Animated.View>
        <BottomSheet
          ref={ref}
          snapPoints={[height, 0]}
          initialSnap={1}
          renderContent={() => (
            <View
              style={{
                height,
                width: "100%",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                backgroundColor: "white",
              }}
            >
              {sheetContent}
            </View>
          )}
          // renderHeader={
          //   () => (
          //     <View marginB-10>
          //       <CircleIconButton
          //         icon="arrow-left"
          //         type="MaterialIcons"
          //         size={30}
          //         onPress={() => ref.current.snapTo(1)}/>
          //     </View>
          //   )
          // }
          enabledContentTapInteraction={false}
          callbackNode={node}
          callbackThreshold={0.1}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  handle: {
    width: 100,
    height: 10,
    borderRadius: 15,
  },
});
