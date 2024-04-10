import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import { useNavigation, useRoute } from "@react-navigation/native";
import Picker from "./AddWisdom/Picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from "react-native-mime-types";
import { storage } from "../firebaseConfig.js";
import {
  ref,
  uploadString,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { readAsStringAsync } from "expo-file-system";
import VoiceRecorder from "./Audio/VoiceRecorder";
import { CopilotStep, walkthroughable, useCopilot } from "react-native-copilot";
import { Entypo } from "@expo/vector-icons";

const AddWisdom = ({ visible, onClose, onAddWisdom }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [articleText, setArticleText] = useState(""); // New state for article text input

  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [categories, setCategories] = useState([]); // Initialize categories state

  // Tutorial
  const { start, copilotEvents } = useCopilot();
  const [secondStepActive, setSecondStepActive] = useState(true);
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    copilotEvents.on("stepChange", (step) => {
      setLastEvent(`stepChange: ${step.name}`);
    });
    copilotEvents.on("start", () => {
      setLastEvent(`start`);
    });
    copilotEvents.on("stop", () => {
      setLastEvent(`stop`);
    });
  }, [copilotEvents]);

  useEffect(() => {
    setCategory("Select Category");
    setMedium("Select Medium");
    getUsernameFromAsyncStorage();
    getProfileImageFromAsyncStorage();
    fetchCategories(); // Fetch categories data when component mounts
  }, []);

  const fetchCategories = () => {
    // Fetch categories data here and update state
    const fetchedCategories = [
      { key: 0, label: "Career" },
      { key: 1, label: "Personal Growth" },
      { key: 2, label: "Relationship" },
      { key: 3, label: "Health and Wellness" },
      { key: 4, label: "Family" },
      { key: 5, label: "Education" },
      { key: 6, label: "Bussiness" },
      { key: 7, label: "Spirituality" },
      // Add more categories as needed
    ];
    setCategories(fetchedCategories);
  };

  const getUsernameFromAsyncStorage = async () => {
    const storedUsername = await AsyncStorage.getItem("username");
    setUsername(storedUsername);
  };

  const getProfileImageFromAsyncStorage = async () => {
    const storedProfileImage = await AsyncStorage.getItem("userImage");
    setProfileImage(storedProfileImage);
  };

  const handleSubmit = async () => {
    const data = await AsyncStorage.getItem("data");

    const parsedData = JSON.parse(data);
    const voiceData = await AsyncStorage.getItem("VoiceURI");
    const voiceName = voiceData.substring(voiceData.lastIndexOf("/") + 1);
    const filename = parsedData.uri.substring(
      parsedData.uri.lastIndexOf("/") + 1
    );
    console.log("DATA SENT :", parsedData);

    if (title && category !== "Select Category" && username) {
      const Wisdom = {
        title: title,
        medium: "",
        urlPic: "",
        urlVid: "",
        urlRec: "",
        article: articleText,
        category: category,
        wisdomOwner: username,
      };
      const response = await fetch(parsedData.uri);
      if (!response.ok) {
        throw new Error("Failed to fetch Blob");
      }
      const blobData = await response.blob();

      if (parsedData.type === "image") {
        Wisdom.medium = "article";
        const imageRef = ref(storage, `images/${filename}`);
        await uploadBytesResumable(imageRef, blobData);
        const imageUrl = await getDownloadURL(imageRef);
        Wisdom.urlPic = imageUrl;

        if (medium === "Voice Record") {
          Wisdom.medium = "voice";
          const response = await fetch(voiceData);
          if (!response.ok) {
            throw new Error("Failed to fetch Blob");
          }
          const blobData = await response.blob();

          const voiceRef = ref(storage, `voice/${voiceName}`);
          await uploadBytesResumable(voiceRef, blobData);

          const voiceUrl = await getDownloadURL(voiceRef);
          Wisdom.urlRec = voiceUrl;
        }
      } else if (parsedData.type === "video") {
        Wisdom.medium = "video";
        const videoRef = ref(storage, `videos/${filename}`);
        await uploadBytesResumable(videoRef, blobData);

        const videoUrl = await getDownloadURL(videoRef);
        Wisdom.urlVid = videoUrl;
      }

      console.log(Wisdom);

      const result = await fetch(
        "https://legasync.azurewebsites.net/wisdom/addWisdom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Wisdom),
        }
      );

      const responseText = await result.text();
      console.log("Response:", responseText);

      if (responseText === "Success") {
        navigation.navigate("TabNavigator");
        onAddWisdom(Wisdom);
      } else {
        alert("failed to add Wisdom");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Modal visible={visible} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View style={{ flex: 1 }}>
                {/* <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 25,
                    backgroundColor: "", // Add your desired background color here
                  }}
                  onPress={() => start()}
                >
                  <Entypo name="light-bulb" size={24} color="yellow" />
                </TouchableOpacity> */}
                <Text
                  style={{
                    marginTop: 50,
                    fontWeight: "bold",
                    color: "black",
                    marginBottom: 10,
                    textAlign: "center",
                    paddingVertical: 40,
                    paddingHorizontal: 20,
                    fontSize: 28, // Set font size to 25
                  }}
                >
                  Add New Wisdom
                </Text>
                <TextInput
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#ccc",
                    marginBottom: 40,
                    fontSize: 23,
                  }}
                  placeholder="Enter title of article"
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                />
                <ModalSelector
                  data={categories}
                  initValue={category}
                  style={{
                    borderRadius: 5,
                    borderColor: "#ccc",
                    marginBottom: 40,
                    fontSize: 23, // Set font size to 25
                  }}
                  initValueTextStyle={{
                    color: category === "Select Category" ? "#808080" : "#000",
                  }}
                  selectTextStyle={{ color: "#000" }}
                  onChange={(option) => setCategory(option.label)}
                />
                <ModalSelector
                  data={[
                    { key: 0, label: "Video" },
                    { key: 1, label: "Article" },
                    { key: 2, label: "Voice Record" },
                  ]}
                  initValue={medium}
                  style={{
                    borderRadius: 5,
                    borderColor: "#ccc",
                    marginBottom: 60,
                    fontSize: 23, // Set font size to 25
                  }}
                  initValueTextStyle={{
                    color: medium === "Select Medium" ? "#808080" : "#000",
                  }}
                  selectTextStyle={{ color: "#000" }}
                  onChange={(option) => {
                    setMedium(option.label);
                  }}
                />
                {(medium === "Video" || medium === "Article") && (
                  <View style={{ marginBottom: 15 }}>
                    <Picker />
                  </View>
                )}
                {medium === "Article" && (
                  <TextInput
                    style={{
                      padding: 10,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: "#ccc",
                      marginBottom: 15,
                      minHeight: 200,
                      fontSize: 23, // Set font size to 25
                    }}
                    placeholder="Enter article text"
                    value={articleText}
                    onChangeText={(text) => setArticleText(text)}
                    multiline={true}
                    numberOfLines={10}
                  />
                )}
                {medium === "Voice Record" && (
                  <View style={{ marginBottom: 15 }}>
                    <VoiceRecorder></VoiceRecorder>
                    <Picker />
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ width: 120 }}>
                    <Button title="Cancel" onPress={onClose} color="#808080" />
                  </View>
                  <View style={{ width: 120 }}>
                    <Button
                      title="Post"
                      onPress={handleSubmit}
                      color="#f5ca31"
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddWisdom;
