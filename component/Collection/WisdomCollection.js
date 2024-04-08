import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const WisdomCollection = ({ wisdom, onPress }) => {
  const listWisdom = wisdom.listWisdom;

  if (listWisdom && listWisdom.length > 0) {
    // Filter listWisdom to only include items where medium is 'article'
    const articleWisdom = listWisdom.filter(
      (item) => item.medium === "article"
    );

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.outerContainer}>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              {articleWisdom.slice(0, 1).map((item, index) => (
                <View
                  key={index}
                  style={[styles.imageContainer, styles.firstImageContainer]}
                >
                  <Image
                    source={{ uri: item.urlpic }}
                    style={[styles.image, styles.firstImage]}
                  />
                </View>
              ))}
              <View style={styles.columnContainer}>
                {articleWisdom.slice(1, 3).map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.imageContainer,
                      styles.otherImageContainer(index), // Pass the index to otherImageContainer style
                    ]}
                  >
                    <Image
                      source={{ uri: item.urlpic }}
                      style={[styles.image, styles.otherImage]}
                    />
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{wisdom.collectTitle}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  outerContainer: {
    overflow: "hidden",
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    padding: 1,
    backgroundColor: "#262626",
    alignItems: "center", // Center the text horizontally
    borderBottomLeftRadius: 10, // Apply border radius to bottom-left corner
    borderBottomRightRadius: 10,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "white",
  },
  wrapper: {
    flexDirection: "row",
  },
  imageContainer: {
    width: "auto",
  },
  image: {
    aspectRatio: 1,
   
  },
  firstImageContainer: {
    objectFit: 'cover',
    borderTopLeftRadius: 5,
    borderLeftWidth: 2,
    borderColor: "white",
    borderTopWidth: 2,
    borderColor: "white",
    borderBottomWidth: 2,
    borderColor: "white",
  },
  firstImage: {
    width: "auto",
    height: 152,
    objectFit: "cover",
  },
  columnContainer: { borderWidth: 2, borderColor: "white", borderTopRightRadius: 5 },
  otherImageContainer: (index) => ({
    flexDirection: "column",
    marginBottom: 0,
    ...(index === 0 && { borderBottomWidth: 2, borderColor: "white" }), // Apply border to the second image container
  }),
  otherImage: {
    width: "auto",
    height: 75,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 15,
    fontSize: 18,
    color: "white",
  },
});

export default WisdomCollection;
