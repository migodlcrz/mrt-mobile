import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {LoginProps} from '../types/types';

const LoginPage: React.FC<LoginProps> = ({navigation}) => {
  const [pin, setPin] = useState('');

  const navigateToHome = () => {
    console.log(pin);
    setPin('');
    navigation.navigate('Main');
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1)); // Remove the last character from pin
  };

  return (
    <View className="bg-[#dbe7c9] h-full justify-center items-center">
      <View className="flex space-y-8 h-auto items-center justify-center">
        <View className="flex flex-col items-center">
          <Text className="text-[#0d9276] font-black text-4xl">
            GlobalTek Rails Mobile
          </Text>
          <Text className=" text-black font-bold text-3xl">Welcome User</Text>
        </View>
        <View className="space-y-4 items-center">
          <View className="flex flex-row space-x-4 justify-center">
            <TextInput
              className="bg-slate-100 border-[#0d9276] border-2 px-3 w-56 py-2 rounded-lg text-black text-3xl text-center font-bold"
              placeholder="Enter Pin"
              placeholderTextColor="#BDBDBD"
              readOnly
              value={pin}
            />
          </View>
          <View className="flex flex-col space-y-4 w-[217px] items-center">
            <View className="flex flex-row space-x-6">
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '1');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '2');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '3');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">3</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row space-x-6">
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '4');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '5');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '6');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">6</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row space-x-6">
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '7');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '8');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '9');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">9</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row space-x-6 w-full justify-end">
              <TouchableOpacity
                onPress={() => {
                  setPin(prev => prev + '0');
                }}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9] text-2xl">0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBackspace}
                className="bg-[#0d9276] p-3 rounded-lg shadow-lg shadow-black h-14 w-14 justify-center items-center">
                <Text className="font-bold text-[#dbe7c9]">Back</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex w-[220px]">
            {/* <Text>Hello</Text> */}
            <TouchableOpacity
              className="bg-[#0d9276] py-3 rounded-lg shadow-lg shadow-black"
              onPress={navigateToHome}>
              <Text className="font-bold text-[#dbe7c9] text-2xl text-center">
                Login
              </Text>
            </TouchableOpacity>
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
