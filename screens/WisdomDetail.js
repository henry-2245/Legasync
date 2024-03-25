import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Wisdom from "../component/Wisdom";
import CommentPopup from "../component/CommentPopup";

const WisdomDetail = ({ route }) => {
  const { article } = route.params;
  const navigation = useNavigation();
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
      title: "Surviving a Hollywood life",
      author: {
        name: "Abdul Abir",
        profileImage: require("legasync/Images/Abdul.jpg"),
      },
      image: require("legasync/Images/pic2.png"),
      category: "Technology",
    },

    // Add more articles...
  ]);
  const [comments, setComments] = useState([
    { username: "User1", commentText: "Great article!" },
    { username: "User2", commentText: "I enjoyed reading this." },
   
  ]);
  const [isHearted, setIsHearted] = useState(false);
  const [commentPopupVisible, setCommentPopupVisible] = useState(false);

  const handleHeartPress = () => {
    // Toggle the heart icon and update the like count
    setIsHearted((prev) => !prev);
  };

  const handleChatBubblePress = () => {
    // Show the comment popup
    setCommentPopupVisible(true);
  };

  const handleCloseCommentPopup = (updatedComments) => {
    if (Array.isArray(updatedComments)) {
        // Update the comments and hide the popup
        setComments(updatedComments);
      }
      setCommentPopupVisible(false);
  };

  // Helper function to chunk the articles into rows
  const chunkArray = (array, chunkSize) => {
    return Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
  };

  // Get the articles in chunks of two
  const articlesInRows = chunkArray(articles, 2);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Scroll to the top when the article changes
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("OtherProfile", { isYourOwnProfile: false })
          }
        >
          <View style={styles.authorContainer}>
            <Image
              source={article.author.profileImage}
              style={styles.profileImage}
            />
            <Text style={styles.authorName}>{article.author.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={article.image} style={styles.articleImage} />

      {/* Menu Bar */}
      <Text style={styles.title}>{article.title}</Text>
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
          <Text style={styles.menuBarText}>{isHearted ? 21 : 20}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuBarButton}
          onPress={handleChatBubblePress}
        >
          <Ionicons name="chatbubbles-outline" size={26} color="#E0E0E0" />
          <Text style={styles.menuBarText}>
            {comments ? comments.length : 0}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBarButton}>
          <Ionicons name="bookmark-outline" size={26} color="#E0E0E0" />
          <Text style={styles.menuBarText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBarButton}>
          <Ionicons name="share-social-outline" size={26} color="#E0E0E0" />
          <Text style={styles.menuBarText}>1</Text>
        </TouchableOpacity>
      </View>
      

      <Text style={styles.articleBody}>{article.body || ""}</Text>
      <View style={{ marginTop: commentPopupVisible ? "90%" : 0 }}>
        {commentPopupVisible && (
          <CommentPopup comments={comments} onClose={handleCloseCommentPopup} />
        )}
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
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
 
});

export default WisdomDetail;
