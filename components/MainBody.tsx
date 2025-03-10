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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderedItems from './OrderedItems/QRCodePage';
import {Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '../types';


const MainBody = ({foodData}: any) => {
  const navigation = useNavigation<NavigationProp>();
  const [couponsState, SetCouponsState] = useState(26);
  const [cardColors, setCardColors] = useState<{[key: number]: string}>({});
  const [itemCounts, setItemCounts] = useState<{[key: number]: number}>({});
  const [selectedItem, setSelectedItem] = useState<any>(null); // For new view
  const [ModalVisible, SetModalVisible] = useState(false);

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

  function handleModalVisible(data: boolean) {
    SetModalVisible(data);
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
          <View>
            <Text style={{color: '#0A66A5', fontWeight: 'bold'}}>
              {
                Object.keys(itemCounts).filter(
                  key => itemCounts[Number(key)] > 0,
                ).length
              }{' '}
              {Object.keys(itemCounts).filter(
                key => itemCounts[Number(key)] > 0,
              ).length === 1
                ? 'Product Selected'
                : 'Products Selected'}
            </Text>

            {/* <Text style={{color: '#0A66A5', fontWeight: 'bold'}}>
              {Object.values(itemCounts).reduce(
                (total, count) => total + count,
                0,
              )}{' '}
              {Object.values(itemCounts).reduce(
                (total, count) => total + count,
                0,
              ) === 1
                ? 'Coupon Added'
                : 'Coupons Added'}
            </Text> */}
          </View>
          <Modal
            visible={ModalVisible}
            animationType="slide"
            transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View
                style={{
                  width: '90%',
                  maxHeight: '80%',
                  minHeight: '40%',
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 15,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                }}>
                {/* Ordered Items Section */}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#0A66A5',
                    marginBottom: 10,
                  }}>
                  Ordered Items:
                </Text>
                <SafeAreaView style={{flex: 1}}>
                  <ScrollView style={{flex: 1}}>
                    {' '}
                    {Object.entries(itemCounts).map(([id, count]) => {
                      if (count > 0) {
                        const item = foodData.find(
                          (food: {id: string}) => food.id == id,
                        );
                        return (
                          <View
                            key={id}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: '#F7F7F7',
                              padding: 8,
                              borderRadius: 10,
                              marginBottom: 6,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                              }}>
                              <Image
                                source={item.URL}
                                style={{width: 30, height: 30, borderRadius: 5}}
                              />
                              <Text style={{fontWeight: 'bold'}}>
                                {item.itemName}
                              </Text>
                            </View>
                            <Text>
                              {count} x {item.coupon}C
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </ScrollView>
                </SafeAreaView>

                {/* Total Count */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    borderTopWidth: 1,
                    borderColor: '#E0E0E0',
                    paddingTop: 10,
                  }}>
                  <Text style={{fontWeight: 'bold', color: '#0A66A5'}}>
                    Total:
                  </Text>
                  <Text style={{fontWeight: 'bold', color: '#000'}}>
                    {(() => {
                      const totalCoupons = Object.entries(itemCounts).reduce(
                        (total, [id, count]) =>
                          total +
                          (foodData.find((item: {id: string}) => item.id == id)
                            ?.coupon || 0) *
                            count,
                        0,
                      );
                      return `${totalCoupons} ${
                        totalCoupons === 1 ? 'Coupon' : 'Coupons'
                      }`;
                    })()}
                  </Text>
                </View>

                {/* Confirm and Edit Buttons */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#28A745',
                      flex: 1,
                      alignItems: 'center',
                      paddingVertical: 10,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    onPress={() => navigation.navigate("QRCodePage")}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      Confirm
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => SetModalVisible(false)}
                    style={{
                      backgroundColor: '#DC3545',
                      flex: 1,
                      alignItems: 'center',
                      paddingVertical: 10,
                      borderRadius: 10,
                      marginLeft: 5,
                    }}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={{
              backgroundColor: '#2c67f2',
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 8,
            }}
            onPress={() => {
              handleModalVisible(true);
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainBody;
