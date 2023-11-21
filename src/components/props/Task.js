import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Task(props) {

  const [isCompleted, setIsCompleted] = useState(props.completed);

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
  };

  const handleEdit = () => {
    props.onEdit(props.text);
  };

  return (
    <View style={[styles.item, isCompleted && styles.completedItem]}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={handleToggle} style={styles.checkbox}>
          <Icon name={isCompleted ? 'check-square' : 'square-o'} size={24} color="black" style={styles.checkbox} />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 20 }}>{props.text}</Text>
      </View>
      
        <View style={styles.actionsContainer}>
          
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Icon name="pencil" size={24} color="black" />
          </TouchableOpacity>
          
          {isCompleted && (
          <TouchableOpacity style={styles.deleteButton} onPress={props.onDelete}>
            <Icon name="trash" size={24} color="red" />
          </TouchableOpacity>
          )}
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  completedItem: {
    opacity: 0.6, 
  },

  checkbox: {
    marginRight: 10,
  },
  
  actionsContainer: {
    flexDirection: 'row',
  },

    editButton: {
      padding: 10,
      marginRight: 10,
    },

    deleteButton: {
      padding: 10,
    },
});

