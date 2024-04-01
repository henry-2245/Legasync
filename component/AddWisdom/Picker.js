import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import FileViewer from "./FileViewer";
import Button from "./Button";

const Picker = ({}) => {
  // const PlaceholderImage = require("legasync/Images/Grace.jpg");
  const PlaceholderVideo = {
    uri: null,
    type: "image",
  };

  // const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const pickMediaAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedFile(result.assets[0]);
    } else {
      alert("You did not select any media.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FileViewer
          placeholderFileSource={PlaceholderVideo}
          selectedFile={selectedFile}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme="primary"
          label="Choose a File"
          onPress={pickMediaAsync}
        />
        <Button label="Use this File" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flexGrow: 1,
    height: 200,
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "purple",
    alignItems: "center",
    paddingTop: 20,
  },
});

export default Picker;
