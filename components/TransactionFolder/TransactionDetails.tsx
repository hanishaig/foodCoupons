import {View, Text, SafeAreaView, StatusBar, Platform} from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import GlobalStyles from '../../GlobalStyles';

const TransactionDetails = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* Fix Status Bar Overlap */}
      <StatusBar barStyle="light-content" backgroundColor="black" />

      {/* Header */}
      <View
        style={[
          GlobalStyles.oneaigHeader,
          GlobalStyles.alignTextContainer,
          {paddingTop: Platform.OS === 'android' ? 40 : 15}, // Extra padding for Android
        ]}>
        <Text style={GlobalStyles.oneaigText}>ONE AIG</Text>
        <AntDesignIcon
          name="home"
          size={24}
          color="white"
          style={{marginTop: 10}}
        />
      </View>

      {/* Content Container */}
      <View
        style={[
          GlobalStyles.TransactionHeadingBackground,
          {alignItems: 'center', justifyContent: 'center', gap: '5'},
        ]}>
        <Text style={GlobalStyles.TransactionHeadingTextSize}>Confirmed</Text>
        <Text style={GlobalStyles.TransactionTimeDateTextSize}>
          04-03-2025 on 01:15 PM
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems:'center',
            marginTop:'40%',
            gap:'20'
          }}>
          <Text style={[GlobalStyles.TransactionOrderDetailsHeading]}>
            Order Details
          </Text>



          <View style={{width:'80%',gap:'15'}}>
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%',gap:20}}>
              <Text
                style={[GlobalStyles.TransactionOrderDetailsFoodItemsTextSize]}>
                Egg Puff
              </Text>
              <Text
                style={[GlobalStyles.TransactionOrderDetailsFoodItemsTextSize]}>
                x2(2C)
              </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%',gap:20}}>
              <Text
                style={[GlobalStyles.TransactionOrderDetailsFoodItemsTextSize]}>
               Kachori
              </Text>
              <Text
                style={[GlobalStyles.TransactionOrderDetailsFoodItemsTextSize]}>
                x1(2C)
              </Text>
            </View>
          </View>





          <Text style={[GlobalStyles.CardTotalCoupons]}>Total: 6 Coupons</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetails;
