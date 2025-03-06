import {View, TextInput} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../../GlobalStyles';
import {Text} from 'react-native-gesture-handler';

const Page1 = () => {
  const [border, SetBorder] = useState(false);

  return (
    <View style={[GlobalStyles.Input, {height: '100%', width: '100%'}]}>
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
      <View
        style={{
          alignItems:'center',
          marginTop:'55%'
        }}>
        <Text style={{fontSize:18}}>No Transactions</Text>
      </View>
    </View>
  );
};

export default Page1;
