import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import { useNavigation, useRoute } from "@react-navigation/native";
import Picker from "./AddWisdom/Picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from 'react-native-mime-types';

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
      { key: 0, label: "Technology" },
      { key: 1, label: "Computer Science" },
      { key: 2, label: "Scientific" },
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
    const filename = parsedData.uri.substring(parsedData.uri.lastIndexOf("/") + 1);
      console.log("DATA SENT :",parsedData)
      console.log("file name ", filename)
    
    if (title && category !== "Select Category" && username && data) {
      
      let wisdomData = {
        title,
        author: { name: username, profileImage: { uri: profileImage } },
        category,
        medium: medium, // Pass the selected medium
        likes: 0,
        comments: [{ username: "", text: "" }],
        saved: 0,
      };

      if (medium === "Video") {
        wisdomData = { ...wisdomData, video: parsedData };
      } else if (medium === "Article") {
        wisdomData = { ...wisdomData, article: articleText, image: parsedData };
      }
      // console.log(wisdomData);

      onAddWisdom(wisdomData);

      // if (medium === "Article") {
      //   let formData = new FormData();
      //   const mimeType = mime.lookup(parsedData.uri);
      //   formData.append(
      //     "wisdom",
      //     JSON.stringify({
      //       title: title,
      //       medium: medium,
      //       article: articleText,
      //       category: category,
      //       wisdomOwner: username,
      //     })
      //   );
      //   formData.append("imageFile", {
      //     uri: parsedData.uri,
      //     type: mimeType,
      //     name: filename

      //   });
      //   console.log("formData : ", JSON.stringify(formData))
      //   console.log("formData2 : ", formData)

      //   fetch("https://legasync.azurewebsites.net/wisdom/addArticle", {
      //     method: "POST",
      //     body: JSON.stringify(formData),
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then(response => response.json())
      //   .then(responseJson => {
      //     console.log("Response:", responseJson);
      //     // Handle response as needed
      //   })
      //   .catch(error => {
      //     console.error("Error:", error);
      //     // Handle error as needed
      //   });
    
      // }

      navigation.navigate("TabNavigator");
    } else {
      alert("Please fill in all the required fields.");
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
                  setMedium(option.label)

    
                }}
              />
              {(medium === "Video" || medium === "Article") && (
                <View style={{ marginBottom: 15 }}>
                  <Picker  />
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
