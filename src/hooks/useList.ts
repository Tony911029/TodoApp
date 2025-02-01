import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Priority, Task, ToDo } from '../interface/TodoInterface';
import { add, update, del, get } from '../service/todoListService';
import { generateUUID } from '../utils/uuid_gen';

// Use async-storage as a local storage
// This hook will be used to manage the todo list database operation


export const useTodoList = () => {
    const [currentList, setCurrentList] = useState<ToDo[]>([]);

    // Post
    const addTodo = async (title: string) => {
        try {            
            const myuuid = generateUUID()
            const newTodo: ToDo = {
                id: myuuid,
                title,
                tasks: []
            };
            
            const success = await add(newTodo);
            if (success) {
                setCurrentList([...currentList, newTodo]);
                return true;
            }
            return false;
        } catch (e: unknown) {

            console.error('Error adding todo:', e);
            return false;
        }
    };

    // Update
    const updateTodo = async (todo: ToDo): Promise<boolean> => {
        try {            
            const success = await update(todo);
            if (success) {
                setCurrentList(currentList.map(item => 
                    item.id === todo.id ? todo : item
                ));
                return true;
            }
            return false;
        } catch (e: unknown) {
            console.error('Error updating todo:', e);
            return false;
        }
    };

    // Get single todo
    const getTodo = async (todoId: string): Promise<ToDo | null> => {
        try {
            return await get(todoId);
        } catch (e: unknown) {
            console.error('Error getting todo:', e);
            return null;
        }
    };

    // Delete
    const deleteTodo = async (todoId: string): Promise<boolean> => {
        try {
            const success = await del(todoId);
            if (success) {
                setCurrentList(currentList.filter(todo => todo.id !== todoId));
                return true;
            }
            return false;
        } catch (e: unknown) {
            console.error('Error deleting todo:', e);
            return false;
        }
    };


    // #### Add tasks to a todo ###
    const addTasks = async (title: string, todo: ToDo) => {
        try {            
            const id = generateUUID()
            const newTask: Task = {
                id,
                title,
                description: '',
                isCompleted: false,
                priority: Priority.LOW,
            };
    
            const updatedList = currentList.map(item => {
                if (item.id === todo.id) {
                    return {
                        ...item,
                        tasks: [...(item.tasks || []), newTask]
                    };
                }
                return item;
            });
    
            const success = await add(todo);
    
            if (success) {
                setCurrentList(updatedList);
                return true;
            }
            return false;
        } catch (e: unknown) {
            console.error('Error adding todo:', e);
            return false;
        }
    };



    // Load all todos on mount
    useEffect(() => {
        const loadTodos = async () => {
            try {
                // Probably not the best choice here because we might be loading a lot of unnecessary data
                // One solution is to pre_fix the keys with a specific string and then filter by that string
                const keys = await AsyncStorage.getAllKeys();
                const results = await AsyncStorage.multiGet(keys);
                const todos = results
                    .map(([_, value]) => value ? JSON.parse(value) as ToDo : null)
                    .filter((todo): todo is ToDo => todo !== null);
                    
                setCurrentList(todos);
            } catch (e: unknown) {
                console.error('Error loading todos:', e);
            }
        };

        loadTodos();
    }, []);

    return {
        currentList,
        addTodo,
        updateTodo,
        getTodo,
        deleteTodo,
        addTasks
    };
};