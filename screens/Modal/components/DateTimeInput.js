import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text } from "react-native-ui-lib";
import moment from "moment";
import Modal from "react-native-modal";

import { Theme } from "../../../global/constants";
import globalStyle from "../../../global/styles";

export default ({ onDate, onTime, date, time, endTime }) => {
  const dateText = date && moment(date).format("MMM Do, YYYY");
  const timeText = time && moment(time).format("h:mm a");
  const [modal, setModal] = useState(null);

  const setDate = (event, value) => {
    if (Platform.OS !== "android" || event.type !== "dismissed") onDate(value);
    setModal(null);
  };
  const setTime = (event, value) => {
    if (Platform.OS !== "android" || event.type !== "dismissed") onTime(value);
    setModal(null);
  };

  const Picker = ({ time, value }) =>
    Platform.OS == "ios" ? (
      <Modal isVisible={true}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <TouchableOpacity>
              <Text style={{ color: "blue" }} onPress={time ? onTime : onDate}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <DateTimePicker
              value={value || new Date()}
              mode={time ? "time" : "date"}
              is24Hour={false}
              display="default"
              onChange={time ? setTime : setDate}
            />
          </View>
        </View>
      </Modal>
    ) : (
      <DateTimePicker
        value={value || new Date()}
        mode={time ? "time" : "date"}
        is24Hour={false}
        display="default"
        onChange={time ? setTime : setDate}
      />
    );
  return (
    <>
      <View centerV row flex>
        <TouchableOpacity
          onPress={() => setModal(<Picker date value={date} />)}
          style={{ flex: 1 }}
        >
          <View flex centerV style={globalStyle.underline}>
            {endTime && !date ? (
              <Text style={styles.placeholder}>End Date</Text>
            ) : (
              <Text style={styles.text}>{dateText}</Text>
            )}
          </View>
        </TouchableOpacity>
        <Text marginH-20 marginB-10>
          at
        </Text>
        <TouchableOpacity
          onPress={() => setModal(<Picker time value={time} />)}
          style={{ flex: 1 }}
        >
          <View flex style={globalStyle.underline}>
            {endTime && !time ? (
              <Text style={styles.placeholder}>End Time</Text>
            ) : (
              <Text style={styles.text}>{timeText}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {modal}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "100%",
  },
  innerContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    padding: 15,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 15,
    marginBottom: 10,
    color: Theme.grey,
  },
});
