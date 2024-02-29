import React, {useEffect} from 'react';
import {View, Text, DeviceEventEmitter} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function HomePage() {
  console.log('NATRIGGER YUNG HOME PAGE');

  useEffect(() => {
    const tabPressListener = DeviceEventEmitter.addListener('home', () => {
      console.log('PRESSED HOME');

      return () => {
        tabPressListener.remove();
      };
    });
  }, []);
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
