import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MainBody = ({foodData}: any) => {
  const [couponsState, SetCouponsState] = useState(26);
  const [cardColors, setCardColors] = useState<{[key: number]: string}>({});
  const [itemCounts, setItemCounts] = useState<{[key: number]: number}>({});
  const [selectedItem, setSelectedItem] = useState<any>(null); // For new view

  function handleSetCouponsState(
    coupon: number,
    changeType: 'increment' | 'decrement',
  ) {
    SetCouponsState(prevState => {
      if (changeType === 'increment') {
        return Math.max(0, prevState - coupon); // Reduce available coupons
      } else {
        return prevState + coupon; // Restore available coupons when decrementing
      }
    });
  }

  function updateCardColor(id: number, color: string) {
    setCardColors(prevState => ({
      ...prevState,
      [id]: color,
    }));
  }

  function handleIncrementDecrement(id: number, change: number, item: any) {
    setItemCounts(prevState => {
      const newCount = Math.max(0, (prevState[id] || 0) + change);

      if (newCount > 0) {
        setSelectedItem(item); // Show new view if count is above 0
      } else {
        setSelectedItem(null); // Hide new view if count is 0
      }

      return {
        ...prevState,
        [id]: newCount,
      };
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

      {/* Scrollable Food List */}
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{paddingBottom: selectedItem ? 80 : 0}}>
          <View style={{flex: 1}}>
            {foodData.map((item: any) => (
              <View key={item.id}>
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
                      <View style={{flexDirection: 'row', gap: 3}}>
                        <Text style={GlobalStyles.CouponsTextSize}>
                          {item.coupon}
                        </Text>
                        <Text style={GlobalStyles.CouponsTextSize}>
                          {`(${item.coupon <= 1 ? 'Coupon' : 'Coupons'})`}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        {/* - Button */}
                        <TouchableOpacity
                          onPress={() => {
                            if (itemCounts[item.id] > 0) {
                              handleSetCouponsState(item.coupon, 'decrement');
                              handleIncrementDecrement(item.id, -1, item);
                              updateCardColor(
                                item.id,
                                itemCounts[item.id] > 1 ? 'lightblue' : 'white',
                              );
                            }
                          }}>
                          <MaterialCommunityIcons
                            name="minus-circle-outline"
                            size={20}
                            color={'red'}
                          />
                        </TouchableOpacity>

                        {/* Display Count */}
                        <Text>{itemCounts[item.id] || 0}</Text>

                        {/* + Button */}
                        <TouchableOpacity
                          onPress={() => {
                            if (couponsState >= item.coupon) {
                              handleSetCouponsState(item.coupon, 'increment');
                              handleIncrementDecrement(item.id, 1, item);
                              updateCardColor(item.id, 'lightblue');
                            }
                          }}
                          disabled={couponsState < item.coupon}>
                          <MaterialCommunityIcons
                            name="plus-circle-outline"
                            size={20}
                            color={
                              couponsState < item.coupon ? 'gray' : 'green'
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Fixed Dynamic View at Bottom */}
      {Object.values(itemCounts).some(count => count > 0) && (
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
            {Object.values(itemCounts).reduce(
              (total, count) => total + count,
              0,
            )}{' '}
            {Object.values(itemCounts).reduce(
              (total, count) => total + count,
              0,
            ) === 1
              ? 'Product Added'
              : 'Products Added'}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#2c67f2',
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 8,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Go to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainBody;
