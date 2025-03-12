import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from '../GlobalStyles';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import MainBody from './MainBody';
import OrdersScreen from './OrdersScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailsScreen = ({navigation}: any) => {
  const foodData = [
    {
      id: 1,
      itemName: 'Aloo Samosa',
      coupon: 1,
      URL: require('../assets/foodImages/aloo-samosa.jpg'),
    },
    {
      id: 2,
      itemName: 'Banana Cake',
      coupon: 2,
      URL: require('../assets/foodImages/bananacake.jpg'),
    },
    {
      id: 3,
      itemName: 'Black Coffee',
      coupon: 1,
      URL: require('../assets/foodImages/machinecoffe.jpg'),
    },
    {
      id: 4,
      itemName: 'Egg Puff',
      coupon: 2,
      URL: require('../assets/foodImages/eggpuff.jpg'),
    },
    {
      id: 5,
      itemName: 'Irani Chai',
      coupon: 1,
      URL: require('../assets/foodImages/iranichai.jpg'),
    },
    {
      id: 6,
      itemName: 'Kachori',
      coupon: 2,
      URL: require('../assets/foodImages/kachori.jpg'),
    },
    {
      id: 7,
      itemName: 'Coffee',
      coupon: 1,
      URL: require('../assets/foodImages/machinecoffe.jpg'),
    },
    {
      id: 8,
      itemName: 'Lemon Tea',
      coupon: 1,
      URL: require('../assets/foodImages/lemontea.jpg'),
    },
    {
      id: 9,
      itemName: 'Sugar Free Coffee',
      coupon: 1,
      URL: require('../assets/foodImages/machinecoffe.jpg'),
    },
    {
      id: 10,
      itemName: 'Tea',
      coupon: 1,
      URL: require('../assets/foodImages/machinetea.jpg'),
    },
    {
      id: 11,
      itemName: 'Muffin',
      coupon: 1,
      URL: require('../assets/foodImages/muffin.jpg'),
    },
    {
      id: 12,
      itemName: 'Osmania Biscuits(3)',
      coupon: 1,
      URL: require('../assets/foodImages/osmaniabiscuit.jpg'),
    },
    {
      id: 13,
      itemName: 'Pastry',
      coupon: 2,
      URL: require('../assets/foodImages/pastry.jpg'),
    },
    {
      id: 14,
      itemName: 'Veg Puff',
      coupon: 1,
      URL: require('../assets/foodImages/vegpuff.jpg'),
    },
  ];

  const [selectedTab, setSelectedTab] = useState('food');

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Header */}
      <View
        style={[GlobalStyles.oneaigHeader, GlobalStyles.alignTextContainer]}>
        <Image
          style={{height: 30, width: 70}}
          source={require('../assets/oneaigicon.png')}
        />
        <AntDesignIcon
          name="home"
          size={24}
          color="white"
          style={{marginTop: 10}}
        />
      </View>

      {/* Main Body */}
      <View style={{paddingHorizontal: 15, flex: 1}}>
        {/* Tabs */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            marginTop: 15,
            borderRadius: 5,
            elevation: 3,
            padding: 5,
          }}>
          {/* Food Products Tab */}
          <TouchableOpacity
            onPress={() => setSelectedTab('food')}
            style={{
              flex: 1,
              backgroundColor: selectedTab === 'food' ? '#007bff' : 'white',
              padding: 10,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name="food"
              size={20}
              color={selectedTab === 'food' ? 'white' : 'black'}
              style={{marginRight: 5}}
            />
            <Text
              style={{
                color: selectedTab === 'food' ? 'white' : 'black',
                fontWeight: 'bold',
              }}>
              Food Products
            </Text>
          </TouchableOpacity>

          {/* Orders Tab */}
          <TouchableOpacity
            onPress={() => [setSelectedTab('orders')]}
            style={{
              flex: 1,
              backgroundColor: selectedTab === 'orders' ? '#007bff' : 'white',
              padding: 10,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="cart"
              size={20}
              color={selectedTab === 'orders' ? 'white' : 'black'}
              style={{marginRight: 5}}
            />
            <Text
              style={{
                color: selectedTab === 'orders' ? 'white' : 'black',
                fontWeight: 'bold',
              }}>
              Your Orders
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'food' ? (
          <MainBody foodData={foodData} />
        ) : (
          <OrdersScreen />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
