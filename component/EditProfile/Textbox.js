import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const Textbox = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  label: {
    color: "white",
    fontSize: 18,
    // fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    padding: 8,
    fontSize: 16,
    color:"white",
  },
});

export default Textbox;
