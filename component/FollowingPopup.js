import React, { useState , useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const FollowingPopup = ({ isYourOwnProfile, onClose, visible, followingList: propFollowingList }) => {
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    // Set the following list only if it's not already set
    setFollowingList(propFollowingList);
    console.log(propFollowingList)
  }, [propFollowingList]);

  const handleToggleFollow = (index) => {
    // Implement logic to toggle follow status if needed
    console.log(`Toggle follow for ${followingList[index].username}`);

    // Update the list and remove the user at the specified index
    const updatedList = [...followingList];
    updatedList.splice(index, 1);
    setFollowingList(updatedList);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Following</Text>
          {propFollowingList.map((user, index) => (
            <View key={index} style={styles.userContainer}>
              <View style={styles.userInfo}>
                <Image source={{ uri: user.urlpro }} style={styles.profileImage} />
                <Text style={styles.username}>{user.username}</Text>
              </View>
              {isYourOwnProfile && (
                <TouchableOpacity onPress={() => handleToggleFollow(index)}>
                  <Text style={styles.toggleFollowButton}>{'Unfollow'}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '80%',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginBottom: 15,
    padding: 10,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    objectFit: 'cover'
  },
  username: {
    fontSize: 16,
  },
  toggleFollowButton: {
    color: 'red',
    fontSize: 16,
  },
  closeButton: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default FollowingPopup;
