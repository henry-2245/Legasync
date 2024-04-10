import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Wisdom from "../component/Wisdom";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const [articles, setArticles] = useState("");

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("https://legasync.azurewebsites.net/wisdom/getMostLiked")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data); // Update articles state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    console.log(searchText); // Handle search logic here
  };
  const chunkArray = (array, chunkSize) => {
    return Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
  };
  const articlesInRows = chunkArray(articles, 2);

  const handleCategoryClick = (category) => {
    navigation.navigate("Home", { selectedCategory: category });
  };

  return (
    <ScrollView style={styles.scrollable}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image style={styles.searchIcon} />
          <TextInput
            style={styles.searchText}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.forYouContainer}>
          <Text style={styles.forYouText}>{"Categories for you"}</Text>
          <View style={styles.forYouContent}>
            <View style={styles.contentWrapper}>
              <TouchableOpacity
                onPress={() => handleCategoryClick("Career")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("legasync/Images/Career.png")}
                  style={styles.contentImage}
                />
                <Text style={styles.contentText}>{"Career"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <TouchableOpacity
                onPress={() => handleCategoryClick("Personal Growth")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("legasync/Images/Personal-growth.jpeg")}
                  style={styles.contentImage}
                />
                <Text style={styles.contentText}>{"Personal Growth"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.forYouContent}>
            <View style={styles.contentWrapper}>
              <TouchableOpacity
                onPress={() => handleCategoryClick("Relationship")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("legasync/Images/relationship.jpeg")}
                  style={styles.contentImage}
                />
                <Text style={styles.contentText}>{"Relationship"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <TouchableOpacity
                onPress={() => handleCategoryClick("Health and Wellness")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("legasync/Images/health.jpeg")}
                  style={styles.contentImage}
                />
                <Text style={styles.contentText}>{"Health and Wellness"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.forYouContent}>
            <View style={styles.contentWrapper}>
              <TouchableOpacity
                onPress={() => handleCategoryClick("Family")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("legasync/Images/family.jpeg")}
                  style={styles.contentImage}
                />
                <Text style={styles.contentText}>{"Family"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <TouchableOpacity
                onPress={() => handleCategoryClick("Education")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("legasync/Images/Education.png")}
                  style={styles.contentImage}
                />
                <Text style={styles.contentText}>{"Education"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.forYouContent}>
            <View style={styles.contentWrapper}>
              <TouchableOpacity
                onPress={() => handleCategoryClick("Business")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("legasync/Images/business.jpeg")}
                  style={styles.contentImage}
                />
                <Text style={styles.contentText}>{"Business"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <TouchableOpacity
                onPress={() => handleCategoryClick("Spirituality")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("legasync/Images/spirituality.jpeg")}
                  style={styles.contentImage}
                />
                <Text style={styles.contentText}>{"Spirituality"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.trendingContainer}>
          <Text style={styles.trendingText}>Most liked Wisdom</Text>
          <View style={styles.articlesContainer}>
            {articlesInRows.slice(0, 3).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.rowContainer}>
                {row.map((article, index) => (
                  <View style={styles.articleContainer} key={index}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2F2D2D",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollable: {
    backgroundColor: "#2F2D2D",
    paddingTop: "12%",
  },
  searchIcon: {
    // Add styles for search icon
  },
  searchText: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 18,
    marginRight: 15,
  },
  searchButton: {
    backgroundColor: "#d9d9d9",
    padding: 10,
    borderRadius: 18,
  },
  searchButtonText: {
    fontSize: 16,
    color: "black",
  },
  resultsContainer: {
    flex: 1,
    padding: 10,
  },
  forYouContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  forYouText: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  forYouContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentWrapper: {
    justifyContent: "space-between",
    marginLeft: "3%",
    marginRight: "3%",
    marginTop: "5%",
    padding: 5,
    alignItems: "center",
  },
  contentImage: {
    width: 150,
    height: 100,
    objectFit: "cover",
    marginBottom: 5,
    borderRadius: 18,
  },
  contentText: {
    color: "#fff",
  },
  trendingContainer: {
    marginTop: 20,
    borderTopWidth: 3,
    borderTopColor: "grey",
    padding: 10,

    backgroundColor: "#2F2D2D",
    paddingBottom: 30,
  },
  trendingText: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff", // Match text color from image
    marginBottom: "12%",
    textAlign: "center",
  },
  trendingItem: {
    fontSize: 16,
    textAlign: "left",
    padding: "5%",
    color: "black", // Match text color from image

    marginBottom: 15,
  },
  clickTrending: {
    backgroundColor: "#d9d9d9",
    borderRadius: 18,
    marginBottom: "5%",
  },
  additionalText: {
    fontSize: 12,
    color: "black",
    textAlign: "right",
    padding: "2%",

    marginTop: 0,
  },
  articlesContainer: {
    width: "50%",
    marginBottom: 60,
  },
  articleContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 10,
  },
  articlesContainer: {
    width: "50%",
    marginBottom: 60,
  },
  articleContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 10,
  },
});

export default Search;
