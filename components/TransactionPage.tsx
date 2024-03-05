import React, {useEffect} from 'react';
import {DeviceEventEmitter, Text, View} from 'react-native';
import {storage} from '../App';

const TransactionPage = () => {
  useEffect(() => {
    const tabPressListener = DeviceEventEmitter.addListener(
      'transaction',
      () => {
        console.log('PRESSED TRANSACTION');
        console.log(storage.getString('transactionID'));
        return () => {
          tabPressListener.remove();
        };
      },
    );
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#dbe7c9',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text className="text-black font-bold">TRANSACTION</Text>
    </View>
  );
};

export default TransactionPage;
