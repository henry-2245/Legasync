import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const FollowerPopup = ({
  isYourOwnProfile,
  onClose,
  visible,
  followersList: propFollowersList,
}) => {
  const [followersList, setFollowersList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Set the followers list only if it's not already set
    setFollowersList(propFollowersList);
  }, [propFollowersList]);

  const handleRemoveFollower = async (index) => {
    try {
      // Retrieve the username of the follower to be removed
      const removedFollowerUsername = followersList[index].username;

      // Get the current user's username from AsyncStorage
      const currentUserUsername = await AsyncStorage.getItem("username");

      // Send a request to the API to remove the follower
      const response = await fetch(
        "https://legasync.azurewebsites.net/user/removeFollow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            follower: removedFollowerUsername,
            following: currentUserUsername,
          }),
        }
      );

      // Check if the request was successful
      if (response.ok) {
        const responseData = await response.text();
        if (responseData === "Success: Unfollow ") {
          console.log(
            `Successfully removed follower: ${removedFollowerUsername}`
          );

          // Update the local state to remove the follower
          const updatedList = [...followersList];
          updatedList.splice(index, 1);
          setFollowersList(updatedList);
        } else {
          console.error("Failed to remove follower:", responseData);
        }
      } else {
        // Handle error response from the server
        console.error("Failed to remove follower");
      }
    } catch (error) {
      console.error("Error removing follower:", error);
    }
  };

  const handleProfileClick = async (username) => {
    try {
      // Close the FollowerPopup
      onClose();

      // Store the other user's username in AsyncStorage
      await AsyncStorage.setItem("other-username", username);
      const Ownusername = await AsyncStorage.getItem("username");
      if (username == Ownusername) {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("Profile");
        navigation.navigate("OtherProfile", { isYourOwnProfile: false });
      }
    } catch (error) {
      console.error("Error storing other username:", error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Followers</Text>
          {followersList.map((user, index) => (
            <View key={index} style={styles.userContainer}>
              <TouchableOpacity
                onPress={() => handleProfileClick(user.username)}
              >
                <View style={styles.userInfo}>
                  <Image
                    source={{ uri: user.urlpro }}
                    style={styles.profileImage}
                  />
                  <Text style={styles.username}>{user.username}</Text>
                </View>
              </TouchableOpacity>
              {isYourOwnProfile && (
                <TouchableOpacity onPress={() => handleRemoveFollower(index)}>
                  <Text style={styles.removeFollowerButton}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    backgroundColor: "#d3d3d3",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginBottom: 15,
    padding: 10,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
  },
  removeFollowerButton: {
    color: "red",
    fontSize: 16,
  },
  closeButton: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});

export default FollowerPopup;
