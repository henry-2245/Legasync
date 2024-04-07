import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Wisdom from "../component/Wisdom";
import CommentPopup from "../component/CommentPopup";
import SaveToListPopup from "../component/SavedCollection/SaveToListPopup"; // Import the SaveToListPopup component
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";
import { MaterialIcons } from '@expo/vector-icons';

const WisdomDetail = ({ route }) => {
  const { article } = route.params;
  const navigation = useNavigation();
  const [initialLikeCount, setInitialLikeCount] = useState(article.likes);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [articles, setArticles] = useState("");
  const [comments, setComments] = useState([]);
  const [isHearted, setIsHearted] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false)
  const [commentPopupVisible, setCommentPopupVisible] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false); // State for controlling the visibility of SaveToListPopup
  const existingLists = [
    { id: 1, name: "Favorites" },
    { id: 2, name: "To Read" },
    { id: 3, name: "Watch Later" },
    // More lists...
  ];
  

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('https://legasync.azurewebsites.net/wisdom/getAll')
      .then(response => response.json())
      .then(data => {
        setArticles(data); // Update articles state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleHeartPress = () => {
    setIsHearted((prev) => !prev);
    article.likeAmount += isHearted ? -1 : 1;
  };
  const handleBookmarkPress = () => {
    setIsBookmark((prev) => !prev);
    article.bookmarkAmount += isBookmark ? -1 : 1;
    setShowSavePopup(true)

  }

  const handleProfilePress = async () => {
    const username = (await AsyncStorage.getItem("username")).toString()
    if(username === article.wisdomOwner){
      navigation.navigate("Profile", {isYourOwnProfile: true})
    }
    else{
      navigation.navigate("OtherProfile", {
        isYourOwnProfile: false,
      });
    }
    try {
      await AsyncStorage.setItem("other-username", article.wisdomOwner);
      await AsyncStorage.setItem(
        "other-profileImage",
        article.urlpro
      );
      console.log("Data stored successfully");
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  const handleChatBubblePress = () => {
    setCommentPopupVisible(!commentPopupVisible); // Toggle commentPopupVisible state
  };

  const handleCloseCommentPopup = (updatedComments) => {
    if (Array.isArray(updatedComments)) {
      setComments(updatedComments);
    }
    setCommentPopupVisible(false);
  };

  const handlePressPlay = () => {
    setIsPlaying(true);
    setShowControls(true);
  };

  const handleSaveToList = (listName) => {
    // Implement logic for saving wisdom to the selected or created list
    console.log('Saving wisdom to list:', listName);
  };

  const chunkArray = (array, chunkSize) => {
    return Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
  };

  const articlesInRows = chunkArray(articles, 2);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [article]);

  useEffect(() => {
    setIsHearted(false);
    article.likes = initialLikeCount;
    setComments([]);
    setCommentPopupVisible(false);
  }, [article]);

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{"< Back"}</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress}>
          <View style={styles.authorContainer}>
            <Image
              source={{uri: article.urlpro}}
              style={styles.profileImage}
            />
            <Text style={styles.authorName}>{article.wisdomOwner}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {article.medium === "video" ? (
        <View style={styles.contentContainer}>
          <Video
          source={{uri : article.urlvid}}
          style={styles.video}
          useNativeControls
          resizeMode="cover"
          isLooping
          shouldPlay={isPlaying}
          onPlaybackStatusUpdate={status => {
            if (status.isPlaying) {
              setIsPlaying(true);
            }
          }}
          
        />
        {!isPlaying && (
          <TouchableOpacity style={styles.playButton} onPress={handlePressPlay}>
            <MaterialIcons name="play-arrow" size={100} color="white" />
          </TouchableOpacity>
        )}

        </View>

      ) : (
        <View style={styles.contentContainer}>
          <Image source={{uri : article.urlpic}} style={styles.articleImage} />
        </View>
      )}

      <Text style={styles.title}>{article.title}</Text>
      {article.medium === "article" && (
        <View style={styles.articleTextContainer}>
          <Text style={styles.article}>{article.article}</Text>
        </View>
      )}

      <View style={styles.menuBar}>
        <TouchableOpacity
          style={styles.menuBarButton}
          onPress={handleHeartPress}
        >
          <Ionicons
            name={isHearted ? "heart" : "heart-outline"}
            size={26}
            color={isHearted ? "red" : "#E0E0E0"}
          />
          <Text style={styles.menuBarText}>{article.likeAmount || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuBarButton}
          onPress={handleChatBubblePress}
        >
          <Ionicons name="chatbubbles-outline" size={26} color="#E0E0E0" />
          <Text style={styles.menuBarText}>
            {article.comment ? article.comment : 0}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBarButton} onPress={handleBookmarkPress}>
          <Ionicons 
          name={isBookmark ? "bookmark" : "bookmark-outline"} 
          size={26} 
          color={isBookmark ? "yellow" : "#E0E0E0"} />
          <Text style={styles.menuBarText}>{article.bookmarkAmount || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBarButton}>
          <Ionicons name="share-social-outline" size={26} color="#E0E0E0" />
          <Text style={styles.menuBarText}>1</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.articleBody}>{article.body || ""}</Text>

      {commentPopupVisible && (
        <CommentPopup
          comments={[]}
          onClose={handleCloseCommentPopup}
          setComments={setComments}
        />
      )}

      {showSavePopup && (
        <SaveToListPopup onClose={() => setShowSavePopup(false)} onSave={handleSaveToList} existingLists={existingLists}/>
      )}

      <View style={styles.moreText}>
        <View style={styles.discoverWrapper}>
          <Text style={styles.Discover}>More to explore</Text>
        </View>
      </View>

      <View style={styles.articlesContainer}>
        {articlesInRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((article, index) => (
              <View style={styles.articleContainer}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2F2D2D",
    padding: 25,
    paddingTop: 80,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
    marginBottom: 20,
  },
  articleTextContainer: {
    borderTopWidth: 3,
    borderTopColor: "grey",
    paddingLeft: 5,
    paddingRight: 5,
  },
  article: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
    marginBottom: 40,
  },
  authorContainer: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    color: "#E0E0E0",
  },
  articleImage: {
    width: "100%",
    height: 350,
    marginBottom: 20,
    objectFit: "contain",
  },
  menuBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  menuBarButton: {
    alignItems: "center",
  },
  menuBarText: {
    color: "#E0E0E0",
    padding: "2%",
  },
  articleBody: {
    fontSize: 16,
    color: "#E0E0E0",
    lineHeight: 24,
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: "white",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 10,
  },
  articlesContainer: {
    width: "50%",
    marginBottom: 100,
  },
  articleContainer: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  moreText: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  discoverWrapper: {
    borderTopWidth: 3,
    borderTopColor: "grey",
    marginTop: "5%",
    paddingTop: "8%",
    paddingBottom: "1%",
    marginBottom: "10%",
    width: "100%",
  },
  Discover: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  video: {
    width: '100%',
    height: 400,
    flex: 1,
    alignSelf: "center",
    backgroundColor: "black",
  },
  contentContainer:{
    padding: 10,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 1,
  },
});

export default WisdomDetail;
