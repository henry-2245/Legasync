import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import ImageViewer from "./ImageViewer";
import Button from "./Button";

const Picker = ({}) => {
  const PlaceholderImage = require("legasync/Images/Grace.jpg");

  const [selectedImage, setSelectedImage] = useState(null);

  const pickMediaAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any media.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme="primary"
          label="Choose a Photo"
          onPress={pickMediaAsync}
        />
        <Button label="Use this Photo" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 0,
    paddingBottom: 18,
  },

  footerContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "purple",
    alignItems: "center",
  },
});

export default Picker;
