import AppNavigator from './navigation/RootNavigator';


/**
Core Functionalities:
- Add new tasks with a title and optional description
- Mark tasks as complete/incomplete with a visual indicator
- Delete tasks with confirmation
- View all tasks in a scrollable list with clear task status
- Intermediate Features:

Task categories/tags for better organization
 - Due dates for tasks with date picker
 - Task priority levels (High, Medium, Low)
 - Search and filter tasks by title, status, or category
 - Simple task persistence using AsyncStorage
 - Swipe gestures for quick actions (mark complete, delete)
 */

export default function App() {
  return <AppNavigator />;
}