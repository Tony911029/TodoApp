import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {TodoList} from './TodoList'
import { View } from 'react-native'


const Todo = () => {
  return (
    <View>
      <TodoList />
    </View>
  )
}

export default Todo 