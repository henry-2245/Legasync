import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { EvilIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function NewAddWisdom() {
  const PostMedia = () => {
    console.log();
  };

  return (
    <View style={styles.container}>
      <View>
        <EvilIcons name="close" size={30} color={Colors.light.tint}></EvilIcons>
        <TouchableOpacity style={styles.button} onPres={PostMedia}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
