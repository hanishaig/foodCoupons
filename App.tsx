import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from './GlobalStyles';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, Header} from '@react-navigation/stack';
import TransactionDetails from './components/TransactionFolder/TransactionDetails';
import CheckoutPage from './components/CheckoutFolder/CheckoutPage';
import QRCodePage from './components/QRcodeFolder/QRCodePage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer  >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen}  />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
        <Stack.Screen name="CheckoutPage" component={CheckoutPage} />
        <Stack.Screen name="QRCodePage" component={QRCodePage} />
      </Stack.Navigator>    
    </NavigationContainer>
  );
};

export default App;
