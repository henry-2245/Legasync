import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommentPopup = ({ comments, onClose, setComments, wisdomID }) => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.log('Error retrieving username:', error);
      }
    };
  
    getUsername();
  }, []);

  

  const handleCommentSubmit = async () => {
    // Handle submitting the comment only if it's not empty
    if (comment.trim() !== "") {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const response = await fetch('https://legasync.azurewebsites.net/wisdom/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wisdomID: wisdomID,
            username: storedUsername,
            comment: comment.trim(),
          }),
        });
        const responseData = await response.text();
        if (responseData === 'Success: Comment') {
          // Add the new comment to the comments list
          const newComment = { username: storedUsername, comment: comment.trim() };
          setComments(prevComments => [...prevComments, newComment]);
          setComment(""); // Clear the comment input after posting
          // Scroll to the bottom of the ScrollView
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        } else {
          console.error('Failed to post comment:', responseData);
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };
  
    

  return (
    <View style={styles.popupContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Comments</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView ref={scrollViewRef} style={styles.commentsContainer}>
        {comments.map((c, index) => (
          <View key={index} style={styles.commentItem}>
            <Text style={styles.commentUsername}>{c.username}</Text>
            <Text style={styles.commentText}>{c.comment}</Text>
          </View>
        ))}
        <View style={styles.scrollEndDummy} />
      </ScrollView>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a public comment..."
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <TouchableOpacity
        style={[styles.postButton, !comment.trim() && styles.disabledButton]}
        onPress={handleCommentSubmit}
        disabled={!comment.trim()}
      >
        <Text style={styles.postButtonText}>Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: 0, // Adjusted marginTop value
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  commentsContainer: {
    maxHeight: 200, // Set a max height for the comments container to make it scrollable
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F0F2F5",
    borderRadius: 8,
  },
  commentUsername: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  commentText: {
    color: "#000",
  },
  scrollEndDummy: {
    height: 1, // A dummy view at the end of the ScrollView to ensure it scrolls to the very bottom
    marginBottom: 100, // Adjust this value as needed
  },
  commentInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  postButton: {
    backgroundColor: "#1877F2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#B0C4DE",
  },
});

export default CommentPopup;