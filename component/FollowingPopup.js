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

const FollowingPopup = ({
  isYourOwnProfile,
  onClose,
  visible,
  followingList: propFollowingList,
}) => {
  const [followingList, setFollowingList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Set the following list only if it's not already set
    setFollowingList(propFollowingList);
  }, [propFollowingList]);

  const handleToggleFollow = async (index) => {
    // Implementation remains the same
  };

  const handleProfileClick = async (username) => {
    try {
      onClose();
      // Store the other user's username in AsyncStorage
      await AsyncStorage.setItem("other-username", username);
      const Ownusername = await AsyncStorage.getItem("username");

      // Navigate to the OtherProfile screen
      if(username == Ownusername ){
        navigation.navigate("Profile");
      }
      else{
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
          <Text style={styles.title}>Following</Text>
          {followingList.map((user, index) => (
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
                <TouchableOpacity onPress={() => handleToggleFollow(index)}>
                  <Text style={styles.toggleFollowButton}>Unfollow</Text>
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
    width: "80%",
    backgroundColor: "#d3d3d3",
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
    objectFit: "cover",
  },
  username: {
    fontSize: 16,
  },
  toggleFollowButton: {
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

export default FollowingPopup;
