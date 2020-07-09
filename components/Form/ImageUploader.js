import React from "react";
import { Text } from "react-native-ui-lib";
import ImagePicker from "react-native-image-picker";
import {
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { Theme } from "../../global/constants";

export default ({
  onImageSubmit,
  uri,
  height = 120,
  width = "100%",
  borderRadius,
}) => {
  const pickImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Select Image",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      },
      (response) => {
        if (response.didCancel) console.log("Canceled");
        else if (response.error) Alert.alert("Error", response.error);
        else onImageSubmit(response);
      }
    );
  };

  return (
    <TouchableOpacity
      style={{ ...styles.container, height, borderRadius, width }}
      onPress={pickImage}
    >
      <ImageBackground
        source={uri ? { uri } : null}
        style={styles.image}
        imageStyle={{ borderRadius }}
      >
        {!uri && (
          <Text color={Theme.grey} text40 center>
            Add an Image
          </Text>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.disabled,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
