import {
  View,
  Text,
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import GlobalStyles from '../../GlobalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionDetails from '../TransactionFolder/TransactionDetails';
import {useNavigation} from '@react-navigation/native';
import { NavigationProps } from '../navigationTypes';
const OrderCardComponent = () => {
  const navigation = useNavigation<NavigationProps>();

  const OrdersData = [
    {
      id: 1,
      Order: 38974561,
      CreatedAt: '03:10 PM 18 Mar 2025',
      ExpiresAt: '03:30 PM 18 Mar 2025',
      TotalCoups: '5 Coupons',
    },
    {
      id: 2,
      Order: 84219734,
      CreatedAt: '02:20 PM 10 Feb 2025',
      ExpiresAt: '02:40 PM 10 Feb 2025',
      TotalCoups: '4 Coupons',
    },
    {
      id: 3,
      Order: 57705802,
      CreatedAt: '01:15 PM 04 Jan 2025',
      ExpiresAt: '01:35 PM 04 Jan 2025',
      TotalCoups: '6 Coupons',
    },
    {
      id: 4,
      Order: 12345678,
      CreatedAt: '05:45 PM 30 Mar 2025',
      ExpiresAt: '06:05 PM 30 Mar 2025',
      TotalCoups: '3 Coupons',
    },
    {
      id: 5,
      Order: 87654321,
      CreatedAt: '04:30 PM 25 Mar 2025',
      ExpiresAt: '04:50 PM 25 Mar 2025',
      TotalCoups: '6 Coupons',
    },
    {
      id: 6,
      Order: 23456789,
      CreatedAt: '03:15 PM 22 Mar 2025',
      ExpiresAt: '03:35 PM 22 Mar 2025',
      TotalCoups: '2 Coupons',
    },
    {
      id: 7,
      Order: 98765432,
      CreatedAt: '02:50 PM 20 Mar 2025',
      ExpiresAt: '03:10 PM 20 Mar 2025',
      TotalCoups: '4 Coupons',
    },
    {
      id: 8,
      Order: 56789012,
      CreatedAt: '02:00 PM 15 Mar 2025',
      ExpiresAt: '02:20 PM 15 Mar 2025',
      TotalCoups: '5 Coupons',
    },
    {
      id: 10,
      Order: 34567890,
      CreatedAt: '01:40 PM 10 Mar 2025',
      ExpiresAt: '02:00 PM 10 Mar 2025',
      TotalCoups: '7 Coupons',
    },
    {
      id: 11,
      Order: 65432198,
      CreatedAt: '12:25 PM 05 Mar 2025',
      ExpiresAt: '12:45 PM 05 Mar 2025',
      TotalCoups: '3 Coupons',
    },
    {
      id: 12,
      Order: 38974561,
      CreatedAt: '03:10 PM 18 Mar 2025',
      ExpiresAt: '03:30 PM 18 Mar 2025',
      TotalCoups: '5 Coupons',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {OrdersData.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              navigation.navigate('TransactionDetails');
            }}>
            <View
              style={[
                GlobalStyles.cardOutline,
                {marginHorizontal: 11, marginBottom: 10},
              ]}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Text style={GlobalStyles.CardOrderText}>
                  Order : {item.Order}
                </Text>

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'lightblue',
                    borderRadius: 20,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                  }}>
                  <Text
                    style={{fontSize: 10, fontWeight: '800', color: 'green'}}>
                    Confirmed
                  </Text>
                </View>
              </View>

              <Text style={GlobalStyles.CardCreatedAndEpired}>
                Created At : {item.CreatedAt}
              </Text>
              <Text style={GlobalStyles.CardCreatedAndEpired}>
                Expires At : {item.ExpiresAt}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}>
                <Text style={GlobalStyles.CardTotalCoupons}>
                  Total : {item.TotalCoups}
                </Text>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="chevron-right" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderCardComponent;
