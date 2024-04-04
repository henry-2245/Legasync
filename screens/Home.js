import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import Wisdom from "../component/Wisdom.js";
import TabNavigator from "../component/TabNavigator.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ModalSelector from "react-native-modal-selector";
import AddWisdom from "../component/AddWisdom.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import Profile from "./Profile";
import { Feather } from "@expo/vector-icons";
import Search from "./Search";
import { Searchbar } from "react-native-paper";
import NewAddWisdom from "./NewAddWisdom.js";

const Home = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const route = useRoute();
  const [categories, setCategories] = useState([
    { key: 0, label: "All Categories" },
    { key: 1, label: "Computer Science" },
    { key: 2, label: "Technology" },
    { key: 3, label: "Business" },
    { key: 4, label: "Personal Development" },
    { key: 5, label: "Philosophy" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    // Set the initial selected category from the navigation params
    const { selectedCategory: routeCategory } = route.params || {};
    if (routeCategory) {
      setSelectedCategory(routeCategory);
    }
    // else{
    //   selectedCategory("All Categories")
    // }
  }, [route.params]);

  // ... rest of your code ...

  const [articles, setArticles] = useState([
    {
      title: "How computer data",
      author: {
        name: "Grace Grimes",
        profileImage: require("legasync/Images/Grace.jpg"),
      },
      image: require("legasync/Images/pic1.png"),
      category: "Computer Science",
      likes: 100,
      comments: [
        { username: "User1", text: "Great article!" },
        { username: "User2", text: "I enjoyed reading this." },
        { username: "User3", text: "What is up?" },
      ],
      saved: 0,
    },
    {
      title: "Surviving a Hollywood life",
      author: {
        name: "Abdul Abir",
        profileImage: require("legasync/Images/Abdul.jpg"),
      },
      image: require("legasync/Images/pic2.png"),
      category: "Technology",
      likes: 10,
      comments: [
        { username: "User1", text: "Amazingg" },
        { username: "User2", text: "I want thiss." },
      ],
      saved: 0,
    },
    {
      title: "How to take risks",
      author: {
        name: "Mark Manson",
        profileImage: require("legasync/Images/Mark.jpg"),
      },
      image: require("legasync/Images/pic3.png"),
      category: "Business",
      likes: 20,
      comments: [
        { username: "User1", text: "So Risky" },
        { username: "User2", text: "I enjoyed risk." },
      ],
      saved: 0,
    },
    {
      title: "How computer data",
      author: {
        name: "Grace Grimes",
        profileImage: require("legasync/Images/Grace.jpg"),
      },
      image: require("legasync/Images/pic1.png"),
      category: "Computer Science",
      likes: 100,
      comments: [
        { username: "User1", text: "Great article!" },
        { username: "User2", text: "I enjoyed reading this." },
        { username: "User3", text: "What is up?" },
      ],
      saved: 0,
    },
    // Add more articles...
  ]);

  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);

  const handleAddButtonPress = () => {
    setIsAddPopupVisible(true);
  };

  const handleAddPopupSubmit = (wisdomData) => {
    setIsAddPopupVisible(false);
    setArticles([...articles, wisdomData]);
    console.log(articles);
    // Add logic for handling the submitted title
  };

  {
    /* Don't Delete for NewAddWisdom */
  }
  // const handleAddButtonPress = () => {
  //   navigation.navigate("NewAddWisdom");
  // };

  const renderArticles = () => {
    // return filteredArticles.map((article, index) => (
    //   <Wisdom
    //     key={index}
    //     article={article}
    //     onPress={() => navigation.navigate('WisdomDetail', { article })}
    //   />

    {
      /* filter logic */
    }
    const filteredArticles =
      searchQuery === "" && selectedCategory === "All Categories"
        ? articles
        : articles.filter((article) =>
            (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              article.author.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) &&
            selectedCategory === "All Categories"
              ? true
              : article.category === selectedCategory
          );

    // ));
    const rows = [];
    for (let i = 0; i < filteredArticles.length; i += 2) {
      const rowArticles = filteredArticles.slice(i, i + 2);
      const row = (
        <View key={i} style={styles.rowContainer}>
          {rowArticles.map((article, index) => (
            <View style={styles.articleContainer}>
              <Wisdom
                key={index}
                article={article}
                onPress={() => navigation.navigate("WisdomDetail", { article })}
              />
            </View>
          ))}
        </View>
      );
      rows.push(row);
    }

    return rows;
  };

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    console.log(searchQuery); // Handle search logic here
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Legasync</Text>
          {/* <Searchbar
            placeholder="Search..."
            onChangeText={handleSearch}
            value={searchQuery}
          ></Searchbar> */}
          <View style={styles.searchInput}>
            <Feather name="search" size={24} color="black" />
            <TextInput
              style={styles.searchText}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          <ModalSelector
            data={categories}
            initValue={selectedCategory}
            style={styles.dropdown}
            initValueTextStyle={styles.dropdownText}
            selectTextStyle={styles.dropdownText}
            selectStyle={styles.dropdownSelect}
            onChange={(option) => setSelectedCategory(option.label)}
          />
          <TouchableOpacity
            onPress={handleAddButtonPress}
            style={styles.addButton}
          >
            <Text style={styles.addButtonIcon}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.articleWrapper}>
          <View style={styles.articlesContainer}>{renderArticles()}</View>
        </View>

        <AddWisdom
          visible={isAddPopupVisible}
          onClose={() => setIsAddPopupVisible(false)}
          onSubmit={handleAddPopupSubmit}
          onAddWisdom={handleAddPopupSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#2F2D2D",
    padding: 10,
    paddingTop: "15%",
  },
  mainContainer: {},
  header: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#2F2D2D",
    color: "white",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FDE48A",
    textAlign: "center",
    padding: 10,
  },
  dropdown: {
    width: "100%", // Set the width of the dropdown
    marginTop: 10,
    padding: 5,
    flexDirection: "row", // Align the arrow at the end
    justifyContent: "space-between", // Align the arrow at the end
  },
  dropdownSelect: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    borderRadius: 20,
  },
  dropdownText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  articlesContainer: {
    width: "50%",
    justifyContent: "space-between",
  },
  articleContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
  articleWrapper: {
    flex: 1,
    padding: "1%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 50,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  article: {
    width: "4%",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
    margin: 50,
  },
  imageContainer: {
    alignItems: "center",
  },
  articleImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "cover",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  articleAuthor: {
    fontSize: 14,
    color: "white",
  },
  addButton: {
    position: "absolute",
    right: 10,
    top: 5,
    backgroundColor: "white",

    borderWidth: 2,
    borderColor: "#FDE48A",
    borderRadius: 50, // Set the border radius to make it a circle
    padding: 5,
    width: 40, // Set the width and height to the same value
    height: 40,
  },
  addButtonIcon: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
    lineHeight: 30,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 3,
    height: 45,
    marginTop: 3,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 18,
  },
  searchText: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 18,
    marginRight: 15,
  },
});

export default Home;
