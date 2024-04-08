import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const SaveToListPopup = ({ visible, onClose, onSave, onSaveList, existingLists }) => {
  const [creatingList, setCreatingList] = useState(false);
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [selectedLists, setSelectedLists] = useState([]);

  const handleSave = () => {
    const uniqueCollectionIDs = new Set(selectedLists.map(list => list.collectionID));
    const selectedCollectionIDs = Array.from(uniqueCollectionIDs);
    onSave(selectedCollectionIDs);
    setSelectedLists([]);
    onClose();
  };

  const handleCreateList = () => {
    setCreatingList(true);
  };

  const handleSaveList = () => {
    // const newList = {
    //   collectionID: existingLists.length + 1,
    //   collectTitle: listName,
    //   collectDescription: listDescription,
    //   listWisdom: []
    // };
    // existingLists.push(newList);
    setCreatingList(false);
    setListName('');
    setListDescription('');
    onSaveList(listName, listDescription); // Call the onSaveList function with list title and description
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.title}>Select List</Text>
            <TouchableOpacity onPress={handleCreateList}>
              <Ionicons name="add" size={26} color="red" />
            </TouchableOpacity>
          </View>

          {creatingList ? (
            <View style={styles.createListContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter list name"
                onChangeText={setListName}
                value={listName}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter list description"
                onChangeText={setListDescription}
                value={listDescription}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveList}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <ScrollView>
              <View>
              {existingLists.map((list) => (
                <TouchableOpacity
                  key={list.collectionID}
                  style={[styles.listItem, selectedLists.includes(list) && styles.selectedListItem]}
                  onPress={() => {
                    if (selectedLists.includes(list)) {
                      setSelectedLists(prevLists => prevLists.filter(item => item !== list));
                    } else {
                      setSelectedLists(prevLists => [...prevLists, list]);
                    }
                  }}
                >
                  <Text>{list.collectTitle}</Text>
                  {selectedLists.includes(list) && (
                    <Ionicons name="checkmark-circle" size={24} color="green" style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
              
            </ScrollView>
            
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            {!creatingList && (
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedListItem: {
    backgroundColor: '#e6f7ea',
  },
  checkIcon: {
    marginLeft: 10,
  },
  createListContainer: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  button: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  saveButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


// Rest of the component remains the same

export default SaveToListPopup;
