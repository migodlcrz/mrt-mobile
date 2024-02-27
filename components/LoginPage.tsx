import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {LoginProps} from '../types/types';
import {storage} from '../App';
import Toast from 'react-native-toast-message';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome6';

const LoginPage: React.FC<LoginProps> = ({navigation}) => {
  // storage.set('pin', '0813');

  const [pin, setPin] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [pinMessage, setPinMessage] = useState('Enter your pin');

  const checkPin = () => {
    if (pinMessage === 'Register your pin.') {
      storage.set('pin', pin);
      Toast.show({
        type: 'success',
        text1: 'Pin registered!',
        text1Style: {color: 'green', fontSize: 20},
      });
      setPinMessage('Enter your pin');
      setPin('');
      setShowKeyboard(false);
      return;
    }
    const localPin = storage.getString('pin');
    console.log('Local storage pin: ', storage.getString('pin'));
    console.log('Pin entered: ', pin);
    if (pin === ``) {
      Toast.show({
        type: 'error',
        text1: 'No input!',
        text1Style: {color: 'red', fontSize: 20},
      });
      return;
    }
    if (localPin !== pin) {
      Toast.show({
        type: 'error',
        text1: 'Wrong Pin!',
        text1Style: {color: 'red', fontSize: 20},
      });
      setPin('');
      console.log('Pin Incorrect');
      return;
    }
    setPin('');
    navigation.navigate('Main');
  };

  const setPinAndUpdate = (newPin: string) => {
    if (newPin.length <= 4) {
      setPin(newPin);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    storage.set('pin', '');
    if (storage.getString('pin') === '') {
      setPinMessage('Register your pin.');
    }
  }, []);

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
          <TouchableOpacity
            className="flex flex-row space-x-2 justify-center"
            onPress={() => setShowKeyboard(!showKeyboard)}>
            <TextInput
              className="pin1 bg-slate-200 border-[#0d9276] border-2 px-3 w-14 py-2 rounded-lg text-black text-3xl text-center font-bold"
              placeholderTextColor="#BDBDBD"
              readOnly
              value={pin[0] || ''}
            />
            <TextInput
              className="pin2 bg-slate-200 border-[#0d9276] border-2 px-3 w-14 py-2 rounded-lg text-black text-3xl text-center font-bold"
              placeholderTextColor="#BDBDBD"
              readOnly
              value={pin[1] || ''}
            />
            <TextInput
              className="pin3 bg-slate-200 border-[#0d9276] border-2 px-3 w-14 py-2 rounded-lg text-black text-3xl text-center font-bold"
              placeholderTextColor="#BDBDBD"
              readOnly
              value={pin[2] || ''}
            />
            <TextInput
              className="pin4 bg-slate-200 border-[#0d9276] border-2 px-3 w-14 py-2 rounded-lg text-black text-3xl text-center font-bold"
              placeholderTextColor="#BDBDBD"
              readOnly
              value={pin[3] || ''}
            />
          </TouchableOpacity>
          {!showKeyboard && (
            <View>
              <Text className="text-gray-400">{pinMessage}</Text>
            </View>
          )}
          {showKeyboard && (
            <View className="flex flex-col space-y-4 w-[200px] items-center">
              <View className="flex flex-row space-x-4">
                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '1');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 flex justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '2');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '3');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">3</Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row space-x-4">
                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '4');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '5');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '6');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">6</Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row space-x-4">
                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '7');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '8');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '9');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">9</Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row space-x-4 w-full justify-end">
                <TouchableOpacity
                  onPressIn={() => {
                    setPinAndUpdate(pin + '0');
                  }}
                  className="bg-[#0d9276] p-3 rounded-full shadow-lg shadow-black h-14 w-14 justify-center items-center">
                  <Text className="font-bold text-[#dbe7c9] text-2xl">0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={handleBackspace}
                  className="bg-[#dbe7c9] p-3 rounded-full h-14 w-14 justify-center items-center">
                  <Icon name="delete-left" size={30} color="#0d9276" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {showKeyboard && (
            <View className="flex w-[220px]">
              <TouchableOpacity
                className="bg-[#0d9276] py-3 rounded-lg shadow-lg shadow-black"
                onPress={checkPin}>
                <Text className="font-bold text-[#dbe7c9] text-2xl text-center">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
