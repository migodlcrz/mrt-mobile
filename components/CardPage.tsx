import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Card {
  _id: string;
  uid: number;
  balance: number;
  isTap: boolean;
  in: string;
  history: [{in: string; out: string; date: Date}];
}

const CardPage = () => {
  const [cardSearch, setCardSearch] = useState<string>('');
  const [fetchedCard, setFetchedCard] = useState<Card | null>(null);

  const fetchMatchingCards = async (uid: number) => {
    try {
      const response = await fetch(`http://10.200.53.193:4000/api/cards`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });

      const cards: Card[] = await response.json();

      // Now, you can iterate through the cards and check for a match
      cards.forEach(card => {
        if (card.uid === uid) {
          console.log('Match found:', card);
          setFetchedCard(card);
        }
      });
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleAddCard = async () => {
    console.log('================================');
    const cardNumber = Number(cardSearch);
    fetchMatchingCards(cardNumber);
  };

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
      <View className="bg-[#dbe7c9] h-full justify-start items-center p-6">
        <Text className="text-[#0d9276] font-bold text-4xl">
          GlobalTek Cards
        </Text>
        <View className="flex space-y-4 w-full h-full max-h-full pt-4">
          <View className="flex flex-row bg-[#0d9276] rounded-3xl p-2 justify-center items-center">
            <TouchableOpacity className="flex w-1/5 items-center">
              <Text className="font-bold text-xl bg-[#dbe7c9] rounded-full w-8 h-8 text-center justify-center items-center text-black">
                +
              </Text>
            </TouchableOpacity>
            <TextInput
              value={cardSearch}
              onChangeText={text => setCardSearch(text)}
              className="bg-white rounded-2xl w-4/5 text-black px-4 text-xl"
              keyboardType="numeric"
              onSubmitEditing={handleAddCard}
            />
          </View>
          <View className="flex flex-col bg-[#0d9276] rounded-3xl p-2 justify-center items-center">
            {/* <View className="bg-[#dbe7c9] w-full rounded-2xl p-2"> */}
            <Text className="text-[#dbe7c9] text-start font-bold text-4xl">
              {fetchedCard?.uid}
            </Text>
            <Text className="text-[#dbe7c9] text-2xl">
              Balance: {fetchedCard?.balance}
            </Text>
            <Text className="text-[#dbe7c9] text-start text-3xl font-bold">
              History:
            </Text>
            {fetchedCard?.history.map((entry, index) => (
              <View key={index}>
                <Text>{`In: ${entry.in}, Out: ${entry.out}, Date: ${entry.date}`}</Text>
              </View>
            ))}
            {/* </View> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CardPage;
