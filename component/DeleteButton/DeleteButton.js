import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DeleteButton from "./DeleteButton";

const Home = () => {
  const [articles, setArticles] = useState([
    { id: 1, title: "Article 1" },
    { id: 2, title: "Article 2" },
    { id: 3, title: "Article 3" },
  ]);

  const handleDelete = (id) => {
    // Filter out the article with the matching id
    const updatedArticles = articles.filter((article) => article.id !== id);
    // Update the articles state
    setArticles(updatedArticles);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View style={styles.articleContainer}>
            <Text>{item.title}</Text>
            <DeleteButton id={item.id} onDelete={handleDelete} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  articleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Home;
