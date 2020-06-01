import React from "react";
import { Text, ScrollView, Linking, SafeAreaView, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";

import Icons from "../../../../components/Image/Icons";

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
          <Text style={styles.title}>Privacy Policy for Bustle App</Text>
          <Text>
            At www.bustleapp.co, accessible from www.bustleapp.co, one of our
            main priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by www.bustleapp.co and how we use it.
          </Text>
          <Text>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </Text>
          <Text />
          <Text style={styles.subtitle}>Log Files</Text>
          <Text>
            www.bustleapp.co follows a standard procedure of using log files.
            These files log visitors when they visit websites. All hosting
            companies do this and a part of hosting services' analytics. The
            information collected by log files include internet protocol (IP)
            addresses, browser type, Internet Service Provider (ISP), date and
            time stamp, referring/exit pages, and possibly the number of clicks.
            These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users' movement on the
            website, and gathering demographic information.
          </Text>
          <Text />
          <Text style={styles.subtitle}>Privacy Policies</Text>
          <Text>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of www.bustleapp.co. Our Privacy Policy was
            created with the help of the{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => {
                Linking.openURL("https://www.privacypolicygenerator.info");
              }}
            >
              Privacy Policy Generator
            </Text>{" "}
            and the{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => {
                Linking.openURL("https://www.privacypolicyonline.com/");
              }}
            >
              Privacy Policy Generator Online
            </Text>
            .
          </Text>
          <Text>
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on www.bustleapp.co,
            which are sent directly to users' browser. They automatically
            receive your IP address when this occurs. These technologies are
            used to measure the effectiveness of their advertising campaigns
            and/or to personalize the advertising content that you see on
            websites that you visit.
          </Text>

          <Text>
            Note that www.bustleapp.co has no access to or control over these
            cookies that are used by third-party advertisers.
          </Text>

          <Text />
          <Text style={styles.subtitle}>Third Party Privacy Policies</Text>

          <Text>
            www.bustleapp.co's Privacy Policy does not apply to other
            advertisers or websites. Thus, we are advising you to consult the
            respective Privacy Policies of these third-party ad servers for more
            detailed information. It may include their practices and
            instructions about how to opt-out of certain options. You may find a
            complete list of these Privacy Policies and their links here:
            Privacy Policy Links.
          </Text>

          <Text>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers'
            respective websites. What Are Cookies?
          </Text>

          <Text />
          <Text style={styles.subtitle}>Children's Information</Text>

          <Text>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </Text>

          <Text>
            www.bustleapp.co does not knowingly collect any Personal
            Identifiable Information from children under the age of 13. If you
            think that your child provided this kind of information on our
            website, we strongly encourage you to contact us immediately and we
            will do our best efforts to promptly remove such information from
            our records.
          </Text>

          <Text />
          <Text style={styles.subtitle}>Online Privacy Policy Only</Text>

          <Text>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in www.bustleapp.co. This policy is
            not applicable to any information collected offline or via channels
            other than this website.
          </Text>

          <Text />
          <Text style={styles.subtitle}>Consent</Text>

          <Text>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its Terms and Conditions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
