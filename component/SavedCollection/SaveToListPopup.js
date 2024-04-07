import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SaveToListPopup = ({ visible, onClose, onSave, existingLists }) => {
  const [creatingList, setCreatingList] = useState(false);
  const [listName, setListName] = useState('');
  const [selectedLists, setSelectedLists] = useState([]);

  const handleSave = () => {
    onSave(selectedLists);
    setSelectedLists([]); // Clear selected lists
    onClose();
  };

  const handleCreateList = () => {
    setCreatingList(true);
  };

  const handleSaveList = () => {
    // Perform save action for the new list
    // For example, add it to the existingLists array
    const newList = { id: existingLists.length + 1, name: listName };
    existingLists.push(newList);
    setCreatingList(false);
    setListName('');
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveList}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              {existingLists.map((list) => (
                <TouchableOpacity
                  key={list.id}
                  style={[styles.listItem, selectedLists.includes(list) && styles.selectedListItem]}
                  onPress={() => setSelectedLists((prevLists) => [...prevLists, list])}
                >
                  <Text>{list.name}</Text>
                  {selectedLists.includes(list) && (
                    <Ionicons name="checkmark-circle" size={24} color="green" style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
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
    backgroundColor: '#e6f7ea', // Light green background for selected items
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

export default SaveToListPopup;
