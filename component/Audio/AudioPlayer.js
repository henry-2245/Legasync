import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayer = ({ uri }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  console.log(uri)

  const handlePressPlay = async () => {
    try {
      // Load the sound from the provided URI every time the button is pressed
      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
  
      // If the audio is currently playing, pause it
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        // If the audio is paused or stopped, play it
        await newSound.playAsync();
      }
  
      // Update the sound state with the new sound instance
      setSound(newSound);
  
      // Update the playing state
      setIsPlaying(!isPlaying);
  
      // Listen for the audio playback status to determine when it ends
      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          // If the audio playback has ended, reset the playing state to false
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Failed to load or play sound', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePressPlay}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    width: '50%',
    backgroundColor: '#f9f9fa',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AudioPlayer;
