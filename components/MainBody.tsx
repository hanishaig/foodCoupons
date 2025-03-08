import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MainBody = ({foodData}: any) => {
  const [couponsState, SetCouponsState] = useState(26);
  const [cardColors, setCardColors] = useState<{[key: number]: string}>({});
  const [itemCounts, setItemCounts] = useState<{[key: number]: number}>({});

  // function handleSetCouponsState(coupon: number) {
  //   SetCouponsState(prevState => Math.max(0, prevState - coupon));
  // }
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

  function handleIncrementDecrement(id: number, change: number) {
    setItemCounts(prevState => {
      const newCount = Math.max(0, (prevState[id] || 0) + change);
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
        <ScrollView>
          <View style={{flex: 1}}>
            {foodData.map(
              (item: {
                id: number;
                itemName: string;
                coupon: number;
                URL: any;
              }) => (
                <View key={item.id}>
                  <View
                    style={[
                      GlobalStyles.foodViewSize,
                      {backgroundColor: cardColors[item.id] || 'white'}, // Set individual card color
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
                          {/* + Button */}
                          {/* <TouchableOpacity
                            onPress={() => {
                              handleSetCouponsState(item.coupon, 'increment'); // Reduce available coupons
                              handleIncrementDecrement(item.id, 1);
                              updateCardColor(item.id, 'lightblue');
                            }}>
                            <MaterialCommunityIcons
                              name="plus-circle-outline"
                              size={20}
                            />
                          </TouchableOpacity> */}

                           {/* - Button */}
                          <TouchableOpacity
                            onPress={() => {
                              if (itemCounts[item.id] > 0) {
                                handleSetCouponsState(item.coupon, 'decrement'); // Restore available coupons
                                handleIncrementDecrement(item.id, -1);
                                updateCardColor(
                                  item.id,
                                  itemCounts[item.id] > 1
                                    ? 'lightblue'
                                    : 'white',
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

                          <TouchableOpacity
                            onPress={() => {
                              if (couponsState >= item.coupon) {
                                // Ensure enough coupons are available
                                handleSetCouponsState(item.coupon, 'increment');
                                handleIncrementDecrement(item.id, 1);
                                updateCardColor(item.id, 'lightblue');
                              }
                            }}
                            disabled={couponsState < item.coupon} // Disable button when not enough coupons
                          >
                            <MaterialCommunityIcons
                              name="plus-circle-outline"
                              size={20}
                              color={
                                couponsState < item.coupon ? 'gray' : 'green'
                              } // Dim when disabled
                            />
                          </TouchableOpacity>

                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ),
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MainBody;
