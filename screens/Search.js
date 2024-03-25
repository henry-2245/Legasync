import React, { useState } from "react";
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


const Search = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    console.log(searchText); // Handle search logic here
  };

  const handleCategoryClick = (category) => {
    navigation.navigate("Home", { selectedCategory: category });
  };

  return (
    <ScrollView style={styles.scrollable}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.searchIcon} />
          <TextInput
            style={styles.searchText}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resultsContainer}>
          {/* Display search results here */}
        </View>
        <View style={styles.forYouContainer}>
          <Text style={styles.forYouText}>{"Wisdoms for you"}</Text>
          <View style={styles.forYouContent}>
            <View style={styles.contentWrapper}>
            <TouchableOpacity onPress={() => handleCategoryClick("Technology")} style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
              <Image
                source={require("legasync/Images/Career.png")}
                style={styles.contentImage}
              />
                <Text style={styles.contentText}>{"Career"}</Text>
              </TouchableOpacity>
              

            </View>
            <View style={styles.contentWrapper}>
              <TouchableOpacity onPress={() => handleCategoryClick("Computer Science")}  style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
              <Image
                source={require("legasync/Images/Education.png")}
                style={styles.contentImage}
              />
              <Text style={styles.contentText}>{"Education"}</Text>


              </TouchableOpacity>

            </View>
          </View>
        </View>

        <View style={styles.trendingContainer}>
          <Text style={styles.trendingText}>Trending right now</Text>
          <TouchableOpacity style={styles.clickTrending}>
            <Text style={styles.trendingItem}>
              What is the Purpose of Having an Offspring?
            </Text>
            <Text style={styles.additionalText}>120 wisdoms</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clickTrending}>
            <Text style={styles.trendingItem}>Being a Zookeeper</Text>
            <Text style={styles.additionalText}>100 wisdoms</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clickTrending}>
            <Text style={styles.trendingItem}>My crazy life in Ohio</Text>
            <Text style={styles.additionalText}>80 wisdoms</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clickTrending}>
            <Text style={styles.trendingItem}>Footballer Mindset</Text>
            <Text style={styles.additionalText}>60 wisdoms</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clickTrending}>
            <Text style={styles.trendingItem}>Being a superheroes</Text>
            <Text style={styles.additionalText}>20 wisdoms</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2F2D2D",
    padding: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollable: {
    backgroundColor: "#2F2D2D",
    paddingTop: '12%'
  },
  searchIcon: {
    // Add styles for search icon
  },
  searchText: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f5f5f5",

    marginRight: 15,
  },
  searchButton: {
    backgroundColor: "#d9d9d9",
    padding: 10,
    borderRadius: 5,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: "12%",
  },
  forYouContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentWrapper: {
    justifyContent: 'space-between',
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: '5%',
    alignItems: 'center'
  
  },
  contentImage: {
    width: 150,
    height: 100,
    objectFit: "contain",
    marginBottom: 5,
    borderRadius: "10%",
  },
  contentText: {
    color: "#fff",
  },
  trendingContainer: {
    padding: 10,
    backgroundColor: "#2F2D2D",
    paddingBottom: 30,
  },
  trendingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff", // Match text color from image
    marginBottom: '12%',
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
    backgroundColor: '#d9d9d9',
    borderRadius: '10%',
   marginBottom: '5%',
  },
  additionalText: {
    fontSize: 12,
    color: "black",
    textAlign: "right",
    padding: '2%',
   
    marginTop: 0,
  },
});

export default Search;
