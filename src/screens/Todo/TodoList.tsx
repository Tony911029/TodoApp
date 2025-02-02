import React, { useState } from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ScreenProps} from '../../navigation/RootNavigator';
import {ToDo} from '../../interface/TodoInterface';
import {useTodoList} from '../../hooks/useList';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { CustomDialog } from '../../components/Dialog/CustomDialog';


// TODO: Implement the TODO detail screen
// TODO: Implement Edit functionality
// TODO: Add reordering functionality
// TODO: Use trash and edit icons

export const TodoList = ({navigation}: ScreenProps) => {
  const {currentList, addTodo, updateTodo, deleteTodo} = useTodoList();
  const [confirm, setConfirm] = useState(false);
  
  const navagiateListDetail = (todo: ToDo) => {
    // Get the ToDo then pass it to the component probably or as a route param
    navigation.navigate('TodoDetail', { todoId: todo.id });
  };

  const handleAddTodo = (title : string) => {
    addTodo(title); // intentionally not awaiting
    setConfirm(false);
  };

  const onEdit = (item: ToDo) => {
    updateTodo(item);
  };

  const onDelete = (item: ToDo) => {
    deleteTodo(item.id);
  };

  const renderRightActions = (progress, dragX, item: ToDo) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            onEdit(item);
          }}
          style={[styles.actionBtn, styles.success]}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onDelete(item);
          }}
          style={[styles.actionBtn, styles.danger]}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>Todo List</Text>
        <FlatList
          data={currentList}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item}) => (
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, item)
              }>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  navagiateListDetail(item);
                }}
                activeOpacity={0.7}>
                <Text style={styles.itemText}>{item?.title}</Text>
              </TouchableOpacity>
            </Swipeable>
          )}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setConfirm(true)}
          activeOpacity={0.9}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <CustomDialog
        visible={confirm}
        handleCancel = {() => setConfirm(false)}
        handleConfirm = {handleAddTodo}
        cancelText = 'Cancel'
        actionText = 'Confirm'
        title = 'New Todo'
        showInput = {true}
        description = 'Add a new title for your new todo list'
        inputPlaceholder = 'Enter a title here...'
      />
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
  actionBtn: {
    justifyContent: 'center',
    width: 75,
    // height: '100%',
    marginBottom: 20,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 8,
  },
  danger: {
    backgroundColor: '#ff3b30',
  },
  success: {
    backgroundColor: '#ffcc00',
  },
});
