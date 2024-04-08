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

const AddWisdom = ({ visible, onClose, onAddWisdom }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [articleText, setArticleText] = useState(""); // New state for article text input

  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [categories, setCategories] = useState([]); // Initialize categories state

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
            height: "82%",
            width: "90%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  marginBottom: 10,
                  textAlign: "center",
                  paddingVertical: 20,
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
                  marginBottom: 15,
                }}
                placeholder="Enter title of article"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
              <ModalSelector
                data={categories}
                initValue={category}
                style={{
                  padding: 10,
                  borderRadius: 5,
                  borderColor: "#ccc",
                  marginBottom: 15,
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
                  padding: 10,
                  borderRadius: 5,
                  borderColor: "#ccc",
                  marginBottom: 15,
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
                  }} // Increased minHeight for bigger textarea
                  placeholder="Enter article text"
                  value={articleText}
                  onChangeText={(text) => setArticleText(text)}
                  multiline={true}
                  numberOfLines={4}
                />
              )}
              {medium === "Voice Record" && (
                <View style={{ marginBottom: 15 }}>
                  <VoiceRecorder></VoiceRecorder>
                  <Picker />
                </View>
              )}
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View style={{ width: 120 }}>
                  <Button title="Cancel" onPress={onClose} color="#808080" />
                </View>
                <View style={{ width: 120 }}>
                  <Button title="Post" onPress={handleSubmit} color="#f5ca31" />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddWisdom;
