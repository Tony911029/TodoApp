/**
 * Stucture of the data
 * Main page: we have a list of todos
 * With each todo, we have a list of tasks
 */


export interface ToDo {
    id: string;
    title: string;
    tasks?: Task[];
}


export interface Task {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    priority: Priority
}


export enum Priority{
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}
