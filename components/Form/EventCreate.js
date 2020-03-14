import React from "react";
import { View, TextField } from "react-native-ui-lib";
import {
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text
} from "react-native";
import ImagePicker from "react-native-image-picker";

import FormCard from "../Window/FormCard";
import FormGroup from "./FormGroup";
import FormHeader from "./FormHeader";
import TextButton from "../Buttons/TextButton";
import styles from "./styles";
import { Theme } from "../../constants";
import { categories, categoriesIcon } from "../../utils";
import EventData from "../../models/Event";
import { UserContext } from "../../dataContainers/context";
import IconButton from "../Buttons/IconButton";

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
      confirmed: false
    };
  }

  render() {
    const submit = async () => {
      try {
        this.setState({ confirmed: true });
        const stateCopy = Object.assign({}, this.state);
        delete stateCopy.confirmed;
        delete stateCopy.overlayContent;
        delete stateCopy.scrollViewWidth;
        delete stateCopy.currentXOffset;
        await EventData.create(
          this.context.uid,
          stateCopy,
          this.context.events
        );
        this.props.close();
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
        await EventData.update(
          this.props.event.id,
          stateCopy
        );
        if (this.props.update)
          this.props.update();
        this.props.close();
      } catch (e) {
        console.log(e);
        Alert.alert("Error", e.message);
        this.setState({ confirmed: false });
      }
    }

    const validateSubmission = () => {
      if (this.props.event)
        edit();
      else
        submit();
    };

    setOverlayContent = content => this.setState({ overlayContent: content });

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
      ImagePicker.showImagePicker({
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      }, response => {
        if (response.didCancel)
          console.log("Canceled");
        else if (response.error)
          Alert.alert("Error", response.error);
        else {
          this.setState({ image: response.uri })
        }
      })
    }

    const handleScroll = event => {
      newXOffset = event.nativeEvent.contentOffset.x;
      this.setState({ currentXOffset: newXOffset });
    };

    const leftArrow = () => {
      eachItemOffset = this.state.scrollViewWidth / 2;
      _currentXOffset = this.state.currentXOffset - eachItemOffset;
      this.scrollView.current.scrollTo({
        x: _currentXOffset,
        y: 0,
        animated: true
      });
    };

    const rightArrow = () => {
      eachItemOffset = this.state.scrollViewWidth / 2; // Divide by 8 for 8 items
      _currentXOffset = this.state.currentXOffset + eachItemOffset;
      this.scrollView.current.scrollTo({
        x: _currentXOffset,
        y: 0,
        animated: true
      });
    };

    return (
      <FormCard height={550} width={"90%"}>
        <FormHeader
          icon="close-a"
          title={this.props.event ? "Edit Event" : "Create Event"}
          onPress={this.props.close}
          headerRight={
            <TextButton
              text={this.props.event ? "Edit" : "Create"}
              disabled={this.state.confirmed}
              onPress={validateSubmission}
              primary
            />
          }
        />
        <ScrollView
          style={{
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <TextField
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
            containerStyle={{}}
            floatingPlaceholder
            placeholder="Title"
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
            setValue={d => this.setState({ date: d })}
            overlay={setOverlayContent}
          />

          <FormGroup
            type="clock"
            label="Time"
            value={this.state.time}
            setValue={t => this.setState({ time: t })}
            overlay={setOverlayContent}
          />

          <FormGroup
            type="map-marker-alt"
            label="Location"
            value={this.state.location}
            setValue={l => this.setState({ location: l })}
            overlay={setOverlayContent}
          />

          <FormGroup
            type="user-secret"
            label="Type"
            value={this.state.isPrivate}
            setValue={p => this.setState({ isPrivate: p })}
          />

          {this.state.isPrivate && (
            <FormGroup
              type="shield"
              label={"Open Invite"}
              value={this.state.open}
              setValue={o => this.setState({ open: o })}
            />
          )}

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <IconButton
              touchStyle={{
                alignItems: "flex-start",
                paddingTop: 20,
                marginRight: 15,
                marginLeft: 3
              }}
              onPress={leftArrow}
              icon="ios-arrow-back"
            />
            <ScrollView
              contentContainerStyle={{
                alignItems: "center"
              }}
              horizontal
              pagingEnabled={true}
              ref={this.scrollView}
              onContentSizeChange={(w, h) =>
                this.setState({ scrollViewWidth: w })
              }
              scrollEventThrottle={16}
              scrollEnabled={false}
              onScroll={handleScroll}
              showsHorizontalScrollIndicator={false}
              style={{ height: 60, marginTop: 10 }}
            >
              {categories.map(category => (
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
                    {categoriesIcon({
                      type: category,
                      color:
                        this.state.category == category ? "grey" : Theme.primary
                    })}
                  </TouchableOpacity>
                  <Text style={{ color: Theme.primary }}>{category}</Text>
                </View>
              ))}
            </ScrollView>
            <IconButton
              touchStyle={{
                alignItems: "flex-start",
                paddingTop: 20,
                marginLeft: 15,
                marginRight: 3
              }}
              onPress={rightArrow}
              icon="ios-arrow-forward"
            />
          </View>

          <View style={{ height: 15 }}></View>
          <TextButton text={imgText} style={styles.imgButton} onPress={pickImage} />
          <View style={{ height: 15 }}></View>

          <TextField
            value={this.state.description}
            containerStyle={{}}
            floatingPlaceholder
            placeholder="Description"
            multiline
            floatOnFocus
            onChangeText={text => this.setState({ description: text })}
            color={Theme.primary}
            floatingPlaceholderColor={Theme.primary}
            underlineColor={Theme.primary}
          />
        </ScrollView>
        {this.state.overlayContent && (
          <Overlay>{this.state.overlayContent}</Overlay>
        )}
      </FormCard>
    );
  }
}
