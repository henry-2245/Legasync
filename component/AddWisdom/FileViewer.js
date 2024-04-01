import { StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Video } from "expo-av";
// import {
//   VESDK,
//   VideoEditorModal,
//   Configuration,
// } from "react-native-videoeditorsdk";

export default function FileViewer({ placeholderFileSource, selectedFile }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const fileSource = selectedFile ? selectedFile : placeholderFileSource;

  return fileSource.type === "video" ? (
    <Video
      ref={video}
      source={{ uri: fileSource.uri }}
      style={styles.video}
      useNativeControls
      resizeMode="contain"
      isLooping
      onPlaybackStatusUpdate={setStatus}
      shouldPlay
    />
  ) : (
    <Image source={fileSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 18,
  },
  video: {
    width: 200,
    height: 200,
    flex: 1,
    alignSelf: "center",
    backgroundColor: "black",
  },
});
