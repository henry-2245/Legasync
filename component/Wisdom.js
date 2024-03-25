// Wisdom.js
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Wisdom = ({ article, onPress }) => {
  const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#2F2D2D',
    padding: 5,
   
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
    padding: 10,
  },
  dropdown: {
    width: '100%', // Set the width of the dropdown
    marginTop: 10,
    padding: 5,
    flexDirection: 'row', // Align the arrow at the end
    justifyContent: 'space-between', // Align the arrow at the end
    
  },
  dropdownSelect: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    borderRadius: 20,
  
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
    
      width: '100%',
      padding: 10,
      
     
      
      
     
   
      backgroundColor: '#262626',
      borderRadius: 10,
      
    
      
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

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.article}>
        <View style={styles.imageContainer}>
          <Image
            source={article.image}
            style={[styles.articleImage, { borderRadius: 10 }]}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.articleTitle, { marginBottom: 10 }]}>{article.title}</Text>
          <View style={styles.authorContainer}>
            {article.author && article.author.profileImage && (
              <Image
                source={article.author.profileImage}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.articleAuthor}>{article.author && article.author.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Wisdom;
