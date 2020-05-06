import React from "react";
import { View, TextField } from "react-native-ui-lib";
import {
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

import FormCard from "../../../components/Cards/FormCard";
import FormGroup from "../../../components/Form/FormGroup";
import FormHeader from "../../../components/Header/FormHeader";
import TextButton from "../../../components/Buttons/TextButton";
import CategoriesIcon from "../../../components/Image/CategoriesIcon";
import EventModel from "../../../models/Event";
import { UserContext } from "../../../dataContainers/context";
import IconButton from "../../../components/Buttons/IconButton";

import styles from "../../../components/Form/styles";
import { Theme, categories } from "../../../global/constants";

export default class EventCreate extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.scrollView = React.createRef();
    //Changed to support edit
    this.state = {
      overlayContent: false,
      name: props.event ? props.event.name : "",
      description: props.event ? props.event.description : "",
      date: props.event ? props.event.date.toDate() : null,
      time: props.event ? props.event.time.toDate() : null,
      location: props.event ? props.event.location : null,
      category: props.event ? props.event.category : "Social",
      open: props.event ? props.event.open : true,
      isPrivate: props.event ? props.event.isPrivate : false,
      image: props.event ? props.event.photoURL : "",
      scrollViewWidth: 0,
      currentXOffset: 0,
      confirmed: false,
    };
  }

  render() {
    const { navigation, route } = this.props;

    const submit = async () => {
      try {
        this.setState({ confirmed: true });
        const stateCopy = Object.assign({}, this.state);
        delete stateCopy.confirmed;
        delete stateCopy.overlayContent;
        delete stateCopy.scrollViewWidth;
        delete stateCopy.currentXOffset;
        EventModel.create(
          {
            uid: this.context.uid,
            displayName: this.context.displayName,
            photoURL: this.context.photoURL,
          },
          stateCopy
        );
        navigation.goBack();
      } catch (e) {
        console.log(e);
        Alert.alert("Error", e.message);
        this.setState({ confirmed: false });
      }
    };

    const edit = async () => {
      try {
        this.setState({ confirmed: true });
        const stateCopy = Object.assign({}, this.state);
        delete stateCopy.confirmed;
        delete stateCopy.overlayContent;
        delete stateCopy.scrollViewWidth;
        delete stateCopy.currentXOffset;
        EventModel.update(route.params?.event.id, stateCopy);
        navigation.goBack();
      } catch (e) {
        console.log(e);
        Alert.alert("Error", e.message);
        this.setState({ confirmed: false });
      }
    };

    const validateSubmission = () => {
      if (route.params?.event) edit();
      else submit();
    };

    const setOverlayContent = (content) =>
      this.setState({ overlayContent: content });

    const Overlay = ({ children }) => (
      <View center style={styles.formOverlay}>
        <TouchableWithoutFeedback onPress={() => setOverlayContent(false)}>
          <View
            style={{ position: "absolute", width: "100%", height: "100%" }}
          ></View>
        </TouchableWithoutFeedback>
        {children}
      </View>
    );

    let imgText;
    // if (this.state.image) {
    //   const strStart = this.state.image.path.lastIndexOf("/") + 1;
    //   imgText =
    //     this.state.image.path.substring(strStart, strStart + 15) + "...";
    // } else {
    imgText = "Add Image";
    // }

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

    const handleScroll = (event) => {
      newXOffset = event.nativeEvent.contentOffset.x;
      this.setState({ currentXOffset: newXOffset });
    };

    const leftArrow = () => {
      eachItemOffset = this.state.scrollViewWidth / 2;
      _currentXOffset = this.state.currentXOffset - eachItemOffset;
      this.scrollView.current.scrollTo({
        x: _currentXOffset,
        y: 0,
        animated: true,
      });
    };

    const rightArrow = () => {
      eachItemOffset = this.state.scrollViewWidth / 2; // Divide by 8 for 8 items
      _currentXOffset = this.state.currentXOffset + eachItemOffset;
      this.scrollView.current.scrollTo({
        x: _currentXOffset,
        y: 0,
        animated: true,
      });
    };

    return (
      <View>
        <FormHeader
          onClose={navigation.goBack}
          onSubmit={validateSubmission}
          submitText={route.params?.event ? "Update" : "Create"}
          disabled={this.state.confirmed}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 15,
            backgroundColor: "white",
            height: "100%",
          }}
        >
          <TextField
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
            containerStyle={{}}
            floatingPlaceholder
            placeholder="Event Name"
            validate={"required"}
            errorMessage={"Required field!"}
            floatOnFocus
            color={Theme.primary}
            floatingPlaceholderColor={Theme.primary}
            underlineColor={Theme.primary}
          />

          <FormGroup
            type="date"
            label="Date"
            value={this.state.date}
            setValue={(d) => this.setState({ date: d })}
            overlay={setOverlayContent}
          />

          <FormGroup
            type="clock"
            label="Time"
            value={this.state.time}
            setValue={(t) => this.setState({ time: t })}
            overlay={setOverlayContent}
          />

          <FormGroup
            type="map-marker-alt"
            label="Location"
            value={this.state.location}
            setValue={(l) => this.setState({ location: l })}
            overlay={setOverlayContent}
          />

          <FormGroup
            type="user-secret"
            label="Type"
            value={this.state.isPrivate}
            setValue={(p) => this.setState({ isPrivate: p })}
          />

          {this.state.isPrivate && (
            <FormGroup
              type="shield"
              label={"Open Invite"}
              value={this.state.open}
              setValue={(o) => this.setState({ open: o })}
            />
          )}

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <IconButton
              touchStyle={{
                alignItems: "flex-start",
                paddingTop: 20,
                marginRight: 15,
                marginLeft: 3,
              }}
              onPress={leftArrow}
              icon="ios-arrow-back"
              type="Ionicons"
            />
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
              }}
              horizontal
              ref={this.scrollView}
              onContentSizeChange={(w, h) =>
                this.setState({ scrollViewWidth: w })
              }
              scrollEventThrottle={16}
              onScroll={handleScroll}
              showsHorizontalScrollIndicator={false}
              style={{ height: 60, marginTop: 10 }}
            >
              {categories.map((category) => {
                const color =
                  this.state.category == category ? Theme.primary : null;
                return (
                  <View
                    center
                    key={category}
                    style={{ marginRight: 8, marginLeft: 7.5 }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ category: category });
                      }}
                      style={{ height: 25 }}
                    >
                      <CategoriesIcon type={category} color={color} />
                    </TouchableOpacity>
                    <Text style={{ color }}>{category}</Text>
                  </View>
                );
              })}
            </ScrollView>
            <IconButton
              touchStyle={{
                alignItems: "flex-start",
                paddingTop: 20,
                marginLeft: 15,
                marginRight: 3,
              }}
              onPress={rightArrow}
              icon="ios-arrow-forward"
              type="Ionicons"
            />
          </View>

          <View style={{ height: 15 }}></View>
          <TextButton
            text={imgText}
            style={styles.imgButton}
            onPress={pickImage}
          />
          <View style={{ height: 15 }}></View>

          <TextField
            value={this.state.description}
            containerStyle={{}}
            floatingPlaceholder
            placeholder="Description"
            multiline
            floatOnFocus
            onChangeText={(text) => this.setState({ description: text })}
            color={Theme.primary}
            floatingPlaceholderColor={Theme.primary}
            underlineColor={Theme.primary}
          />
        </ScrollView>
        {this.state.overlayContent && (
          <Overlay>{this.state.overlayContent}</Overlay>
        )}
      </View>
    );
  }
}
