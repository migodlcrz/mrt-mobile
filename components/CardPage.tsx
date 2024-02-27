import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {storage} from '../App';
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
  const [hasSearchTerm, setHasSearchTerm] = useState(false);
  const [localCards, setLocalCards] = useState<Card[]>([]);

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
      if (fetchedCard) {
        const existingCards = storage.getString('cardlist');
        console.log('EXISTING CARDS', existingCards);
        const cardString = JSON.stringify(fetchedCard);

        storage.set('cardlist', existingCards + cardString);

        console.log('success');
      } else {
        console.log('no card');
      }
      setCardSearch('');
      setHasSearchTerm(false);
    } catch (error) {
      console.log('internal error');
    }

    console.log('==================================');
    console.log(storage.getString('cardlist'));
  };

  const fetchLocalCards = () => {};

  useEffect(() => {
    fetchLocalCards();
  }, []);

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
      <View className="bg-[#dbe7c9] h-full justify-start items-center p-6">
        <Text className="text-[#0d9276] font-bold text-4xl">
          GlobalTek Cards
        </Text>

        {/* search card */}
        <View className="flex space-y-4 w-full h-full max-h-full pt-4">
          <View className="flex flex-row bg-[#0d9276] rounded-3xl p-2 justify-center items-center">
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
            <View className="flex flex-col space-y-2 bg-[#0d9276] rounded-3xl p-4 justify-center">
              <Text className="text-[#dbe7c9] font-bold text-4xl">
                {fetchedCard?.uid}
              </Text>
              <Text className="text-[#dbe7c9] text-2xl">
                Balance: ₱{fetchedCard?.balance}
              </Text>

              <View className="flex flex-row  justify-between">
                <TouchableOpacity
                  className="bg-[#dbe7c9] items-center justify-center rounded-xl h-10 w-24"
                  onPress={handleAddCard}>
                  <Text className=" text-xl text-black">Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-[#dbe7c9] items-center justify-center rounded-xl h-10 w-24"
                  onPress={() => {
                    setHasSearchTerm(false);
                    setCardSearch('');
                  }}>
                  <Text className=" text-xl text-black">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="flex flex-col h-[150px] bg-gray-200 rounded-3xl p-4 justify-center items-center">
              <Text className="text-gray-500">Search to see details</Text>
            </View>
          )}
          <View className=" border-t-2 border-t-[#0d9276]"></View>
          <View>
            <Text>Hello</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CardPage;
