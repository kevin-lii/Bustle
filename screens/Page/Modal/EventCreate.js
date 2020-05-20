import React from "react";
import { View, Text, TextField } from "react-native-ui-lib";
import { Alert, ScrollView } from "react-native";
import ImagePicker from "react-native-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

import { UserContext } from "../../../dataContainers/context";
import EventModel from "../../../models/CollegeEvent";
import FormHeader from "../../../components/Header/FormHeader";
import Icons from "../../../components/Image/Icons";
import ImageUploader from "../../../components/Form/ImageUploader";
import DateTime from "../../../components/Form/DateTimeInput";
import Category from "../../../components/Form/Category";
import ToggleRow from "../../../components/Form/ToggleRow";
import LocationInput from "../../../components/Form/LocationInput";
import Tokenizer from "../../../components/Form/Tokenizer";

import { Theme, tags } from "../../../global/constants";
import globalStyles from "../../../global/styles";

export default class EventCreate extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = props.event || {
      name: "",
      description: "",
      date: new Date(),
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

    this.state.confirmed = false;
    if (props.event) {
      this.state.date = this.state.date.toDate();
      this.state.time = this.state.time.toDate();
      this.state.endDate = this.state.endDate?.toDate();
      this.state.endTime = this.state.endTime?.toDate();
    }
  }

  render() {
    const { navigation, route } = this.props;
    const iconSize = 25;

    const submit = async () => {
      try {
        this.setState({ confirmed: true });
        const stateCopy = Object.assign({}, this.state);
        delete stateCopy.confirmed;
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
        EventModel.update(route.params?.event.id, stateCopy);
        navigation.goBack();
      } catch (e) {
        console.log(e);
        Alert.alert("Error", e.message);
        this.setState({ confirmed: false });
      }
    };

    const validateSubmission = () => {
      if (!this.state.name) return;

      if (route.params?.event) edit();
      else submit();
    };

    return (
      <View flex>
        <FormHeader
          onClose={navigation.goBack}
          onSubmit={validateSubmission}
          submitText={route.params?.event ? "Update" : "Create"}
          disabled={this.state.confirmed}
        />
        <ScrollView
          style={{
            backgroundColor: "white",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <ImageUploader
            onImageSubmit={(res) => this.setState({ image: res.uri })}
            uri={this.state.image}
          />

          <View paddingH-15 paddingB-20>
            <TextField
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}
              containerStyle={{}}
              floatingPlaceholder
              placeholder="Event Name"
              validate={"required"}
              errorMessage={"Required field!"}
              floatOnFocus
              color={Theme.primary}
              floatingPlaceholderColor={Theme.primary}
              hideUnderline={false}
              useTopErrors={false}
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
            <View marginL-35 marginT-15 marginB-15>
              <DateTime
                date={this.state.endDate}
                time={this.state.endTime}
                endTime
                onDate={(date) => this.setState({ date })}
                onTime={(time) => this.setState({ time })}
              />
            </View>

            <ToggleRow
              icon={<Icons icon="desktop" size={iconSize - 3} />}
              label="Virtual Event"
              value={this.state.virtual}
              size={40}
              onChange={(virtual) => this.setState({ virtual })}
            />

            <View row marginT-20 marginB-10>
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

            <ToggleRow
              icon={<Icons icon="user-secret" size={iconSize - 3} />}
              padding={13}
              label="Private Event"
              value={this.state.isPrivate}
              size={40}
              onChange={(isPrivate) => this.setState({ isPrivate })}
              underline={!this.state.isPrivate}
            />

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
                  onChange={(category) => this.setState({ category })}
                  value={this.state.category}
                />
              </View>
            </View>

            <View row marginT-15>
              <View marginL-4 marginR-15>
                <Icons icon="info" size={iconSize - 2} />
              </View>
              <View flex>
                <TextField
                  value={this.state.description}
                  expandable={true}
                  enableErrors={false}
                  placeholder="Description"
                  onChangeText={(description) => this.setState({ description })}
                />
              </View>
            </View>

            <View row marginT-15>
              <View marginR-7 marginT-10>
                <Icons icon="hashtag" size={iconSize - 2} />
              </View>
              <View flex centerV>
                <Tokenizer
                  value={this.state.tags}
                  size={18}
                  pillColor={Theme.secondary}
                  color="white"
                  onChange={(tags) => this.setState({ tags })}
                  data={tags[this.state.category].map((category) => ({
                    label: category,
                    value: category,
                  }))}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
