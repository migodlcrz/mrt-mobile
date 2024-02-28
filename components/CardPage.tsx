import React, {useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import {storage} from '../App';

import {
  RefreshControl,
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
  const [hasSearchTerm, setHasSearchTerm] = useState(false);
  const [lCards, setLCards] = useState<Card[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMatchingCards = async () => {
    const uid = Number(cardSearch);
    var found = false;
    try {
      const response = await fetch(
        `https://mrt-server-shg0.onrender.com/api/cards`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        },
      );

      const cards: Card[] = await response.json();

      cards.forEach(card => {
        if (card.uid === uid) {
          found = true;
          setFetchedCard(card);
          setHasSearchTerm(true);
        }
      });

      if (!found) {
        Toast.show({
          type: 'error',
          text1: 'No matching card',
          text1Style: {color: 'red', fontSize: 20},
        });
        setCardSearch('');
        return;
      }

      Toast.show({
        type: 'success',
        text1: `${cardSearch} found!`,
        text1Style: {color: 'green', fontSize: 20},
      });
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleAddCard = async () => {
    try {
      let existingCards = storage.getString('cardlist');
      if (!existingCards) {
        existingCards = '[]';
      }

      storage.set(
        'cardlist',
        JSON.stringify([...JSON.parse(existingCards), fetchedCard]),
      );

      console.log('success');
      fetchLocalCards();
    } catch (error) {
      console.log('internal error');
    }

    setCardSearch('');
    setHasSearchTerm(false);
    Toast.show({
      type: 'success',
      text1: `${cardSearch} added!  `,
      text1Style: {color: 'green', fontSize: 20},
    });
  };

  const fetchLocalCards = () => {
    const localCards = storage.getString('cardlist');
    if (localCards) {
      setLCards(JSON.parse(localCards));
    }
  };

  const fetchRefreshCards = async () => {
    const card: string[] = [];

    for (let i = 0; i < lCards.length; i++) {
      const uid = lCards[i].uid;
      card.push(String(uid));
    }

    const response = await fetch(
      'https://mrt-server-shg0.onrender.com/api/cards/mobile/get',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uid: card}),
      },
    );

    if (response.ok) {
      Toast.show({
        type: 'success',
        text1: `Refereshed`,
        text1Style: {color: 'green', fontSize: 20},
      });
      const responseData = await response.json();
      storage.set('cardlist', JSON.stringify(responseData));
      fetchLocalCards();
    } else {
      console.error(
        'Failed to fetch data:',
        response.status,
        response.statusText,
      );
    }

    setRefreshing(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    fetchRefreshCards();
  };

  useEffect(() => {
    // storage.delete('cardlist');
    // storage.delete('cards');
    fetchLocalCards();
  }, []);

  return (
    <View className="bg-[#dbe7c9] h-full justify-start items-center p-4">
      <Text className="text-[#0d9276] font-bold text-4xl">GlobalTek Cards</Text>

      {/* search card */}
      <View className="flex space-y-4 w-full h-full max-h-full pt-4">
        <View className="flex flex-row bg-[#0d9276] rounded-3xl p-2 justify-center items-center shadow-lg shadow-black">
          <TextInput
            value={cardSearch}
            onChangeText={text => setCardSearch(text)}
            placeholder="Enter UID number to search"
            placeholderTextColor={'gray'}
            className="bg-white rounded-2xl w-full text-black px-4 text-xl"
            keyboardType="numeric"
            onSubmitEditing={fetchMatchingCards}
          />
        </View>

        {/* confirm card */}
        {hasSearchTerm ? (
          <View className="flex flex-col space-y-2 bg-[#0d9276] rounded-3xl p-4 justify-center shadow-lg shadow-black">
            <Text className="text-[#dbe7c9] font-bold text-4xl">
              {fetchedCard?.uid}
            </Text>
            <Text className="text-[#dbe7c9] text-2xl">
              Balance: ₱{fetchedCard?.balance}
            </Text>

            <View className="flex flex-row  justify-between">
              <TouchableOpacity
                className="bg-[#dbe7c9] items-center justify-center rounded-xl h-10 w-24 shadow-lg shadow-black"
                onPress={handleAddCard}>
                {/* <Icon name="plus" size={30} color="#0d9276" /> */}
                <Text className=" text-xl text-black">Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#dbe7c9] items-center justify-center rounded-xl h-10 w-24"
                onPress={() => {
                  setHasSearchTerm(false);
                  setCardSearch('');
                }}>
                <Text className=" text-xl text-black">
                  {/* <Icon name="minus" size={30} color="#0d9276" /> */}
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="flex flex-col h-[150px] bg-gray-200 rounded-3xl p-4 justify-center items-center shadow-lg shadow-black">
            <Text className="text-gray-500 ">Search to see details</Text>
          </View>
        )}
        <View className="flex flex-row justify-between items-center border-b-2">
          <Text className="font-bold text-[#0d9276] text-center text-2xl">
            Cards
          </Text>
          <TouchableOpacity onPress={fetchRefreshCards}>
            <Icon name="refresh" size={30} color="#0d9276" />
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {lCards &&
            lCards.map((card: Card, index: number) => {
              return (
                <View key={index}>
                  <View className="flex flex-col space-y-2 bg-[#0d9276] rounded-2xl p-4 justify-center shadow-lg shadow-black my-2">
                    <Text className="text-white font-bold text-4xl">
                      {card.uid}
                    </Text>
                    <Text className="text-white text-2xl">
                      Balance: ₱{card.balance}
                    </Text>
                    <View className="flex items-end">
                      <TouchableOpacity className="bg-red-800 py-2 px-3 rounded-xl w-auto text-center shadow-lg shadow-black">
                        <Icon name="trash" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default CardPage;
