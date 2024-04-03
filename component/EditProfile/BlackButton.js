import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const BlackButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#24ac9f",
    width: 250,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BlackButton;
