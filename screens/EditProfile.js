import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Textbox from "../component/EditProfile/Textbox";
import BlackButton from "../component/EditProfile/BlackButton";
import Avatar from "../component/EditProfile/Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
  const route = useRoute();
  const [selectedImage, setSelectedImage] = useState(route.params?.profileImage || "");
  const [bio, setBio] = useState(route.params.bio || "");
  const [user, setUser] = useState({
    name: "John David",
    occupation: "Motivational Speaker",
    followers: 13400,
    following: 1462,
    posts: 1,
    profileImage: require("legasync/Images/Abdul.jpg"),
  });
  useEffect(() => {
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail !== null) {
          setEmail(storedEmail)
        }
      } catch (error) {
        console.log('Error retrieving username:', error);
      }
    };
  
    getEmail();
  }, []);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.log('Error retrieving username:', error);
      }
    };
  
    getUsername();
  }, []);

  const navigation = useNavigation();

  const handleBioChange = (text) => {
    setBio(text);
  };

  const handleImageSelect = (uri) => {
    setSelectedImage(uri);
  };


  const handleSavePress = () => {
    // Pass the selected image URI back to the Profile component
    console.log("Selected Image URI:", selectedImage);
    navigation.navigate("Profile", {
      profileImage: selectedImage,
      occupation: bio,
      username: username,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container1}
      >
        {/* Top section */}
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.backbtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="keyboard-arrow-left" size={50} color="white" />
          </TouchableOpacity>

          <Text style={styles.header}>Edit Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Avatar
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
          ></Avatar>
        </View>

        <View style={styles.bottomSection}>
          <Textbox label="Username" value={username} onChangeText={setUsername} />
          <Textbox label="Email" value={email} onChangeText={setEmail}/>
          <Textbox label="Phone Number"  />
          <Textbox label="Bio" value={bio} onChangeText={setBio} />
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
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileSection: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: -50,
    right: 5,
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
    marginLeft: 125,
    justifyContent: "center",
  },
  profiletxt: {
    color: "white",
    fontSize: 14,
    paddingTop: 5,
  },
  backbtn: {
    marginLeft: 15,
    position: "absolute",
  },
});

export default EditProfile;

