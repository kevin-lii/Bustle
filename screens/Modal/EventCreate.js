import React from "react";
import { View, Text, TextField } from "react-native-ui-lib";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Category from "./components/Category";
import DateTime from "./components/DateTimeInput";
import FormHeader from "./components/FormHeader";
import LocationInput from "./components/LocationInput";
import ToggleRow from "./components/ToggleRow";

import { UserContext } from "../../dataContainers/context";
import EventModel from "../../models/CollegeEvent";
import Icons from "../../components/Image/Icons";
import ImageUploader from "../../components/Form/ImageUploader";
import Tokenizer from "../../components/Form/Tokenizer";

import { Theme, eventTags } from "../../global/constants";
import { validateURL } from "../../global/utils";
import globalStyles from "../../global/styles";

export default class EventCreate extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    const event = props.route?.params?.event;
    this.state = event
      ? { ...event }
      : {
          name: "",
          description: "",
          date: new Date(),
          disabled: false,
          time: new Date(),
          endDate: null,
          endTime: null,
          location: null,
          category: "Social",
          open: true,
          isPrivate: false,
          virtual: true,
          image: "",
          link: "",
          tags: [],
        };

    if (event) {
      this.state.image = { uri: event.photoURL };
      this.state.date = event.startDate.toDate();
      this.state.time = event.startDate.toDate();
      this.state.endDate = event.endDate?.toDate();
      this.state.endTime = event.endDate?.toDate();
      this.state.tags = this.state.tags.map((value) => ({
        label: value,
        value,
      }));
    }

    this.submit = this.submit.bind(this);
    this.validateSubmission = this.validateSubmission.bind(this);
  }

  async submit(update = false) {
    try {
      this.setState({ disabled: true });
      const stateCopy = Object.assign({}, this.state);
      stateCopy.startDate = new Date();
      stateCopy.startDate.setTime(this.state.date.getTime());
      stateCopy.startDate.setHours(this.state.time.getHours());
      stateCopy.startDate.setMinutes(this.state.time.getMinutes());
      if (this.state.endDate && this.state.endTime) {
        stateCopy.endDate.setTime(this.state.endDate.getTime());
        stateCopy.endDate.setHours(this.state.endTime.getHours());
        stateCopy.endDate.setMinutes(this.state.endTime.getMinutes());
      }
      delete stateCopy.endTime;
      delete stateCopy.date;
      delete stateCopy.time;
      delete stateCopy.disabled;

      stateCopy.tags = stateCopy.tags.map(({ value }) => value);

      if (update)
        EventModel.update(this.props.route.params?.event.id, stateCopy);
      else
        EventModel.create(
          {
            uid: this.context.uid,
            displayName: this.context.displayName,
            photoURL: this.context.photoURL,
          },
          stateCopy
        );
      this.props.navigation.goBack();
    } catch (e) {
      console.log(e);
      this.setState({ disabled: false });
      Alert.alert("Error", e.message);
    }
  }

  validateSubmission() {
    const errors = [];
    const { name, endDate, endTime, link, location } = this.state;
    if (!name) errors.push("Event name required");
    if (!endDate && endTime) errors.push("End date required");
    if (endDate && !endTime) errors.push("End time required");
    if (link && !validateURL(link)) errors.push("Invalid link");
    if (!link && !location) errors.push("Link or location required");
    if (errors.length > 0) return Alert.alert("Error", errors.join("\n"));

    this.submit(Boolean(this.props.route.params?.event));
  }

  render() {
    const { navigation, route } = this.props;
    const iconSize = 25;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FormHeader
          onClose={navigation.goBack}
          onSubmit={this.validateSubmission}
          submitText={route.params?.event ? "Update" : "Create"}
          disabled={this.state.disabled}
        />
        <KeyboardAwareScrollView
          style={{
            backgroundColor: "white",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <ImageUploader
            onImageSubmit={(res) => this.setState({ image: res })}
            uri={this.state.image?.uri}
          />

          <View paddingH-15 paddingB-20>
            <TextField
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}
              containerStyle={{}}
              floatingPlaceholder
              placeholder="Event Name"
              validate={"required"}
              floatOnFocus
              color={Theme.secondary}
              floatingPlaceholderColor={Theme.primary}
              underlineColor={Theme.underline}
              autoFocus={true}
              rightIconSource={null}
            />

            <View row canterV>
              <View marginR-10>
                <Icons icon="clock" size={iconSize} />
              </View>
              <DateTime
                date={this.state.date}
                time={this.state.time}
                onDate={(date) => this.setState({ date })}
                onTime={(time) => this.setState({ time })}
              />
            </View>
            <View marginL-35 marginT-15 marginB-20>
              <DateTime
                date={this.state.endDate}
                time={this.state.endTime}
                endTime
                onDate={(endDate) => this.setState({ endDate })}
                onTime={(endTime) => this.setState({ endTime })}
              />
            </View>

            <ToggleRow
              icon={<Icons icon="desktop" size={iconSize - 3} />}
              label="Virtual Event"
              value={this.state.virtual}
              size={40}
              onChange={(virtual) => this.setState({ virtual })}
            />

            <View row marginT-30 marginB-10>
              <View marginR-10>
                <Icons
                  icon={this.state.virtual ? "link" : "map-marker-alt"}
                  size={iconSize - 2}
                />
              </View>
              <View flex>
                {this.state.virtual ? (
                  <TextField
                    placeholder="Link"
                    enableErrors={false}
                    value={this.state.link}
                    onChangeText={(link) => this.setState({ link })}
                  />
                ) : (
                  <LocationInput
                    value={this.state.location}
                    onChange={(location) => this.setState({ location })}
                  />
                )}
              </View>
            </View>

            {/* <ToggleRow
              icon={<Icons icon="user-secret" size={iconSize - 3} />}
              padding={13}
              label="Private Event"
              value={this.state.isPrivate}
              size={40}
              onChange={(isPrivate) => this.setState({ isPrivate })}
              underline={!this.state.isPrivate}
            /> */}

            {this.state.isPrivate && (
              <ToggleRow
                icon={<Icons icon="email" size={iconSize - 3} />}
                padding={13}
                label="Guests may invite others"
                value={this.state.open}
                size={40}
                onChange={(open) => this.setState({ open })}
              />
            )}

            <View marginT-10 paddingB-5 style={globalStyles.underline}>
              <Text text80 color={Theme.grey}>
                Category
              </Text>
              <View paddingH-5>
                <Category
                  onChange={(category) => this.setState({ category, tags: [] })}
                  value={this.state.category}
                />
              </View>
            </View>

            <View row marginT-25>
              <View marginL-4 marginR-15>
                <Icons icon="info" size={iconSize - 2} />
              </View>
              <View flex>
                <TextField
                  value={this.state.description}
                  expandable={true}
                  enableErrors={false}
                  placeholder="Description"
                  autoFocus={true}
                  onChangeText={(description) => this.setState({ description })}
                />
              </View>
            </View>

            <View row marginT-20>
              <View marginR-7 marginT-10>
                <Icons icon="hashtag" size={iconSize - 2} />
              </View>
              <View flex centerV>
                <Tokenizer
                  value={this.state.tags}
                  size={18}
                  pillColor={Theme.primary}
                  color="white"
                  onChange={(tags) => this.setState({ tags })}
                  data={eventTags[this.state.category].map((tag) => ({
                    label: tag,
                    value: tag,
                  }))}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
