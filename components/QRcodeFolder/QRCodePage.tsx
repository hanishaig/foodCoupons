import {View, Text, BackHandler, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from '../../GlobalStyles';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const QRCodePage = ({navigation}:any) => {


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* Header */}
      <View
        style={[GlobalStyles.oneaigHeader, GlobalStyles.alignTextContainer]}>
        <Image
          style={{height: 30, width: 70}}
          source={require('../../assets/oneaigicon.png')}
        />
        <AntDesignIcon
          name="home"
          size={24}
          color="white"
          style={{marginTop: 10}}
        />
      </View>
      <View>
        <View style={{display: 'flex'}}>
          <View style={[GlobalStyles.QRcodebarbackground]}>
            <Text style={GlobalStyles.QRcodebarMainHeading}>Order Raised</Text>
            <Text style={GlobalStyles.QRcodebarSubHeading}>
              10-03-2025 ON 11:37 AM
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/017/441/744/large_2x/qr-code-icon-qr-code-sample-for-smartphone-scanning-isolated-illustration-vector.jpg',
              }}
              style={{width: 350, height: 350, marginTop: 25}}
            />
            <View style={{flexDirection: 'row', gap: 14, marginTop: -34}}>
              <Text style={{color: 'grey'}}>Expires At</Text>
              <Text style={[GlobalStyles.QRcodeExpiresHading]}>
                10 MAR 2025 , 11:57 AM
              </Text>
            </View>
            <TouchableOpacity style={[GlobalStyles.QRcodecheckstatus]}>
              <AntDesignIcon
                name="reload1"
                size={14}
                color="black"
                onPress={() => console.log('Refresh pressed')}
              />
              <Text style={[GlobalStyles.QRcodecheckstatustext]}>
                Check Status
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />
            <View style={{flexDirection: 'row', gap: 45}}>
              <TouchableOpacity style={[GlobalStyles.qrcodesharecancelbuttons]}>
                <Text style={[GlobalStyles.qrcodesharecancelbuttonsText]}>
                  Share
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[GlobalStyles.qrcodesharecancelbuttons]}
              onPress={()=>{navigation.navigate('HomeScreen')}}
              
              >
                <Text style={[GlobalStyles.qrcodesharecancelbuttonsText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />
            <Text style={{color: 'black', fontSize: 15, fontWeight: 700}}>
              Order Details
            </Text>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',width:'100%'}}>
              <Text>Irani Chai</Text>
              <Text>x1(1c)</Text>
            </View>
            <Text 
            style={{color:'royalblue',fontSize:20,fontWeight:'700',marginTop:30}}
            >Total : 1 coupon</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QRCodePage;