// src/navigation/AppNavigator.tsx
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import TodoScreen from '../screens/Todo/TodoScreen';
import {FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TodoDetail from '../screens/TodoDetail/TodoDetail';
import { ToDo } from '../interface/TodoInterface';

export type RootStackParamList = {
  Home: undefined;
  Todo: undefined;
  TodoDetail: {
    todoId: string;
  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export interface ScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const AppNavigator: FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {backgroundColor: '#def2f1'},
          }}>
          <Stack.Screen name="Home" component={WelcomeScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
          <Stack.Screen name="TodoDetail" component={TodoDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
