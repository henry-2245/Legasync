import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import ModalSelector from "react-native-modal-selector";

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
            width: "80%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
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
            initValueTextStyle={{ color: category === "Select Category" ? "#808080" : "#000" }}
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
            initValueTextStyle={{ color: medium === "Select Medium" ? "#808080" : "#000" }}
            selectTextStyle={{ color: "#000" }}
            onChange={(option) => setMedium(option.label)}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              title="Cancel"
              onPress={onClose}
              color="#808080" // Adjust the color to match your design
            />
            <Button
              title="Submit"
              onPress={() => onSubmit({ title, category, medium })}
              color="#FDE48A" // Adjust the color to match your design
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddWisdom;
