import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Textbox from "../components/Textbox";
import BlackButton from "../components/BlackButton";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "John David",
    occupation: "Motivational Speaker",
    followers: 13400,
    following: 1462,
    posts: 1,
    profileImage: require("legasync/Images/Abdul.jpg"),
  });

  //still testing
  const handleSavePress = () =>{
    console.log("Saved Pressed");
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container1}
      >
        {/* Top section */}
        <View style={styles.topSection}>
          <Text style={styles.header}>Edit Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Image source={user.profileImage} style={styles.profileImage} />
          <Text style={styles.profiletxt}>Change Picture</Text>
        </View>

        <View style={styles.bottomSection}>
          <Textbox label="Username" />
          <Textbox label="Email" />
          <Textbox label="Phone Number" keyboardType="number-pad" />
          <Textbox label="Bio" />
          <BlackButton onPress={handleSavePress} title="Save" />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container: {
    backgroundColor: "#2F2D2D",
  },
  topSection: {
    width: "100%",
    height: 200,
    backgroundColor: "#7C7C7C",
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: -50,
    borderWidth: 2,
    borderColor: "white",
  },
  bottomSection: {
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  profiletxt: {
    color: "white",
    fontSize: 14,
    paddingTop: 5,
  },
});

export default EditProfile;
