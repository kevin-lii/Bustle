import React from "react";
import { Text, ScrollView, Linking, SafeAreaView, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";

import Icons from "../../../components/Image/Icons";

import styles from "./styles";

export default function ({ navigation }) {
  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "flex-end", marginRight: 10, marginTop: 20 }}>
          <Icons
            icon="close-a"
            type="Fontisto"
            size={25}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ marginTop: headerHeight }}>
          <Text style={styles.title}>Website Terms and Conditions of Use</Text>
          <Text style={styles.subtitle}>1. Terms</Text>
          <Text>
            By accessing this Website, accessible from www.bustleapp.co, you are
            agreeing to be bound by these Website Terms and Conditions of Use
            and agree that you are responsible for the agreement with any
            applicable local laws. If you disagree with any of these terms, you
            are prohibited from accessing this site. The materials contained in
            this Website are protected by copyright and trade mark law. These
            Terms of Service has been created with the help of the{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => {
                Linking.openURL("https://www.termsofservicegenerator.net/");
              }}
            >
              Terms of Service Generator{" "}
            </Text>
            and the{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => {
                Linking.openURL("https://www.termsconditionsexample.com/");
              }}
            >
              Terms {"&"} Conditions Example
            </Text>
            .
          </Text>
          <Text style={styles.subtitle}>2. Use License</Text>
          <Text>
            Permission is granted to temporarily download one copy of the
            materials on Bustle App's Website for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a
            transfer of title, and under this license you may not:
          </Text>
          <Text>{`\u2022`} modify or copy the materials;</Text>
          <Text>
            {`\u2022`} use the materials for any commercial purpose or for any
            public display;
          </Text>
          <Text>
            {`\u2022`} attempt to reverse engineer any software contained on
            Bustle App's Website;
          </Text>
          <Text>
            {`\u2022`} remove any copyright or other proprietary notations from
            the materials; or
          </Text>
          <Text>
            {`\u2022`} transferring the materials to another person or "mirror"
            the materials on any other server.
          </Text>
          <Text>
            This will let Bustle App to terminate upon violations of any of
            these restrictions. Upon termination, your viewing right will also
            be terminated and you should destroy any downloaded materials in
            your possession whether it is printed or electronic format.
          </Text>
          <Text style={styles.subtitle}>3. Disclaimer</Text>
          <Text>
            All the materials on Bustle App’s Website are provided "as is".
            Bustle App makes no warranties, may it be expressed or implied,
            therefore negates all other warranties. Furthermore, Bustle App does
            not make any representations concerning the accuracy or reliability
            of the use of the materials on its Website or otherwise relating to
            such materials or any sites linked to this Website.
          </Text>
          <Text style={styles.subtitle}>4. Limitations</Text>
          <Text>
            Bustle App or its suppliers will not be hold accountable for any
            damages that will arise with the use or inability to use the
            materials on Bustle App’s Website, even if Bustle App or an
            authorize representative of this Website has been notified, orally
            or written, of the possibility of such damage. Some jurisdiction
            does not allow limitations on implied warranties or limitations of
            liability for incidental damages, these limitations may not apply to
            you.
          </Text>
          <Text style={styles.subtitle}>5. Revisions and Errata</Text>
          <Text>
            The materials appearing on Bustle App’s Website may include
            technical, typographical, or photographic errors. Bustle App will
            not promise that any of the materials in this Website are accurate,
            complete, or current. Bustle App may change the materials contained
            on its Website at any time without notice. Bustle App does not make
            any commitment to update the materials.
          </Text>
          <Text style={styles.subtitle}>6. Links</Text>

          <Text>
            Bustle App has not reviewed all of the sites linked to its Website
            and is not responsible for the contents of any such linked site. The
            presence of any link does not imply endorsement by Bustle App of the
            site. The use of any linked website is at the user’s own risk.
          </Text>

          <Text style={styles.subtitle}>
            7. Site Terms of Use Modifications
          </Text>

          <Text>
            Bustle App may revise these Terms of Use for its Website at any time
            without prior notice. By using this Website, you are agreeing to be
            bound by the current version of these Terms and Conditions of Use.
          </Text>
          <Text style={styles.subtitle}>8. Your Privacy</Text>

          <Text>
            Please read{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => {
                navigation.navigate("Privacy Policy");
              }}
            >
              our Privacy Policy
            </Text>
            .
          </Text>

          <Text style={styles.subtitle}>9. Governing Law</Text>

          <Text>
            Any claim related to Bustle App's Website shall be governed by the
            laws of us without regards to its conflict of law provisions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
