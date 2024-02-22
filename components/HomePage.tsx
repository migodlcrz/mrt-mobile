import React from 'react';
import {View, Text} from 'react-native';

function HomePage() {
  return (
    <View
      style={{
        backgroundColor: '#dbe7c9',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text className="text-black font-bold">HOME</Text>
    </View>
  );
}

export default HomePage;
