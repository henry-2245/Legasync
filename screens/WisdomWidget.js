import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const WisdomWidget = ({ title, image, text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2F2D2D',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default WisdomWidget;