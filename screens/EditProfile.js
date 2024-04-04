import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Textbox from "../component/EditProfile/Textbox";
import BlackButton from "../component/EditProfile/BlackButton";
import Avatar from "../component/EditProfile/Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import { TextInput } from "react-native-gesture-handler";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const route = useRoute();
  const [selectedImage, setSelectedImage] = useState(
    route.params?.profileImage || ""
  );
  const [bio, setBio] = useState(route.params.bio || "");
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedEmail !== null) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    };

    getEmail();
  }, []);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.log("Error retrieving username:", error);
      }
    };

    getUsername();
  }, []);

  const navigation = useNavigation();

  const handleBioChange = (text) => {
    setBio(text);
  };

  const handleImageSelect = (uri) => {
    setSelectedImage(uri);
  };

  const handleSavePress = async () => {
    try {
      await AsyncStorage.setItem("username", username);
      console.log("Username updated successfully:", username);
    } catch (error) {
      console.log("Error updating username:", error);
    }
    // Pass the selected image URI back to the Profile component
    console.log("Selected Image URI:", selectedImage);
    navigation.navigate("Profile", {
      profileImage: selectedImage,
      occupation: bio,
      username: username,
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDeleteAccount = async () => {
    // Show confirmation dialog
    toggleModal();
  };

  const handleConfirmDelete = async () => {
    // Call API to delete account
    const response = await fetch(
      "https://legasync.azurewebsites.net/user/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    const data = await response.json();
    if (data == true) {
      // Account deleted successfully
      // Show success message
      Alert.alert("Success", "Your account has been deleted successfully.", [
        {
          text: "OK",
          onPress: () => {
            // Navigate to login page or any other appropriate action
            navigation.navigate("LoginSignup");
          },
        },
      ]);
      // Perform any other necessary actions after account deletion
    } else {
      // Show error message
      Alert.alert(
        "Error",
        "Failed to delete account. Please check your password and try again."
      );
    }
    toggleModal();
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container1}
      >
        {/* Top section */}
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.backbtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="keyboard-arrow-left" size={50} color="white" />
          </TouchableOpacity>

          <Text style={styles.header}>Edit Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Avatar
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
          ></Avatar>
        </View>

        <View style={styles.bottomSection}>
          <View>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Update your Name"
              placeholderTextColor="grey"
            />
          </View>
          
          <View>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              style={styles.input}
              placeholder="Enter your Bio"
              placeholderTextColor="grey"
            />
          </View>

          <View>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              // placeholder="Update your Username"
              // placeholderTextColor="grey"
              editable={false}
            />
          </View>

          <View>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              editable={false}
            />
          </View>

          <BlackButton onPress={handleSavePress} title="Save" />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleDeleteAccount}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Enter your password to confirm</Text>
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              inputStyle={styles.passwordInput}
              style={styles.password}
              selectionColor="black"
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={toggleModal}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container: {
    backgroundColor: "#2F2D2D",
  },
  topSection: {
    width: "100%",
    height: 200,
    backgroundColor: "#7C7C7C",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileSection: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: -50,
    right: 5,
  },
  bottomSection: {
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: "#2F2D2D",
    alignItems: "center",
    justifyContent: "center",
  },
  inputLabel: {
    color: "white",
    marginBottom: 5,
  },
  input: {
    width: 328,
    height: 57,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 150,

    justifyContent: "center",
  },
  backbtn: {
    marginLeft: 15,
    position: "absolute",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#ed3419",
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

  modalContainer: {
    backgroundColor: "#f3f3f3",
    padding: 50,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 50,
    color: "#a1a1a1",
    fontWeight: "bold",
  },
  password: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
  modalButton: {
    padding: 12,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: "#08d48c",
  },
  cancelButton: {
    backgroundColor: "#ed3419",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditProfile;
