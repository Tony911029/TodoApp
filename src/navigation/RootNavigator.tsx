// src/navigation/AppNavigator.tsx
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import TodoScreen from '../screens/Todo/TodoScreen';
import {FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export type RootStackParamList = {
  Home: undefined;
  Todo: undefined;
  Details: {id: string};
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
