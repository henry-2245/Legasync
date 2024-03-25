import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

const CommentPopup = ({ comments, onClose }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    // Handle submitting the comment only if it's not empty
    if (comment.trim() !== "") {
      onClose([...(comments || []), { username: "Chxttp", commentText: comment.trim() }]);
      // Clear the comment input after posting
      setComment("");
    }
  };

  return (
    <View style={styles.popupContainer}>
      <View style={styles.commentsContainer}>
        {comments.map((c, index) => (
          <View key={index} style={styles.commentItem}>
            <Text style={styles.commentUsername}>{c.username}</Text>
            <Text style={styles.commentText}>{c.commentText}</Text>
          </View>
        ))}
      </View>
      <TextInput
        style={styles.commentInput}
        placeholder="Write a comment..."
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <TouchableOpacity
        style={[styles.postButton, !comment.trim() && styles.disabledButton]}
        onPress={handleCommentSubmit}
        disabled={!comment.trim()}
      >
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: '10%',
  },
  commentsContainer: {
    marginBottom: 10,
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F0F2F5", // Background color for each comment
    borderRadius: 8,
  },
  commentUsername: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1877F2", // Facebook blue color
  },
  commentText: {
    color: "#000", // Black color for comment text
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
    marginBottom: 10,
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#B0C4DE", // Use a different color for disabled state
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "#1877F2", // Facebook blue color
  },
});

export default CommentPopup;
