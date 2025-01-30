import React from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const lists = [
  {id: 1, title: 'School Work'},
  {id: 2, title: 'Gloceries'},
  {id: 3, title: 'Design team'},
];

/**
    color palette: https://www.color-hex.com/color-palette/42995
 */

export const TodoList = () => {
  // TODO: Implement the TODO detail screen
  // TODO: Add dialog for adding a new todo
  // TODO: Add delete functionality
  // TODO: Add local storage

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <FlatList
        data={lists}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log('Pressed', item?.title);
            }}
            activeOpacity={0.7}>
            <Text style={styles.itemText}>{item?.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => console.log('Add new todo')}
        activeOpacity={0.9}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#3aafa9',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#feffff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemText: {
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 35,
    bottom: 35,
    borderRadius: 30,
    backgroundColor: '#3aafa9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
