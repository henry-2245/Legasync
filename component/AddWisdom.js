import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalSelector from "react-native-modal-selector";
import Picker from "./Picker";

const AddWisdom = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");

  const categories = [
    { key: 0, label: "Technology" },
    { key: 1, label: "Computer Science" },
    { key: 2, label: "Scientific" },
    // Add more categories as needed
  ];

  const mediums = [
    { key: 0, label: "Voice Record" },
    { key: 1, label: "Video" },
    { key: 2, label: "Text" },
    // Add more mediums as needed
  ];

  useEffect(() => {
    // Set initial values when the component mounts
    setCategory("Select Category");
    setMedium("Select Medium");
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        }}
      >
        <View
          style={{
            height: "80%", // Adjust height as needed
            width: "90%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            justifyContent: "space-between", // Align items with space between them
          }}
        >
          {/* Modal content */}
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
                marginBottom: 15,
                padding: 10,
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

            {/* Use ModalSelector for category dropdown */}
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

            {/* Use ModalSelector for medium dropdown */}
            <ModalSelector
              data={mediums}
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
              onChange={(option) => setMedium(option.label)}
            />
          </View>

          <View 
          style={{ 
            flexDirection: "row",
            
            }}
          >
            <Picker></Picker>
          </View>

          {/* Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={{ width: 120 }}>
              <Button
                title="Cancel"
                onPress={onClose}
                color="#808080" // Adjust the color to match your design
              />
            </View>

            <View style={{ width: 120 }}>
              <Button
                title="Submit"
                onPress={() => onSubmit({ title, category, medium })}
                color="#f5ca31" // Adjust the color to match your design
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddWisdom;
