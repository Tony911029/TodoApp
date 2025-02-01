import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TodoList} from './TodoList';
import {ScreenProps} from '../../navigation/RootNavigator';

const Todo = ({navigation}: ScreenProps) => {
  return <TodoList navigation={navigation} />;
};

export default Todo;
