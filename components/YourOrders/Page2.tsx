import { View, Text } from 'react-native'
import React from 'react'
import GlobalStyles from '../../GlobalStyles'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import OrderCardComponent from './OrderCardComponent'



const Page2 = () => {
   const [border, SetBorder] = useState(false);

  return (
    <View style={[GlobalStyles.Input, {height: '93%', width: '100%'}]}>
    <TextInput
      onFocus={() => SetBorder(!border)}
      style={[
        GlobalStyles.TextInput,
        {
          borderColor: border ? 'black' : 'transparent',
          borderWidth: 1,
          borderRadius: 6,
        },
      ]}
      placeholder="Search By Order Id"
      keyboardType="numeric"
    />
    <OrderCardComponent></OrderCardComponent>
  </View>
  )
}

export default Page2