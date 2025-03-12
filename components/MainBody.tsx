import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import {Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const MainBody = ({foodData}: any) => {
  const navigation = useNavigation<NavigationProp>();
  const [couponsState, SetCouponsState] = useState(26);
  const [cardColors, setCardColors] = useState<{[key: number]: string}>({});
  const [selectedItems, setSelectedItems] = useState<{[key: number]: boolean}>(
    {},
  );
  const [ModalVisible, SetModalVisible] = useState(false);

  function handleSetCouponsState(
    coupon: number,
    changeType: 'increment' | 'decrement',
  ) {
    SetCouponsState(prevState => {
      if (changeType === 'increment') {
        return Math.max(0, prevState - coupon);
      } else {
        return prevState + coupon;
      }
    });
  }

  function toggleSelection(item: any) {
    setSelectedItems(prevState => {
      const isSelected = prevState[item.id];
      const updatedItems = {
        ...prevState,
        [item.id]: !isSelected,
      };
      setCardColors(prevColors => ({
        ...prevColors,
        [item.id]: !isSelected ? 'lightblue' : 'white',
      }));

      handleSetCouponsState(
        item.coupon,
        isSelected ? 'decrement' : 'increment',
      );

      return updatedItems;
    });
  }

  return (
    <View style={{flex: 1, width: '100%'}}>
      <LinearGradient
        colors={['#0A66A5', '#2c67f2']}
        style={[
          GlobalStyles.gradientBackground,
          {borderRadius: 10, padding: 10, marginTop: 30},
        ]}>
        <TouchableOpacity>
          <Text style={GlobalStyles.availableTokens}>
            Available Coupons: {couponsState}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Object.values(selectedItems).some(Boolean) ? 80 : 0,
          }}>
          <View style={{flex: 1}}>
            {foodData.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleSelection(item)}>
                <View
                  style={[
                    GlobalStyles.foodViewSize,
                    {backgroundColor: cardColors[item.id] || 'white'},
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingHorizontal: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Image
                        source={item.URL}
                        style={GlobalStyles.foodImageSize}
                      />
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        {item.itemName}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 3}}>
                      <Text style={GlobalStyles.CouponsTextSize}>
                        {item.coupon}
                      </Text>
                      <Text style={GlobalStyles.CouponsTextSize}>
                        {`(${item.coupon <= 1 ? 'Coupon' : 'Coupons'})`}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {Object.values(selectedItems).some(Boolean) && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#D9ECFF',
            padding: 15,
            borderTopWidth: 1,
            borderColor: '#B3DAFF',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 15,
            marginBottom: 8,
          }}>
          <Text style={{color: '#0A66A5', fontWeight: 'bold'}}>
            {Object.values(selectedItems).filter(Boolean).length}{' '}
            {Object.values(selectedItems).filter(Boolean).length === 1
              ? 'Product Selected'
              : 'Products Selected'}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#2c67f2',
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 8,
            }}
            // Example: main screen onPress
            onPress={() => {
              // Convert selectedItems -> array with quantity = 1
              const selectedItemsArray = Object.keys(selectedItems)
                .filter(id => selectedItems[Number(id)] === true)
                .map(id => {
                  const itemData = foodData.find((f: { id: number; }) => f.id === Number(id));
                  return {
                    ...itemData,
                    quantity: 1, // start with quantity 1
                  };
                });

              navigation.navigate('CheckoutPage', {
                selectedItems: selectedItemsArray, // array of item objects
                availableCoupons: couponsState,
              });
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Go To Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainBody;

