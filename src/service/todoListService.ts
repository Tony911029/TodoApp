import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToDo, Task } from '../interface/TodoInterface';

// Sqlite might be a better option for this
// FOR NOW, we will use async-storage



/**
ToDo Operations:
key: Todo.id
value: Todo json object
*/

export const add = async (todo: ToDo): Promise<boolean> => {
    try {
        await AsyncStorage.setItem(todo.id, JSON.stringify(todo));
        return true;
    } catch (e: any) {
        console.error('Error adding todo:', e);
        return false;
    }
}

export const update = async (todo: ToDo): Promise<boolean> => {
    try {
        await AsyncStorage.setItem(todo.id, JSON.stringify(todo));
        return true;
    } catch (e: any) {
        console.error('Error updating todo:', e);
        return false;
    }
}

export const get = async (todoId: string): Promise<ToDo | null> => {
    try {
        const res = await AsyncStorage.getItem(todoId);
        if (!res) return null;
        return JSON.parse(res) as ToDo;
    } catch (e: any) {
        console.error('Error getting todo:', e);
        return null;
    }
}

export const del = async (todoId: string): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem(todoId);
        return true;
    } catch (e: any) {
        console.error('Error deleting todo:', e);
        return false;
    }
}




export const addTask = async (todo: ToDo, task: Task): Promise<boolean> => {
    if (!todo.tasks) {
        todo.tasks = [];
    }
    todo.tasks.push(task);
    // Wait for the update to complete since updateTodo is async
    return await update(todo);
}

export const updateTask = async (todo: ToDo, task: Task) => {
    if (!todo.tasks) return;
    
    const index = todo.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
        todo.tasks[index] = task;
        return await update(todo);
    }
}

export const getTask = (todo: ToDo, taskId: string): Task | null => {
    if (!todo.tasks) return null;
    return todo.tasks.find(t => t.id === taskId) || null;
}

export const deleteTask = async (todo: ToDo, taskId: string) => {
    if (!todo.tasks) return;
     
    todo.tasks = todo.tasks.filter(t => t.id !== taskId);
    await update(todo);
}