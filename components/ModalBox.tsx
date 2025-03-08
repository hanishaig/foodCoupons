// import {
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     View,
//     StatusBar,
//     TouchableOpacity,
//     Alert,
//   } from 'react-native';
//   import React, {useState} from 'react';
//   import Modal from 'react-native-modal';

  
//   const ModalBox = ({navigation}:any) => {
//     const [ModalShow, SetModalShow] = useState(false);
  
//     return (
//       <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
//         <View>
//           <TouchableOpacity
//             style={{
//               backgroundColor: 'grey',
//               alignSelf: 'center',
//               marginTop: 20,
//               borderRadius: 5,
//             }}
//             onPress={() => SetModalShow(!ModalShow)}>
//             <Text
//               style={{fontSize: 20, fontWeight: '700', paddingHorizontal: 15}}>
//               Click me
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <Modal
//            isVisible={ModalShow}
//            onBackdropPress={() => SetModalShow(false)}
//            animationIn="slideInUp"
//            animationOut="slideOutDown">
//             {/* visible={ModalShow}
//             animationType="slide"
//             transparent={true}
//             onRequestClose={() => {
//               console.log('closed');
//             }}> */}
//             <View
//               style={{
//                 backgroundColor: 'lightblue',
//                 alignItems: 'center',
//                 alignSelf: 'center',
//                 marginTop: '190%',
//                 paddingHorizontal: 25,
//                 borderRadius: 8,
//                 flexDirection: 'row',
//                 gap: 25,
//                 paddingVertical: 8,
//                 shadowColor:'black'
//               }}>
//               <TouchableOpacity
//                 style={{backgroundColor: 'red', paddingVertical: 4, borderRadius: 50,paddingHorizontal:8}}
//                 onPress={() => SetModalShow(!ModalShow)}>
//                 <Text>Close</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//               onPress={()=>navigation.navigate('CheckoutScreen')}
//               style={{backgroundColor:'royalblue',paddingVertical:4,borderRadius:50,paddingHorizontal:8}}
//               >
//                 <Text
//                 style={{color:'white',fontSize:19,fontWeight:'700'}}
//                 >Checkout</Text>
//               </TouchableOpacity>
//             </View>
//           </Modal>
//         </View>
//       </SafeAreaView>
//     );
//   };
  
//   export default ModalBox