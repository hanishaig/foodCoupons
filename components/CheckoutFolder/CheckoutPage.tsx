import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageSourcePropType,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../../GlobalStyles';
import MaterialDesignIcon from 'react-native-vector-icons/FontAwesome';

interface Item {
  id: React.Key;
  URL: ImageSourcePropType;
  itemName: string;
  coupon: number;
  quantity: number;
}

const CheckoutPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Extract items + availableCoupons from route.params
  const { selectedItems = [], availableCoupons = 0 } = route.params || {};

  // Local state for items + coupons
  const [items, setItems] = useState<Item[]>(selectedItems);
  const [coupons, setCoupons] = useState<number>(availableCoupons);
  // Set modalVisible to false initially so the modal is hidden until "Checkout" is pressed.
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Compute total cost in coupons
  const totalCost = items.reduce(
    (sum: number, item: Item) => sum + item.coupon * item.quantity,
    0
  );

  // Increment item quantity
  const handleIncrement = (id: React.Key) => {
    setItems((prevItems: Item[]) =>
      prevItems.map((item: Item) => {
        if (item.id === id && coupons >= item.coupon) {
          setCoupons((prev: number) => prev - item.coupon);
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Decrement item quantity
  const handleDecrement = (id: React.Key) => {
    setItems((prevItems: Item[]) =>
      prevItems
        .map((item: Item) => {
          if (item.id === id && item.quantity > 1) {
            setCoupons((prev: number) => prev + item.coupon);
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item: Item) => item.quantity > 0)
    );
  };

  // Delete entire item
  const handleDelete = (id: React.Key) => {
    setItems((prevItems: Item[]) => {
      const itemToDelete = prevItems.find((item) => item.id === id);
      if (itemToDelete) {
        setCoupons((prev: number) => prev + itemToDelete.coupon * itemToDelete.quantity);
      }
      return prevItems.filter((item: Item) => item.id !== id);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={[GlobalStyles.oneaigHeader, GlobalStyles.alignTextContainer]}>
        <Image
          style={{ height: 30, width: 70 }}
          source={require('../../assets/oneaigicon.png')}
        />
        <AntDesignIcon name="home" size={24} color="white" style={{ marginTop: 10 }} />
      </View>

      {/* Top Banner for Available Coupons */}
      <View style={{ paddingHorizontal: 10 }}>
        <LinearGradient
          colors={['#0A66A5', '#2c67f2']}
          style={[GlobalStyles.gradientBackground, { borderRadius: 10, padding: 10, marginTop: 30 }]}
        >
          <Text style={GlobalStyles.availableTokens}>
            Available Coupons: {coupons}
          </Text>
        </LinearGradient>
      </View>

      {/* Scrollable Items List */}
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {items.map((item: Item) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Image source={item.URL} style={{ width: 50, height: 50, borderRadius: 10 }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.itemName}</Text>
              <Text style={{ fontSize: 14, color: 'gray' }}>
                {item.coupon} {item.coupon > 1 ? 'Coupons' : 'Coupon'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#007bff',
                  padding: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                }}
                onPress={() => handleDecrement(item.id)}
              >
                <AntDesignIcon name="minus" size={10} color="#fff" />
              </TouchableOpacity>

              {/* Quantity */}
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.quantity}</Text>

              {/* Increment Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#007bff',
                  padding: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                }}
                onPress={() => handleIncrement(item.id)}
              >
                <AntDesignIcon name="plus" size={10} color="#fff" />
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <MaterialDesignIcon name="trash" size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Checkout Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 15,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0A66A5' }}>
              Ordered Items:
            </Text>

            {/* Scrollable Ordered Items List */}
            <ScrollView style={{ maxHeight: 250 }} nestedScrollEnabled={true}>
              {items.map((item: Item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#f8f8f8',
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginVertical: 5,
                  }}
                >
                  {/* Item Image */}
                  <Image
                    source={item.URL}
                    style={{ width: 40, height: 40, borderRadius: 5, marginRight: 10 }}
                  />
                  {/* Item Details */}
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.itemName}</Text>
                  </View>
                  <Text style={{ fontSize: 16 }}>
                    {item.quantity} x {item.coupon}C
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* Total Cost */}
            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#ddd',
                paddingTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0A66A5' }}>
                Total:{' '}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: 3,
                  }}
                >
                  {totalCost}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                  {totalCost === 1 ? 'Coupon' : 'Coupons'}
                </Text>
              </View>
            </View>

            {/* Buttons */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 5,
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('QRCodePage')}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 5,
                  alignItems: 'center',
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#D9ECFF',
          padding: 15,
          borderRadius: 15,
          margin: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#0A66A5', fontWeight: 'bold' }}>
          Total: {totalCost} {totalCost === 1 ? 'Coupon' : 'Coupons'}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#2c67f2',
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 8,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutPage;
