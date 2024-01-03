import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

const Search = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Handle the logic for searching
    // For now, let's just log the search text
    console.log(searchText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchText}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultsContainer}>
        {/* Display the search results here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2D2D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchText: {
   
    width: '70%',
   
    marginRight: '2%',
    fontSize: 16,
    color: 'black',
    backgroundColor : 'white',
    borderRadius: '20%',
    padding: '1%'
    
  },
  searchButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  searchButtonText: {
    fontSize: 16,
    color: 'black',
  },
  resultsContainer: {
    flex: 1,
    padding: 10,
  },
});

export default Search