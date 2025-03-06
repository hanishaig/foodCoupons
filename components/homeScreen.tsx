import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../GlobalStyles';


const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={[GlobalStyles.firstMenuPage, GlobalStyles.defaultPageStyle]}>
      <View>
        <LinearGradient
          colors={['#ff7e5f', '#feb47b']}
          style={[GlobalStyles.gradientBackground, { borderRadius: 10, padding: 10 }]}>
          <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              FOOD COUPONS
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
