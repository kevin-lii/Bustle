import React, { useRef } from "react";
import { TextField, Modal } from "react-native-ui-lib";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { placesKey } from "../../../global/secrets";

const locationMaxLen = 45;

export default ({ onChange, value }) => {
  const modal = useRef();
  const closeModal = () => modal.current.toggleExpandableModal(false);
  const val =
    value &&
    value.description.substring(0, locationMaxLen) +
      (value.description.length > locationMaxLen ? "..." : "");

  return (
    <TextField
      ref={modal}
      value={val}
      placeholder="Choose location..."
      expandable={true}
      enableErrors={false}
      renderExpandable={(props, state) => (
        <Modal
          animationType={"slide"}
          visible={state.showExpandableModal}
          onRequestClose={closeModal}
        >
          <Modal.TopBar
            onCancel={closeModal}
            onDone={closeModal}
            doneLabel=""
          />
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2}
            autoFocus={true}
            returnKeyType={"search"}
            fetchDetails={true}
            renderDescription={(row) => row.description}
            onPress={(data, details = null) => {
              onChange(Object.assign(data, details));
              closeModal();
            }}
            styles={{
              container: {
                backgroundColor: "white",
              },
              textInputContainer: {
                width: "100%",
                borderWidth: 0,
                backgroundColor: "transparent",
                paddingLeft: 15,
              },
              description: {
                fontWeight: "bold",
              },
            }}
            query={{
              key: placesKey,
              sessiontoken: uuid(),
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            GooglePlacesDetailsQuery={{
              fields: ["formatted_address", "geometry"],
            }}
            debounce={300}
          />
        </Modal>
      )}
    />
  );
};
