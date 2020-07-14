import React, { createRef } from "react";
import { connect } from "react-redux";
import { TextInput, StyleSheet, Keyboard } from "react-native";
import { Carousel } from "react-native-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";

import UserModel from "../../models/User";
import GradePicker from "../../components/Form/GradePicker";
import ImageUploader from "../../components/Form/ImageUploader";
import OnboardingScreen from "./OnboardingScreen";

import { checkName } from "../../global/utils";

class NewUserFlow extends React.Component {
  constructor(props) {
    super(props);
    this.chainFlow = createRef();
    this.state = {
      pageNumber: 0,
      displayName: props.user?.displayName || "",
      image: {},
      coverImage: {},
      major: "",
      year: "",
      bio: "",
      instagram: "",
      twitter: "",
      snapchat: "",
      linkedin: "",
      error: "",
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user.displayName !== user.displayName)
      this.setState({
        name: user.displayName,
        image: { url: user.photoURL },
      });
  }

  completeSignUp = async () => {
    const data = { ...this.state };
    delete data.error;
    delete data.image;

    if (this.check("all")) {
      await UserModel.createNewProfile(data);
      this.props.navigation.replace("home");
    }
  };

  check = (type) => {
    try {
      switch (type) {
        case "name":
          checkName(this.state.displayName);
          break;
        case "all":
          checkName(this.state.displayName);
          if (!this.state.year || !this.state.major)
            throw new Error("Please enter year and major.");
        default:
          break;
      }
      return true;
    } catch (e) {
      this.setState({ error: e.message });
      console.log(e);
      return false;
    }
  };

  increment = (amount) => {
    Keyboard.dismiss();
    const page = this.state.pageNumber;
    this.chainFlow.current.goToPage(page + amount);
    this.setState({ pageNumber: page + amount });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Carousel
          initialPage={0}
          containerStyle={{ flex: 1, backgroundColor: "white" }}
          ref={this.chainFlow}
          keyboardShouldPersistTaps="always"
          pageControlPosition="under"
        >
          <OnboardingScreen
            first
            onNext={() => this.check("name") && this.increment(1)}
            validationMessage={this.state.error}
            title="Enter your full name to get started."
          >
            <TextInput
              placeholder="Full name"
              style={{ fontSize: 30 }}
              onChangeText={(displayName) =>
                this.setState({ displayName, error: "" })
              }
              autoCompleteType="name"
              textAlign="center"
            />
          </OnboardingScreen>
          <OnboardingScreen
            onNext={() => this.increment(1)}
            onCancel={() => this.increment(-1)}
            title="Show us what you look like?"
          >
            <ImageUploader
              onImageSubmit={(image) => this.setState({ image })}
              uri={this.state.image.uri}
              borderRadius={100}
              height={150}
              width={150}
            />
          </OnboardingScreen>
          <OnboardingScreen
            last
            onCancel={() => this.increment(-1)}
            onNext={() => this.completeSignUp()}
            validationMessage={this.state.error}
            title="Tell us a bit more about yourself."
          >
            <GradePicker
              value={this.state.year}
              onChange={(year) => this.setState({ year })}
            />
            <TextInput
              placeholder="Major"
              style={{ fontSize: 30 }}
              textAlign="center"
              onChangeText={(major) => this.setState({ major, error: "" })}
            />
          </OnboardingScreen>
        </Carousel>
      </SafeAreaView>
    );
  }
}

export default connect((state) => ({ user: state.user }), {})(NewUserFlow);

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
