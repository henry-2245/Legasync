import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import Wisdom from "../component/Wisdom.js";
import TabNavigator from "../component/TabNavigator.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ModalSelector from "react-native-modal-selector";
import AddWisdom from "../component/AddWisdom.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import Profile from "./Profile";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Search from "./Search";
import { Searchbar } from "react-native-paper";
import NewAddWisdom from "./NewAddWisdom.js";
import {
  CopilotStep,
  walkthroughable,
  useCopilot,
} from "react-native-copilot";

const Home = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAddPopupSubmitted, setIsAddPopupSubmitted] = useState(false);

  const route = useRoute();
  const [categories, setCategories] = useState([
    { key: 0, label: "All Categories" },
    { key: 1, label: "Career" },
    { key: 2, label: "Personal Growth" },
    { key: 3, label: "Relationship" },
    { key: 4, label: "Health and Wellness" },
    { key: 5, label: "Family" },
    { key: 6, label: "Education" },
    { key: 7, label: "Business" },
    { key: 8, label: "Spirituality" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Default");

  useEffect(() => {
    if (selectedCategory === "All Categories") {
      fetch("https://legasync.azurewebsites.net/wisdom/getAll")
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);
          console.log("Data fetched from wisdom/getAll:", data);
        })
        .catch((error) => {
          console.error("Error fetching data from wisdom/getAll:", error);
        });
    } else {
      let formdata = new FormData();
      formdata.append("category", selectedCategory);
      formdata.append("sortBy", sortBy);

      fetch("https://legasync.azurewebsites.net/wisdom/filterandSort", {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);
          console.log("Data fetched from wisdom/filterandSort:", data);
        })
        .catch((error) => {
          console.error(
            "Error fetching data from wisdom/filterandSort:",
            error
          );
        });
    }

    const { selectedCategory: routeCategory } = route.params || {};
    if (routeCategory) {
      setSelectedCategory(routeCategory);
    }

    setRefreshKey((prevKey) => prevKey + 1);
  }, [isAddPopupSubmitted, route.params, selectedCategory, sortBy]);

  useEffect(() => {
    const { selectedCategory: routeCategory } = route.params || {};
    if (routeCategory) {
      setSelectedCategory(routeCategory);
    }
  }, [route.params]);


  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const [articles, setArticles] = useState("");

  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);

  const handleAddButtonPress = () => {
    setIsAddPopupVisible(true);
  };

  const handleAddPopupSubmit = (wisdomData) => {
    setIsAddPopupVisible(false);
    setIsAddPopupSubmitted(true);
  };

  const renderArticles = () => {
    const filteredArticles =
      searchQuery === "" && selectedCategory !== "All Categories"
        ? articles.filter(
            (article) =>
              (article.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                article.wisdomOwner
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())) &&
              (selectedCategory === "All Categories" ||
                article.category === selectedCategory)
          )
        : searchQuery === "" && selectedCategory === "All Categories"
        ? articles
        : articles.filter(
            (article) =>
              (article.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                article.wisdomOwner
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())) &&
              (selectedCategory === "All Categories" ||
                article.category === selectedCategory)
          );

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

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    console.log(searchQuery);
  };

  const WalkthroughableText = walkthroughable(Text);

  const { start, copilotEvents } = useCopilot();
  const [secondStepActive, setSecondStepActive] = useState(true);
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    copilotEvents.on("stepChange", (step) => {
      setLastEvent(`stepChange: ${step.name}`);
    });
    copilotEvents.on("start", () => {
      setLastEvent(`start`);
    });
    copilotEvents.on("stop", () => {
      setLastEvent(`stop`);
    });
  }, [copilotEvents]);

  return (
    <ScrollView style={styles.container} key={refreshKey}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Legasync</Text>
          <View style={styles.searchInput}>
            <Feather name="search" size={24} color="black" />
            <TextInput
              style={styles.searchText}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          <View style={styles.modalContainer}>
            <ModalSelector
              data={categories}
              initValue={selectedCategory}
              style={styles.dropdown}
              initValueTextStyle={styles.dropdownText}
              selectTextStyle={styles.dropdownText}
              selectStyle={styles.dropdownSelect}
              onChange={(option) => setSelectedCategory(option.label)}
            />
            {selectedCategory !== "All Categories" && (
              <ModalSelector
                data={[
                  { key: "Default", label: "Default" },
                  { key: "Most Liked", label: "Most Liked" },
                  { key: "Most Saved", label: "Most Saved" },
                  { key: "Newest", label: "Newest" },
                  { key: "Oldest", label: "Oldest" },
                ]}
                initValue={sortBy}
                style={styles.dropdown}
                initValueTextStyle={styles.dropdownText}
                selectTextStyle={styles.dropdownText}
                selectStyle={styles.dropdownSelect}
                onChange={(option) => handleSortChange(option.key)}
              />
            )}
          </View>

          {/* Tutorial Button */}

          <TouchableOpacity style={styles.tutorialbtn} onPress={() => start()}>
            <Entypo name="light-bulb" size={24} color="yellow" />
          </TouchableOpacity>
          <CopilotStep
            text="Press the '+' button to add wisdom"
            order={1}
            name="addWisdom"
          >
            <WalkthroughableText style={styles.addButtonPos}>
              <TouchableOpacity
                onPress={handleAddButtonPress}
                style={styles.addButton}
              >
                <Text style={styles.addButtonIcon}>+</Text>
              </TouchableOpacity>
            </WalkthroughableText>
          </CopilotStep>
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
  tabItem: {
    flex: 1,
    textAlign: "center",
  },
  container: {
    display: "flex",
    backgroundColor: "#2F2D2D",
    padding: 10,
    paddingTop: "15%",
  },
  modalContainer: {
    flexDirection: "row",

    justifyContent: "flex-start",
    marginBottom: 10,
    width: "100%",
  },
  mainContainer: {},
  header: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#2F2D2D",
    color: "white",

    display: "flex",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FDE48A",
    textAlign: "center",
    padding: 10,
  },
  dropdown: {
    marginTop: 10,
    padding: 5,
  },
  dropdownSelect: {
    display: "row",
    flexDirection: "column",
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
  tutorialbtn: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor:""
  },
  addButtonPos: {
    position: "absolute",
    right: 10,
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
