import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {LoginProps} from '../types/types';

const LoginPage: React.FC<LoginProps> = ({navigation}) => {
  const [pin, setPin] = useState('');

  const navigateToHome = () => {
    console.log(pin);
    setPin('');
    navigation.navigate('Main');
  };

  return (
    <View className="bg-[#dbe7c9] h-full justify-center items-center">
      <View className="flex space-y-8 h-auto items-center justify-center">
        <Text className="text-[#0d9276] font-bold text-4xl">
          GlobalTek Rails Mobile
        </Text>
        <View className="space-y-4">
          <View className="flex flex-row space-x-4">
            <TextInput
              className="bg-slate-100 border-[#0d9276] border-2 px-3 w-36 h-10 rounded-lg text-black font-bold"
              readOnly
              value={pin}
            />
            <TouchableOpacity
              className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black"
              onPress={navigateToHome}>
              <Text className="font-bold text-[#dbe7c9]">Login</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-col space-y-4">
            <View className="flex flex-row space-x-6">
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '1');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '2');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '3');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">3</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row space-x-6">
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '4');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '5');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '6');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">6</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row space-x-6">
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '7');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '8');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '9');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">9</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row space-x-6 justify-center">
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '0');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">0</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View className="bg-[#0d9276] p-2 w-full absolute bottom-0 items-center justify-center ">
        <Text className="text-white/60">
          Globaltek Rails™. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

export default LoginPage;
