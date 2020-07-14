import React from "react";
import { TouchableOpacity, SafeAreaView, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";

import styles from "./styles";

export default function ({ navigation }) {
  const headerHeight = useHeaderHeight() + 20;
  return (
    <SafeAreaView style={(styles.container, { marginTop: headerHeight })}>
      <TouchableOpacity onPress={() => navigation.navigate("privacy")}>
        <Text style={styles.redirect}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("terms")}>
        <Text style={styles.redirect}>Terms of Service</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
