import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Wisdom from "../component/Wisdom";
import { ScrollView } from "react-native-gesture-handler";
import TabNavigator from "../component/TabNavigator";
import FollowingPopup from "../component/FollowingPopup";
import FollowerPopup from "../component/FollowerPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ isYourOwnProfile }) => {
  const [username, setUsername] = useState("");
  const [otherUsername, setOtherUsername] = useState("");
  const [otherProfileImage, setOtherProfileImage] = useState(null);
  const route = useRoute();

  useEffect(() => {
    // Retrieve the initial username from AsyncStorage
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername !== null) {
          setUsername(storedUsername);
          // Optionally update the user state with the retrieved username
          setUser((prevState) => ({
            ...prevState,
            name: storedUsername,
          }));
        }
      } catch (error) {
        console.log("Error retrieving username:", error);
      }
    };

    getUsername();
  }, []);

  useEffect(() => {
    // This useEffect listens for changes in the username parameter passed through navigation
    if (route.params && route.params.username) {
      setUsername(route.params.username);
      // Optionally update the user state with the retrieved username
      setUser((prevState) => ({
        ...prevState,
        name: route.params.username,
      }));
    }
  }, [route.params]);

  useEffect(() => {
    // Retrieve the initial username and profile image from AsyncStorage
    const getUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("other-username");
        const storedProfileImage = await AsyncStorage.getItem(
          "other-profileImage"
        );

        if (storedUsername !== null) {
          setOtherUsername(storedUsername);
        }

        if (storedProfileImage !== null) {
          setOtherProfileImage(storedProfileImage);
        }
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };

    getUserData();
  }, []);

  const state = isYourOwnProfile;
  const navigation = useNavigation();
  const [displayCreated, setDisplayCreated] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false);
  const [showFollowerPopup, setShowFollowerPopup] = useState(false);

  const toggleFollow = () => {
    // Toggle the follow state and update the button text accordingly
    setIsFollowing(!isFollowing);
  };
  const openFollowingPopup = () => {
    navigation.navigate("FollowingPopup", { isYourOwnProfile });
  };

  const openFollowerPopup = () => {
    navigation.navigate("FollowerPopup", { isYourOwnProfile });
  };

  const [articles, setArticles] = useState([
    {
      title: "Surviving a Hollywood life",
      author: {
        name: "Abdul Abir",
        profileImage: require("legasync/Images/Abdul.jpg"),
      },
      image: require("legasync/Images/pic2.png"),
      category: "Technology",
    },
    {
      title: "How to take risks",
      author: {
        name: "Mark Manson",
        profileImage: require("legasync/Images/Mark.jpg"),
      },
      image: require("legasync/Images/pic3.png"),
      category: "Business",
    },
    // ... (more articles)
  ]);

  const [articles2, setArticles2] = useState([
    {
      title: "How to take risks",
      author: {
        name: "Mark Manson",
        profileImage: require("legasync/Images/Mark.jpg"),
      },
      image: require("legasync/Images/pic3.png"),
      category: "Business",
    },
    // ... (more articles)
  ]);

  const [user, setUser] = useState({
    name: "",
    occupation: "",
    followers: 13400,
    following: 1462,
    posts: 1,
    profileImage: require("legasync/Images/proImage.png"),
  });

  useEffect(() => {
    if (route.params && route.params.profileImage) {
      // Update the profile image only if a new image URI is received
      console.log("Received Profile Image URI:", route.params.profileImage);
      AsyncStorage.setItem("userImage", route.params.profileImage)
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: { uri: route.params.profileImage },
      }));
    }
  }, [route.params]);
  

  useEffect(() => {
    if (route.params && route.params.occupation) {
      setUser((prevUser) => ({
        ...prevUser,
        occupation: route.params.occupation,
      }));
    }
  }, [route.params]);

  const handleClick = () => {
    navigation.navigate("LoginSignup");
    
  };
  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      profileImage: user.profileImage.uri,
      bio: user.occupation,
    });
  };

  const chunkArray = (array, chunkSize) => {
    return Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
  };

  const articlesInRows = chunkArray(articles, 2);
  const articles2InRows = chunkArray(articles2, 2);
  const optionContainerStyles = useMemo(() => {
    return [
      styles.optionContainer,
      isYourOwnProfile
        ? styles.optionContainerOwnProfile
        : styles.optionContainerOtherProfile,
    ];
  }, [isYourOwnProfile]);

  return (
    <ScrollView style={styles.scrollable}>
      <View style={styles.container}>
        {!isYourOwnProfile && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{"< Back"}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.header}>
          {/* <Image source={typeof user.profileImage === 'string' ? { uri: user.profileImage } : user.profileImage} style={styles.profileImage} />
          <Text style={styles.name}>{user.name}</Text> */}
          <Image
            source={isYourOwnProfile ? user.profileImage : otherProfileImage}
            style={styles.profileImage}
          />
          <Text style={styles.name}>
            {isYourOwnProfile ? user.name : otherUsername}
          </Text>
          <Text style={styles.occupation}>{user.occupation}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <TouchableOpacity
              onPress={() => setShowFollowerPopup(true)}
              style={{ textAlign: "center", flex: 1, alignItems: "center" }}
            >
              <Text style={styles.statsNumber}>{user.followers}</Text>
              <Text style={styles.statsLabel}>Followers</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsRow}>
            <TouchableOpacity
              onPress={() => setShowFollowingPopup(true)}
              style={{ textAlign: "center", flex: 1, alignItems: "center" }}
            >
              <Text style={styles.statsNumber}>{user.following}</Text>
              <Text style={styles.statsLabel}>Following</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsNumber}>{user.posts}</Text>
            <Text style={styles.statsLabel}>Posts</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {isYourOwnProfile ? (
            <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
              <Text style={styles.buttonText}>{"Edit Profile"}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={toggleFollow}>
              <Text style={styles.buttonText}>
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={optionContainerStyles}>
          <TouchableOpacity
            style={displayCreated ? styles.selectedOption : styles.option}
            onPress={() => setDisplayCreated(true)}
          >
            <Text style={styles.buttonText2}>{"CREATED"}</Text>
          </TouchableOpacity>
          {isYourOwnProfile && (
            <TouchableOpacity
              style={!displayCreated ? styles.selectedOption : styles.option}
              onPress={() => setDisplayCreated(false)}
            >
              <Text style={styles.buttonText2}>{"SAVED"}</Text>
            </TouchableOpacity>
          )}
        </View>

        {displayCreated ? (
          <View style={styles.articlesContainer}>
            {articlesInRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.rowContainer}>
                {row.map((article, index) => (
                  <View style={styles.articleContainer} key={index}>
                    <Wisdom
                      key={index}
                      article={article}
                      onPress={() =>
                        navigation.navigate("WisdomDetail", { article })
                      }
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.articlesContainer}>
            {articles2InRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.rowContainer}>
                {row.map((article, index) => (
                  <View style={styles.articleContainer} key={index}>
                    <Wisdom
                      key={index}
                      article={article}
                      onPress={() =>
                        navigation.navigate("WisdomDetail", { article })
                      }
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {isYourOwnProfile && (
          <View style={styles.buttonContainer2}>
            <TouchableOpacity style={styles.button} onPress={handleClick}>
              <Text style={styles.buttonText}>{"Log out"}</Text>
            </TouchableOpacity>
          </View>
        )}
        {showFollowingPopup && (
          <FollowingPopup
            isYourOwnProfile={isYourOwnProfile}
            onClose={() => setShowFollowingPopup(false)}
          />
        )}
        {showFollowerPopup && (
          <FollowerPopup
            isYourOwnProfile={isYourOwnProfile}
            onClose={() => setShowFollowerPopup(false)}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F2D2D",
    padding: "2%",
  },
  scrollable: {
    backgroundColor: "#2F2D2D",
    paddingTop: "10%",
  },
  articlesContainer: {
    width: "50%",
    marginBottom: 60,
  },
  articleContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 10,
  },
  selectedOption: {
    borderBottomColor: "white",
    borderBottomWidth: 3,
    padding: "1%",
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  occupation: {
    fontSize: 15,
    marginTop: 20,
    color: "white",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
  statsRow: {
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
  },
  statsNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  statsLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  bioContainer: {
    marginTop: 20,
    padding: 10,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  bioText: {
    fontSize: 16,
    color: "white",
    marginBottom: 30,
  },
  buttonContainer: {
    overflow: "hidden", // This ensures that the borderRadius is applied to the child components
    marginTop: 50,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer2: {
    overflow: "hidden", // This ensures that the borderRadius is applied to the child components
    marginTop: 50,
    alignItems: "center",
    marginBottom: 50,
  },

  button: {
    display: "flex",
    backgroundColor: "#FDE48A",
    borderRadius: 50,
    padding: "3%",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
  },
  buttonText2: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    padding: "2%",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20%",
    paddingTop: "10%",
    paddingBottom: "20%",
  },
  optionContainerOwnProfile: {
    justifyContent: "space-between",
  },
  optionContainerOtherProfile: {
    justifyContent: "center",
  },
  backButton: {
    marginLeft: 10,
    marginTop: 10,
    padding: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Profile;
