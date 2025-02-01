import React, {useMemo, useState} from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParamList, ScreenProps} from '../../navigation/RootNavigator';
import {Priority, Task, ToDo} from '../../interface/TodoInterface';
import {useTodoList} from '../../hooks/useList';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {CustomDialog} from '../../components/Dialog/CustomDialog';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Here we will list a list of tasks user need to complete
// 1. A checkbox
// 2. A task title
// 3. Cofirmation dialog: Priority, Due date, Description, title
// 4. A delete button
// 5. An edit button
// 6. Priority indicator
// 7. Refactoring the list. We can combine this with the todo list screen
type TodoDetailProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TodoDetail'>;
  route: RouteProp<RootStackParamList, 'TodoDetail'>;
};

const TodoDetail = ({navigation, route}: TodoDetailProps) => {
  const {currentList, addTasks, updateTodo, getTodo, deleteTodo} = useTodoList();
  const [confirm, setConfirm] = useState(false);

  const currentToDo: ToDo | undefined = useMemo(
    () => currentList.find(todo => todo.id === route.params.todoId),
    [currentList],
  );

  if (!currentToDo) {
    return <Text>Todo not found</Text>;
  } 

  const addTask = () => {
    const title = 'New task';
    const id = '123';
    const newTask: Task = {
      id,
      title,
      description: '',
      isCompleted: false,
      priority: Priority.LOW,
    };
    currentToDo?.tasks?.push(newTask);
    updateTodo(currentToDo);
  };

  const handleAddTask = (title : string) => {
    addTasks(title, currentToDo); // intentionally not awaiting
    setConfirm(false);
  };


  console.log('todo', currentToDo);

  const onEdit = (item: ToDo) => {};

  const onDelete = (item: ToDo) => {};

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
        <Text style={styles.header}>{currentToDo.title}</Text>
        <FlatList
          data={currentToDo?.tasks}
          keyExtractor={item => item?.id?.toString()}
          // TODO: We can factor our everything else and create a component for render Item
          renderItem={({item}) => (
            // Add a checkbox here (task.isCompleted)
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, item)
              }>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  // navagiateListDetail(item);
                }}
                activeOpacity={0.7}>
                <Text style={styles.itemText}>{item?.title}</Text>
              </TouchableOpacity>
            </Swipeable>
          )}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => addTask()}
          activeOpacity={0.9}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
      <CustomDialog
        visible={confirm}
        handleCancel={() => setConfirm(false)}
        handleConfirm={handleAddTask}
        cancelText="Cancel"
        actionText="Confirm"
        title="New Task"
        showInput={true}
        description="Add a new title for your new task"
        inputPlaceholder="Enter a title here..."
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

export default TodoDetail;
