import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

const Avatar = ({selectedImage, onImageSelect }) => {


  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!(result.canceled)) {
      onImageSelect(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={handleImageSelection}>
      <Image source={{ uri: selectedImage }} style={styles.profile}></Image>

      <View style={styles.uploadbtn}>
        <MaterialIcons name="photo-camera" size={19} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  uploadbtn: {
    position: "absolute",
    backgroundColor: "#D3D3D3",
    borderRadius: 24,
    bottom: 0,
    right: -19,
    zIndex: 9999,
    padding: 10,
  },
  profile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden",
  },
});

export default Avatar;
