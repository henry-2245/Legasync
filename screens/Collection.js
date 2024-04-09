import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Wisdom from "../component/Wisdom"; // Import the Wisdom component
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const Collection = ({ route }) => {
  const { listWisdom } = route.params.listWisdom;
  console.log("first", listWisdom);
  const navigation = useNavigation();
  const collectDescript = route.params.listWisdom.collectDescript;
  const collectTitle = route.params.listWisdom.collectTitle;
  console.log(route.params);

  console.log(collectTitle);
  console.log(collectDescript);

  // Calculate the width of each Wisdom component based on screen width
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 40) / 2; // Subtracting padding and margin
  const chunkArray = (array, chunkSize) => {
    return Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
  };
  const articlesInRows = chunkArray(listWisdom, 2);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{"< Back"}</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{collectTitle}</Text>
          <Text style={styles.description}>{collectDescript}</Text>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
    backgroundColor: "#2F2D2D",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
  textContainer:{
    paddingVertical: 30,
    paddingHorizontal: 10,

  },
  wisdomContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
});

export default Collection;
