import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  const navigateHome = () => {
    navigation.navigate('Home');
  };

  const navigateCard = () => {
    navigation.navigate('Card');
  };

  const navigateScan = () => {
    navigation.navigate('Scan');
  };

  const navigateTransaction = () => {
    navigation.navigate('Transaction');
  };

  return (
    <View className="flex flex-row justify-between items-center bg-[#0d9276] py-4 px-10">
      <Text className="text-white" onPress={navigateHome}>
        Home
      </Text>
      <Text className="text-white" onPress={navigateCard}>
        My Card
      </Text>
      <Text className="text-white" onPress={navigateScan}>
        Scan
      </Text>
      <Text className="text-white" onPress={navigateTransaction}>
        Transaction
      </Text>
    </View>
  );
};

export default Footer;

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomePage from './HomePage';
// import CardPage from './CardPage';

// const Tab = createBottomTabNavigator();

// const Footer = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomePage} />
//       <Tab.Screen name="Settings" component={CardPage} />
//     </Tab.Navigator>
//   );
// };

// export default Footer;
