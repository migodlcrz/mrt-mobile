import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <Icon name="search" size={30} color="#900" />
    </View>
  );
}

export default HomePage;
