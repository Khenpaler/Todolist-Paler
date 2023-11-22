import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert, Keyboard, Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Task from '../props/Task';

export default function TodoScreen() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const textInputRef = useRef();

  const handleAddTask = () => {
    if (editIndex === -1) {
      setTaskItems([...taskItems, task]);
    } else {
      const updatedItems = [...taskItems];
      updatedItems[editIndex] = task;
      setTaskItems(updatedItems);
      setEditIndex(-1);
    }
    setTask('');
    Keyboard.dismiss();
  };

  const handleDeleteTask = (index) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const itemsCopy = [...taskItems];
            itemsCopy.splice(index, 1);
            setTaskItems(itemsCopy);
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditTask = (index) => {
    setTask(taskItems[index]);
    setEditIndex(index);
    textInputRef.current.focus();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkModeContainer]}>
        <View style={styles.taskWrapper}>
          <View style={styles.titleContainer}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkModeText]}>To do list</Text>
            <Button
              icon={() => <MaterialCommunityIcons name="theme-light-dark" marginTop={10} size={24} color={isDarkMode ? 'white' : 'black'} />}
              onPress={toggleDarkMode}
            />
          </View>
          <ScrollView style={styles.tasksContainer}>
            {taskItems.map((item, index) => (
              <Task 
                key={index} 
                text={item} 
                onDelete={() => handleDeleteTask(index)}
                onEdit={() => handleEditTask(index)}
                isDarkMode={isDarkMode}
              />
            ))}
          </ScrollView>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={[styles.createTaskWrapper, isDarkMode && styles.darkModeCreateTaskWrapper]}
        >
          <TextInput
            type='outlined'
            ref={textInputRef}
            activeUnderlineColor={isDarkMode ? 'black' : 'white'}
            style={[
              styles.inputText,
              isDarkMode && styles.darkModeInput,
            ]}
            placeholder={'Tap to create a task'}
            value={task}
            onChangeText={(text) => setTask(text)}
            multiline={true}
          />
          <TouchableOpacity onPress={handleAddTask} disabled={!task.trim()}>
            <View style={[styles.addWrapper, !task.trim() && styles.disabledButton]}>
              <Text style={[styles.doneButtonText, !task.trim() && styles.disabledButtonText]}>Done</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkModeContainer: {
    backgroundColor: 'black',
  },
  taskWrapper: {
    flex: 1,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  darkModeText: {
    color: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tasksContainer: {
    marginBottom: 100,
    marginTop: 30,
  },
  createTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  darkModeCreateTaskWrapper: {
    backgroundColor: 'black',
  },
  inputText: {
    padding: 2,
    backgroundColor: 'black',
    color: 'white',
    width: 370,
    paddingHorizontal: 15,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderRadius: 20,
  },
  darkModeInput: {
    backgroundColor: 'white',
    color: 'black',
  },
  addWrapper: {
    width: 80,
    height: 40,
    backgroundColor: '#00E31A',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'gray',
  },
  disabledButtonText: {
    fontSize: 20,
    color: 'white',
  },
  doneButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
