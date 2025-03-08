import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MainBody = ({foodData}: any) => {
  const [couponsState, SetCouponsState] = useState(26);
  const [cardColors, setCardColors] = useState({});

  function handleSetCouponsState(coupon: number, id: number) {
    SetCouponsState(prevState => Math.max(0, prevState - coupon));
    setCardColors(prevColors => ({
      ...prevColors,
      [id]: prevColors[id] === 'lightblue' ? 'white' : 'lightblue',
    }));
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
            Available Coupons : {couponsState}
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
                <TouchableOpacity
                  key={item.id}
                  style={[
                    GlobalStyles.foodViewSize,
                    {backgroundColor: cardColors[item.id] || 'white'},
                  ]}
                  onPress={() => handleSetCouponsState(item.coupon, item.id)}>
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
                        {`${item.coupon <= 1 ? 'Coupon' : 'Coupons'}`}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ),
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MainBody;
