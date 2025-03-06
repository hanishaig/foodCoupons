import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from './GlobalStyles';
import homeScreen from './components/homeScreen';
import DetailsScreen from './components/DetailsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, Header} from '@react-navigation/stack';
import TransactionDetails from './components/TransactionFolder/TransactionDetails';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer  >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={homeScreen}  />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
