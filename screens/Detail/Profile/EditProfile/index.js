import React from "react";
import { Text } from "react-native";

export default function Profile({ navigation }) {
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
        else {
          this.setState({ image: response.uri });
        }
      }
    );
  };
  return <Text>Edit Profile</Text>;
}
