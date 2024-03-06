import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  DeviceEventEmitter,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {storage} from '../App';
import {TransactionProps} from '../types/types';

interface Card {
  _id: string;
  uid: number;
  balance: number;
  isTap: boolean;
  in: string;
  history: [{in: string; out: string; fare: number; date: Date}];
}

const TransactionPage: React.FC<TransactionProps> = ({navigation}) => {
  const [uid, setUID] = useState<Number | null>(null);
  const [card, setCard] = useState<Card | null>(null);

  const backAction = () => {
    navigation.navigate('Main');
    // BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const fetchCard = async () => {
    console.log('FETCH CARD: ', uid);
    if (uid) {
      try {
        const response = await fetch(
          `https://mrt-server-shg0.onrender.com/api/cards/findID`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({enteredUID: uid}),
          },
        );

        console.log('PUMASOK');

        if (response.ok) {
          const card: Card = await response.json();
          console.log('UID: ', card.uid);
          setCard(card);
        }

        if (!response.ok) {
          console.log('ERROR');
        }
      } catch (error) {
        console.log('error');
      }
    }
  };

  useEffect(() => {
    console.log('PRESSED TRANSACTION');
    console.log(storage.getString('transactionID'));

    const card: number = Number(storage.getString('transactionID') || '');
    console.log('CARD: ', card);
    setUID(card);
  }, []);

  useEffect(() => {
    fetchCard();
  }, [uid]);

  return (
    <View className="h-full justify-start items-center">
      <View className="flex flex-col bg-[#dbe7c9] h-full w-full p-5 pb-8 justify-center items-center shadow-lg shadow-black">
        <Text className="flex bg-[#dbe7c9] shadow-xl shadow-black w-full text-[#0d9276] font-bold text-3xl  rounded-t-3xl text-center py-2">
          UID: {card?.uid}
        </Text>
        <View className="flex flex-row bg-[#0d9276] w-full">
          <Text className="flex-1 text-[#dbe7c9] text-center text-xl py-2 font-bold">
            In
          </Text>
          <Text className="flex-1 text-[#dbe7c9] text-center text-xl py-2 font-bold">
            Out
          </Text>
          <Text className="flex-1 text-[#dbe7c9] text-center text-xl py-2 font-bold">
            Fare
          </Text>
          <Text className="flex-1 text-[#dbe7c9] text-center text-xl py-2 font-bold">
            Date
          </Text>
        </View>
        {card && card.history.length > 0 ? (
          <ScrollView className="bg-[#0d9276] w-full rounded-b-3xl px-2">
            {card.history.map((transaction, index) => (
              <View
                key={index}
                className={`flex flex-row items-center ${
                  index % 2 === 0 ? 'bg-[#0d9276]' : 'bg-[#dbe7c9]'
                }`}>
                <Text className="flex-1 text-white text-center font-bold">
                  {transaction.in}
                </Text>
                <Text className="flex-1 text-white text-center font-bold">
                  {transaction.out}
                </Text>
                <Text className="flex-1 text-red-400 text-center font-bold">
                  -{transaction.fare}
                </Text>
                <Text className="flex-1 text-white text-center font-bold">
                  {transaction.date.toString().split('T')[0]}
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View className="flex flex-1 bg-[#dbe7c9] w-full h-rounded-b-3xl px-2 shadow-xl shadow-black">
            <View className="flex flex-1 items-center justify-center">
              <Text className="text-[#0d9276] text-2xl font-bold">
                No existing history
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default TransactionPage;
