import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignItems: 'center',
    gap: 10,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};


const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {

  const handleContinue = () => {
    navigation.navigate('Todo');
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.textStyle}>Welcome Back!</Text>
        <Text style={styles.textStyle}>Click here to be productive!</Text>
      </View>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default WelcomeScreen;
