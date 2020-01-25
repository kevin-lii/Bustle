import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import {
  Platform,
  DatePickerAndroid,
  DatePickerIOS,
  TimePickerAndroid,
  TouchableWithoutFeedback
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/Fontisto";
import moment from "moment";
import uuid from "uuid/v4";
import DateTimePicker from "@react-native-community/datetimepicker";

import TextButton from "../Buttons/TextButton";
import styles from "./styles";

import { placesKey, Theme } from "../../constants";

const locationMaxLen = 15;

export default ({ type, label, value, setValue, overlay }) => {
  let initialText;
  if (value && type == "date")
    initialText = moment(value).format("MMM Do, YYYY");
  else if (value && type == "clock")
    initialText = moment(value).format("h:mm a");
  else if (value && type == "map-marker-alt")
    initialText = value.description.substring(0, locationMaxLen) + "...";
  else if (type == "map-marker-alt") initialText = "Here";
  else initialText = "Now";

  const [text, setText] = useState(initialText);
  let tempDate = new Date();

  const confirmDate = () => {
    overlay(null);
    if (type == "date") {
      setText(moment(tempDate).format("MMM Do, YYYY"));
    } else if (type === "clock") {
      setText(moment(tempDate).format("h:mm a"));
    }
    setValue(tempDate);
  };

  const setEventDate = (event, newDate) => {
    if (Platform.OS == "android") {
      overlay(null);
      if (event.type != "dismissed") {
        if (type == "date") {
          setText(moment(newDate).format("MMM Do, YYYY"));
        } else if (type === "clock") {
          setText(moment(newDate).format("h:mm a"));
        }
        setValue(newDate);
      }
    } else {
      if (newDate && tempDate != newDate) tempDate = newDate;
    }
  };

  const toggleSize = 30;

  let formField;
  if (type == "date" || type == "clock") {
    formField = (
      <TextButton
        text={text}
        onPress={async () => {
          modal = true;
          await overlay(
            Platform.OS == "ios" ? (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  width: "100%"
                }}
              >
                <View
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    borderBottomColor: "grey",
                    borderBottomWidth: 0.5,
                    padding: 15
                  }}
                >
                  <TouchableOpacity>
                    <Text style={{ color: "blue" }} onPress={confirmDate}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                  <DateTimePicker
                    value={value || new Date()}
                    mode={type == "clock" ? "time" : "date"}
                    is24Hour={false}
                    display="default"
                    onChange={setEventDate}
                  />
                </View>
              </View>
            ) : (
              <DateTimePicker
                value={value || new Date()}
                mode={type == "clock" ? "time" : "date"}
                is24Hour={false}
                display="default"
                onChange={setEventDate}
              />
            )
          );
        }}
      />
    );
  } else if (type == "map-marker-alt") {
    formField = (
      <TextButton
        text={text}
        onPress={async () => {
          overlay(
            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={3}
              autoFocus={true}
              returnKeyType={"search"}
              fetchDetails={true}
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                setValue(Object.assign(data, details));
                setText(data.description.substring(0, locationMaxLen) + "...");
                overlay(null);
              }}
              styles={{
                container: {
                  backgroundColor: "white",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12
                },
                textInputContainer: {
                  width: "100%",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderWidth: 0,
                  backgroundColor: "transparent",
                  paddingLeft: 15
                },
                description: {
                  fontWeight: "bold"
                }
              }}
              query={{
                key: placesKey,
                sessiontoken: uuid(),
                language: "en"
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              GooglePlacesDetailsQuery={{
                fields: ["formatted_address", "geometry"]
              }}
              debounce={300}
              renderLeftButton={() => (
                <TouchableOpacity center onPress={() => overlay()}>
                  <Icon name="arrow-left" />
                  {/* <Text>Back</Text> */}
                </TouchableOpacity>
              )}
            />
          );
        }}
      />
    );
  } else if (type == "user-secret") {
    formField = value ? (
      <TouchableWithoutFeedback onPress={() => setValue(!value)}>
        <View row centerV spread>
          <Text>Invite Only{"\t"}</Text>
          <Icon name="toggle-on" color={Theme.secondary} size={toggleSize} />
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback onPress={() => setValue(!value)}>
        <View row centerV>
          <Text>Anyone may join{"\t"}</Text>
          <Icon name="toggle-off" size={toggleSize} />
        </View>
      </TouchableWithoutFeedback>
    );
  } else if (type == "shield") {
    formField = value ? (
      <TouchableWithoutFeedback onPress={() => setValue(!value)}>
        <View row centerV>
          <Text>Guests can invite{"\t"}</Text>
          <Icon name="toggle-on" color={Theme.secondary} size={toggleSize} />
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback onPress={() => setValue(!value)}>
        <View row centerV>
          <Text>Guests can't invite{"\t"}</Text>
          <Icon name="toggle-off" size={toggleSize} />
        </View>
      </TouchableWithoutFeedback>
    );
  } else if (type == "paper-plane") {
    formField = value ? (
      <TouchableWithoutFeedback onPress={() => setValue(!value)}>
        <View row centerV>
          <Text>Do{"\t"}</Text>
          <Icon name="toggle-on" color={Theme.secondary} size={toggleSize} />
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback onPress={() => setValue(!value)}>
        <View row centerV>
          <Text>Don't {"\t"}</Text>
          <Icon name="toggle-off" size={toggleSize} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  // location, choose current or enter an address
  // event status, conditional invite

  return (
    <View style={styles.formGroup} centerV spread row>
      <View row centerV>
        <Icon name={type} style={{ margin: 5 }} />
        <Text>{label}</Text>
      </View>
      {formField}
    </View>
  );
};
