import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Profile from './Profile';
import { Ionicons } from '@expo/vector-icons';
import Search from './Search';
import AddWisdom from './AddWisdom'; 
const Tab = createBottomTabNavigator();

const HomeScreen = ({ categories, selectedCategory, setSelectedCategory, articles, renderArticles }) => {
  const navigation = useNavigation();
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);

  const handleAddButtonPress = () => {
    // Handle the logic for the "+" button press
    // For now, let's navigate to a new screen as an example
    setIsAddPopupVisible(true);
    // Alert.alert("Add")
  };

  const handleAddPopupSubmit = (title) => {
    // Add the new article to the articles list
    // Close the popup
    setIsAddPopupVisible(false);
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Legasync</Text>
        <ModalSelector
          data={categories}
          initValue={selectedCategory}
          style={styles.dropdown}
          initValueTextStyle={styles.dropdownText}
          selectTextStyle={styles.dropdownText}
          selectStyle={styles.dropdownSelect}
          onChange={(option) => setSelectedCategory(option.label)}
        />
        <TouchableOpacity onPress={handleAddButtonPress} style={styles.addButton}>
          <Text style={styles.addButtonIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.articlesContainer}>{renderArticles()}</View>

      <AddWisdom
        visible={isAddPopupVisible}
        onClose={() => setIsAddPopupVisible(false)}
        onSubmit={handleAddPopupSubmit}
      />
    </ScrollView>
    
  );
};

const Home = () => {
  const [categories, setCategories] = useState([
    { key: 0, label: 'All Categories' },
    { key: 1, label: 'Computer Science' },
    { key: 2, label: 'Technology' },
    { key: 3, label: 'Business' },
    { key: 4, label: 'Personal Development' },
    { key: 5, label: 'Philosophy' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const [articles, setArticles] = useState([
    {
      title: 'How computer data',
      author: {
        name: 'Grace Grimes',
        profileImage: require('legasync/Images/Grace.jpg'),
      },
      image: require('legasync/Images/pic1.png'),
      category: 'Computer Science',
    },
    {
      title: 'Surviving a Hollywood life',
      author: {
        name: 'Abdul Abir',
        profileImage: require('legasync/Images/Abdul.jpg'),
      },
      image: require('legasync/Images/pic2.png'),
      category: 'Technology',
    },
    {
      title: 'How to take risks',
      author: {
        name: 'Mark Manson',
        profileImage: require('legasync/Images/Mark.jpg'),
      },
      image: require('legasync/Images/pic3.png'),
      category: 'Business',
    },
    // Add more articles...
  ]);

  const renderArticles = () => {
    const filteredArticles = selectedCategory === 'All Categories'
      ? articles
      : articles.filter(article => article.category === selectedCategory);

    const rows = [];
    for (let i = 0; i < filteredArticles.length; i += 2) {
      const rowArticles = filteredArticles.slice(i, i + 2);
      const rowView = (
        <View key={i} style={styles.rowContainer}>
          {rowArticles.map((article, index) => (
            <View key={index} style={styles.article}>
              <View style={styles.imageContainer}>
                <Image
                  source={article.image}
                  style={[styles.articleImage, { borderRadius: 10 }]}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.articleTitle, { marginBottom: 10 }]}>{article.title}</Text>
                <View style={styles.authorContainer}>
                  <Image
                    source={article.author.profileImage}
                    style={styles.profileImage}
                  />
                  <Text style={styles.articleAuthor}>{article.author.name}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      );
      rows.push(rowView);
    }
    return rows;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}>
        {() => <HomeScreen categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} articles={articles} renderArticles={renderArticles} />}
      </Tab.Screen>
      <Tab.Screen name="Search" component={Search} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2D2D',
  },
  header: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2F2D2D',
    color: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FDE48A',
    textAlign: 'center',
  },
  dropdown: {
    width: '100%', // Set the width of the dropdown
    marginTop: 10,
    padding: 10,
    flexDirection: 'row', // Align the arrow at the end
    justifyContent: 'space-between', // Align the arrow at the end
    
  },
  dropdownSelect: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    borderRadius: 20
  },
  dropdownText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  articlesContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  article: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '48%',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    margin: 5,
  },
  imageContainer: {
    alignItems: 'center',
  },
  articleImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  articleAuthor: {
    fontSize: 14,
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    right: 10,
    top: 5,
    backgroundColor: 'white',
    
    borderWidth: 2,
    borderColor: '#FDE48A',
    borderRadius: 50, // Set the border radius to make it a circle
    padding: 5,
    width: 40, // Set the width and height to the same value
    height: 40,
    
  },
  addButtonIcon: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    lineHeight: 30,

  },
});

export default Home;
