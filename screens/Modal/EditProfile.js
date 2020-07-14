import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TextField } from "react-native-ui-lib";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
import _ from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FormHeader from "./components/FormHeader";

import Icons from "../../components/Image/Icons";
import ImageUploader from "../../components/Form/ImageUploader";
import UserData from "../../models/User";
import ActionButton from "../../components/Buttons/ActionButton";
import GradePicker from "../../components/Form/GradePicker";

import { Theme } from "../../global/constants";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: { uri: props.user?.photoURL ? props.user.photoURL : "" },
      coverImage: {
        uri: props.user?.coverPhotoURL ? props.user.coverPhotoURL : "",
      },
      major: props.user?.major ? props.user.major : "",
      year: props.user?.year ? props.user.year : "",
      bio: props.user?.bio ? props.user.bio : "",
      // hobbies: props.user.hobbies,
      instagram: props.user?.instagram ? props.user.instagram : "",
      twitter: props.user?.twitter ? props.user.twitter : "",
      // facebook: props.user.facebook,
      snapchat: props.user?.snapchat ? props.user.snapchat : "",
      linkedin: props.user?.linkedin ? props.user.linkedin : "",
    };
  }
  async update() {
    const stateCopy = _.pickBy(this.state);
    this.props.navigation.goBack();
    return await UserData.update(stateCopy, {});
  }
  linkedRef = React.createRef();
  render() {
    const { navigation } = this.props;
    const iconSize = 25;
    return (
      <SafeAreaView
        style={{ flex: 1, paddingBottom: 10, backgroundColor: "white" }}
      >
        <FormHeader
          onClose={navigation.goBack}
          onSubmit={() => this.update()}
          submitText={"Save"}
        />
        <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
          <View style={styles.section}>
            <Text text70 color={Theme.grey} style={{ fontWeight: "bold" }}>
              Profile Photo
            </Text>
            <View center>
              <ImageUploader
                onImageSubmit={(res) => this.setState({ image: res })}
                uri={this.state.image.uri}
                borderRadius={100}
                height={150}
                width={150}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text text70 color={Theme.grey} style={{ fontWeight: "bold" }}>
              Cover Photo
            </Text>
            <ImageUploader
              onImageSubmit={(res) => this.setState({ coverImage: res })}
              height={150}
              borderRadius={25}
              uri={this.state.coverImage.uri}
            />
          </View>

          <View row marginT-20 style={styles.section}>
            <View marginR-10>
              <Icons icon="graduation-cap" size={iconSize} type="Entypo" />
            </View>
            <View flex style={{ marginRight: 12.5 }}>
              <TextField
                placeholder="Major"
                enableErrors={false}
                value={this.state.major}
                onChangeText={(major) => this.setState({ major })}
              />
            </View>
            <View flex style={{ marginLeft: 12.5 }}>
              <GradePicker
                onChange={(year) => this.setState({ year })}
                value={this.state.year}
                size="small"
                underline
              />
            </View>
          </View>
          <View row marginT-25 style={styles.section}>
            <View marginL-4 marginR-15>
              <Icons icon="info" size={iconSize - 2} />
            </View>
            <View flex>
              <TextField
                value={this.state.bio}
                expandable={true}
                enableErrors={false}
                placeholder="Bio"
                autoFocus={true}
                onChangeText={(bio) => this.setState({ bio })}
              />
            </View>
          </View>
          <View row marginT-25 style={styles.section}>
            <View marginL-4 marginR-15>
              <Icons icon="snapchat-ghost" size={iconSize - 2} type="Font" />
            </View>
            <View flex>
              <TextField
                placeholder="Snapchat Username"
                enableErrors={false}
                value={this.state.snapchat}
                onChangeText={(snapchat) => this.setState({ snapchat })}
              />
            </View>
          </View>
          <View row marginT-25 style={styles.section}>
            <View marginL-4 marginR-15>
              <Icons icon="instagram" size={iconSize - 2} type="Font" />
            </View>
            <View flex>
              <TextField
                placeholder="Instagram Username"
                enableErrors={false}
                value={this.state.instagram}
                onChangeText={(instagram) => this.setState({ instagram })}
              />
            </View>
          </View>
          <View row marginT-25 style={styles.section}>
            <View marginL-4 marginR-15>
              <Icons icon="twitter" size={iconSize - 2} type="Entypo" />
            </View>
            <View flex>
              <TextField
                placeholder="Twitter Username"
                enableErrors={false}
                value={this.state.twitter}
                onChangeText={(twitter) => this.setState({ twitter })}
              />
            </View>
          </View>
          <View row marginT-25 style={styles.section}>
            <View marginL-4 marginR-15>
              <Icons icon="linkedin" size={iconSize - 2} type="Entypo" />
            </View>
            <View flex>
              <TextField
                placeholder="LinkedIn URL"
                enableErrors={false}
                value={this.state.linkedin}
                onChangeText={(linkedin) => this.setState({ linkedin })}
              />
            </View>
          </View>
          <View flex centerH>
            <ActionButton
              text="Privacy Policy"
              style={styles.button}
              onPress={() => navigation.navigate("privacy")}
              borderColor="transparent"
            />
            <ActionButton
              text="Terms of Use"
              style={styles.button}
              onPress={() => navigation.navigate("terms")}
              borderColor="transparent"
            />
            <ActionButton
              text="Logout"
              backgroundColor={Theme.red}
              color="white"
              style={styles.button}
              onPress={() => auth().signOut()}
              borderColor="transparent"
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    marginVertical: 5,
  },
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
    height: 57.5,
    marginBottom: 10,
  },
  section: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default connect((state) => ({ user: state.user }), {})(EditProfile);
