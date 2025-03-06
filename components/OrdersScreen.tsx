import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../GlobalStyles';
import Page1 from './YourOrders/Page1';
import Page2 from './YourOrders/Page2';

const OrdersScreen = () => {
  const [ColorText, SetColorText] = useState('Active');

  return (
    <View
      style={[
        GlobalStyles.defaultPageStyle,
        {width: '100%', marginTop: 13, backgroundColor: 'white', height: '90%'},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 16,
        }}>
        <TouchableOpacity
          onPress={() => SetColorText('Active')}
          style={{
            borderBottomWidth: ColorText === 'Active' ? 2 : 0,
            borderBottomColor: ColorText === 'Active' ? 'black' : 'transparent',
            paddingBottom: 5,
            width: 'auto',
          }}>
          <Text
            style={[
              GlobalStyles.OrderScreenBarTextColor,
              {
                color: ColorText === 'Active' ? '#236AEB' : 'black',
              },
            ]}>
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => SetColorText('Completed')}
          style={{
            borderBottomWidth: ColorText === 'Completed' ? 2 : 0,
            borderBottomColor:
              ColorText === 'Completed' ? 'black' : 'transparent',
            paddingBottom: 5,
            width: 'auto',
          }}>
          <Text
            style={[
              GlobalStyles.OrderScreenBarTextColor,
              {color: ColorText === 'Completed' ? '#236AEB' : 'black'},
            ]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {
          ColorText === 'Active' ?
          <Page1></Page1>:<Page2></Page2>
        }
        </View>
    </View>
  );
};

export default OrdersScreen;
