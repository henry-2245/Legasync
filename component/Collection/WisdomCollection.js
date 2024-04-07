import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const WisdomCollection = ({ wisdom }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Images */}
        {wisdom.slice(5, 6).map((item, index) => (
          <View key={index} style={[styles.imageContainer, styles.firstImageContainer]}>
            <Image
              source={{ uri: item.urlpic }}
              style={[styles.image, styles.firstImage]}
            />
          </View>
        ))}
        <View style={styles.columnContainer}>
          {wisdom.slice(6, 8).map((item, index) => (
            <View key={index} style={[styles.imageContainer, styles.otherImageContainer]}>
              <Image
                source={{ uri: item.urlpic }}
                style={[styles.image, styles.otherImage]}
              />
            </View>
          ))}
        </View>
      </View>
      {/* Text */}
      <Text style={styles.text}>Your text goes here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  imageContainer: {
    width: 'auto',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  image: {
    aspectRatio: 1,
  },
  firstImageContainer: {},
  firstImage: {
    width: 'auto',
    height: 152,
    objectFit: 'cover',
  },
  columnContainer: {},
  otherImageContainer: {
    borderLeftWidth: 2,
    borderLeftColor: 'white',
    flexDirection: 'column',
    marginBottom: 0,
  },
  otherImage: {
    width: 'auto',
    height: 75,
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: '18px',
    color: 'white',
  },
});

export default WisdomCollection;
