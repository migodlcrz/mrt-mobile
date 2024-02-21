import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View className="flex flex-row justify-between items-center bg-[#0d9276] py-4 px-14">
      <Text className="text-white" onPress={navigateHome}>
        Home
      </Text>
      <Text className="text-white">Scan</Text>
      <Text className="text-white">Settings</Text>
    </View>
  );
};

export default Footer;
