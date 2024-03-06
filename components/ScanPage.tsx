import React, {useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import {useAppState} from '@react-native-community/hooks';
import {ScanProps} from '../types/types';
import {storage} from '../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

interface Card {
  _id: string;
  uid: number;
  balance: number;
  isTap: boolean;
  in: string;
  history: [{in: string; out: string; date: Date}];
}

interface Station {
  _id: string;
  name: string;
  lat: number;
  long: number;
  connection: string[];
}

interface Path {
  path: string[];
  distance: number;
}

interface QR {
  name: string;
  method: string;
}

const ScanPage: React.FC<ScanProps> = ({navigation}) => {
  const [inModal, setInModal] = useState(false);
  const [outModal, setOutModal] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [active, setActive] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [cardList, setCardList] = useState<Card[] | null>(null);

  const [station, setStation] = useState<Station[] | null>(null);

  const [cardIn, setCardIn] = useState<Card | null>(null);
  const [cardOut, setCardOut] = useState<Card | null>(null);

  const [cardBalance, setCardBalance] = useState<Number | null>(null);

  const [stationIn, setStationIn] = useState<string | null>(null);
  const [stationOut, setStationOut] = useState<string | null>(null);

  const [stationStart, setStationStart] = useState<Station | null>(null);
  const [stationEnd, setStationEnd] = useState<Station | null>(null);

  const [distance, setDistance] = useState<number | null>(null);
  const [totalFare, setTotalFare] = useState<number | null>(null);
  const [startStation, setStartStation] = useState<string | null>(null);

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const isFocused = useIsFocused();
  const appState = useAppState();

  const fetchStation = async () => {
    const response = await fetch(
      `https://mrt-server-shg0.onrender.com/api/stations`,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );

    const data = await response.json();
    if (response.ok) {
      setStation(data);
    } else {
      throw new Error('Failed to fetch data');
    }
  };

  const setTapInfo = async () => {
    console.log('PUMASOK SA TAP INFO');
    console.log('STATION NAME: ', stationIn);
    const localCards: Card[] = JSON.parse(storage.getString('cardlist') || '');
    const card: string[] = [];

    for (let i = 0; i < localCards.length; i++) {
      const uid = localCards[i].uid;
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
      setCardList(localCards);
      console.log('RESPONSE OK');
    }

    if (!response.ok) {
      console.log('RESPONSE NOT OK');
    }
  };

  const checkConnectionIn = () => {
    console.log('nagcheck ng connection');
    if (station) {
      if (station.length > 0) {
        const matchedStation = station.find(
          station => station.name === stationIn,
        );

        console.log('MATCHED STATION: ', matchedStation?.name);
        if (matchedStation) {
          setStationStart(matchedStation);
        }
      }
    }
  };

  const checkConnectionOut = () => {
    if (station) {
      if (station.length > 0) {
        const matchedStation = station.find(
          station => station.name === stationOut,
        );

        console.log('MATCHED STATION: ', matchedStation?.name);
        if (matchedStation) {
          setStationEnd(matchedStation);
        }
      }
    }
  };

  const getStationEnd = () => {
    console.log('get station end');
    if (station) {
      if (station.length > 0) {
        const matchedStation = station.find(
          station => station.name === stationIn,
        );

        if (matchedStation) {
          setStationEnd(matchedStation);
        }
      }
    }
  };

  const handleTapIn = async () => {
    console.log('STATION NAME', stationIn);
    console.log('CARD IN', cardIn?.uid);

    try {
      const response = await fetch(
        `https://mrt-server-shg0.onrender.com/api/cards/in`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            enteredUID: cardIn?.uid,
            stationStart: stationIn,
          }),
        },
      );
      const message = await response.json();
      if (response.ok) {
        console.log('Tapped in');
        Toast.show({
          type: 'success',
          text1: `${cardIn?.uid} tapped in!`,
          text1Style: {color: 'green', fontSize: 18},
        });

        setCardIn(null);
      }

      if (!response.ok) {
        console.log(message.error);
        Toast.show({
          type: 'error',
          text1: `${message.error}`,
          text1Style: {color: 'red', fontSize: 18},
        });
      }
    } catch (error) {
      console.log('ERROR: ', error);
      Toast.show({
        type: 'error',
        text1: `ERROR: ${error}`,
        text1Style: {color: 'red', fontSize: 18},
      });
    }
  };

  const handleTapOut = async () => {
    console.log('STATION END', stationEnd?.name);
    console.log('CARD OUT: ', cardOut?.uid);

    try {
      const response = await fetch(
        `https://mrt-server-shg0.onrender.com/api/cards/out`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            enteredUID: cardOut?.uid,
            stationEnd: stationEnd?.name,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setDistance(data.distance);
        setTotalFare(data.totalFare);
        setStartStation(data.start);
        setCardOut(null);
        console.log('Tapped out');
        Toast.show({
          type: 'success',
          text1: `${cardOut?.uid} tapped out!`,
          text1Style: {color: 'green', fontSize: 18},
        });
        setShowDetails(true);
        setCardOut(null);
      }

      if (!response.ok) {
        console.log(data.error);
        Toast.show({
          type: 'error',
          text1: `${data.error}`,
          text1Style: {color: 'red', fontSize: 18},
        });
      }
    } catch (error) {
      console.log('Internal error');
      Toast.show({
        type: 'error',
        text1: `ERROR: ${error}`,
        text1Style: {color: 'red', fontSize: 18},
      });
    }
  };

  useEffect(() => {
    console.log('PRESSED SCAN');
    fetchStation();
  }, []);

  useEffect(() => {
    const tabPressListener = DeviceEventEmitter.addListener('scan', () => {
      console.log('PRESSED SCAN');

      const checkCameraPermission = async () => {
        const status = await requestPermission();
        setCameraPermission(status === true);
      };

      if (!hasPermission) {
        checkCameraPermission();
      } else {
        setActive(isFocused && appState === 'active');
      }
      return () => {
        tabPressListener.remove();
      };
    });
    const checkCameraPermission = async () => {
      const status = await requestPermission();
      setCameraPermission(status === true);
    };

    if (!hasPermission) {
      checkCameraPermission();
    } else {
      setActive(isFocused && appState === 'active');
    }
  }, [hasPermission, requestPermission]);

  const device = useCameraDevice('back');

  const NoCameraDevice = () => {
    console.log('No Camera Device');
    return (
      <View>
        <Text className="text-red-500">No Camera Device</Text>
      </View>
    );
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      let corners = codes[0].corners;
      let readFlag = false;

      if (
        corners![0].x >= 504 &&
        corners![0].y >= 224 &&
        corners![1].x <= 770 &&
        corners![1].y >= 228 &&
        corners![2].x <= 775 &&
        corners![2].y <= 493 &&
        corners![3].x >= 506 &&
        corners![3].y <= 502
      ) {
        try {
          const qr = JSON.parse(codes[0].value || '{}');
          console.log('QR NAME', qr.name);
          console.log('QR METHOD', qr.method);

          try {
            if (qr.method === 'add') {
              storage.set('qr-scanned', String(qr.name));
            }

            if (qr.method === 'in') {
              setStationIn(qr.name);
              // checkConnectionIn();
              setTapInfo();
              setInModal(true);
              return;
            }

            if (qr.method === 'out') {
              setStationOut(qr.name);
              checkConnectionOut();
              // getStationEnd();
              setTapInfo();
              setOutModal(true);
              return;
            }
          } catch (error) {
            console.log('ERROR ', error);
          }
          DeviceEventEmitter.emit('qr-card');
          return navigation.navigate('Card');
          // setActive(false);
        } catch (error) {
          console.log('ERROR: ', error);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 2000);
        }
      }
    },
  });

  const BoxOverlay = () => (
    <>
      <View className="flex w-full h-full items-center justify-center">
        <View
          className={`border-8 border-dashed rounded-3xl ${
            showError ? 'border-[#ff0000]' : 'border-[#0d9276]'
          } w-48 h-48`}
        />
        <View className="flex w-full h-full items-center justify-center absolute">
          {showError && (
            <Text className="text-xl text-red-600 font-bold">
              INVALID QR CODE
            </Text>
          )}
        </View>
      </View>
    </>
  );

  return (
    <>
      {device && (
        <>
          {active ? (
            <>
              <View className="absolute w-full h-full z-50">
                {/* <Text className="text-3xl self-center mt-10 text-white">
                  QR SCANNER
                </Text> */}
                <BoxOverlay />
              </View>
              <Camera
                device={device}
                isActive={active}
                codeScanner={codeScanner}
                className="w-full h-full z-0"
              />
              <View>
                {/* modal for in */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={inModal}>
                  <View className="h-full w-full flex justify-center items-center px-8 py-20">
                    <View className="flex flex-col w-full h-full rounded-xl p-5 items-center bg-[#dbe7c9] space-y-4">
                      <View className="flex flex-row w-full justify-between">
                        <Text className="text-[#0d9276] font-bold text-3xl">
                          {stationIn && stationIn} - In
                        </Text>
                        <Icon
                          name="close"
                          size={30}
                          color="#0d9276"
                          onPress={() => {
                            setInModal(false);
                            setCardIn(null);
                          }}
                        />
                      </View>
                      <ScrollView className="overflow-y-auto">
                        {cardList &&
                          cardList.map((card: Card, index: number) => {
                            return (
                              <View key={index} className="w-full">
                                <TouchableOpacity
                                  className="flex flex-col space-y-2 bg-[#0d9276] rounded-2xl p-4 justify-center shadow-lg shadow-black my-2 w-full"
                                  onPress={() => setCardIn(card)}>
                                  <Text className="text-white font-bold text-4xl">
                                    {card.uid}
                                  </Text>
                                  <Text className="text-white text-2xl">
                                    Balance: ₱{card.balance}
                                  </Text>
                                  <View className="flex flex-row items-center space-x-2">
                                    <Icon
                                      name="circle"
                                      size={10}
                                      color={card.isTap ? 'green' : 'red'}
                                    />

                                    <Text className="text-white text-xl">
                                      {card.isTap ? 'Onboard' : 'Offboard'}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                      </ScrollView>
                      <TextInput
                        className="bg-white rounded-xl w-full text-black text-xl text-center font-bold"
                        value={cardIn ? String(cardIn?.uid) : ''}
                        readOnly
                      />
                      <TouchableOpacity
                        className="flex w-full items-center"
                        onPress={() => {
                          setInModal(false);
                          handleTapIn();
                        }}>
                        <Text className="text-[#dbe7c9] bg-[#0d9276] rounded-2xl py-2 px-4 text-2xl font-bold shadow-lg shadow-black">
                          Tap In
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                {/* modal for out */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={outModal}>
                  <View className="h-full w-full flex justify-center items-center px-8 py-20">
                    {showDetails ? (
                      <View className="flex flex-col w-full h-auto rounded-xl p-5 items-center bg-[#dbe7c9] space-y-4">
                        <Text className="text-[#0d9276] font-bold text-3xl">
                          Travel Details:
                        </Text>
                        <View className="flex flex-row justify-between items-center w-full">
                          <Text className="text-[#0d9276] font-bold text-2xl">
                            Total Fare:
                          </Text>
                          <Text className="text-black font-bold text-2xl">
                            - ₱{totalFare}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between items-center w-full">
                          <Text className="text-[#0d9276] font-bold text-2xl">
                            Beginning Balance:
                          </Text>
                          <Text className="text-black font-bold text-2xl">
                            ₱{totalFare}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between items-center w-full">
                          <Text className="text-[#0d9276] font-bold text-2xl">
                            Final Balance:
                          </Text>
                          <Text className="text-black font-bold text-2xl">
                            ₱{totalFare}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between items-center w-full">
                          <Text className="text-[#0d9276] font-bold text-2xl">
                            Distance:
                          </Text>
                          <Text className="text-black font-bold text-2xl">
                            {distance} KM
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between items-center w-full">
                          <Text className="text-[#0d9276] font-bold text-2xl">
                            From:
                          </Text>
                          <Text className="text-black font-bold text-2xl">
                            {startStation}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between items-center w-full">
                          <Text className="text-[#0d9276] font-bold text-2xl">
                            To:
                          </Text>
                          <Text className="text-black font-bold text-2xl">
                            {stationOut}
                          </Text>
                        </View>

                        <TouchableOpacity
                          className="bg-[#0d9276] px-3 py-2 rounded-2xl"
                          onPress={() => {
                            setOutModal(false);
                            setShowDetails(false);
                          }}>
                          <Text className="text-3xl font-bold text-[#dbe7c9]">
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View className="flex flex-col w-full h-full rounded-xl p-5 items-center bg-[#dbe7c9] space-y-4">
                        <View className="flex flex-row w-full justify-between">
                          <Text className="text-[#0d9276] font-bold text-3xl">
                            {stationOut && stationOut} - Out
                          </Text>
                          <Icon
                            name="close"
                            size={30}
                            color="#0d9276"
                            onPress={() => {
                              setOutModal(false);
                              setCardOut(null);
                            }}
                          />
                        </View>
                        <ScrollView className="overflow-y-auto">
                          {cardList &&
                            cardList.map((card: Card, index: number) => {
                              // console.log(cardList);
                              return (
                                <View key={index} className="w-full">
                                  <TouchableOpacity
                                    className="flex flex-col space-y-2 bg-[#0d9276] rounded-2xl p-4 justify-center shadow-lg shadow-black my-2 w-full"
                                    onPress={() => setCardOut(card)}>
                                    <Text className="text-white font-bold text-4xl">
                                      {card.uid}
                                    </Text>
                                    <Text className="text-white text-2xl">
                                      Balance: ₱{card.balance}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              );
                            })}
                        </ScrollView>
                        <TextInput
                          className="bg-white rounded-xl w-full text-black text2xl text-center font-bold "
                          value={cardOut ? String(cardOut?.uid) : ''}
                          readOnly
                        />
                        <TouchableOpacity
                          className="flex w-full items-center"
                          onPress={() => {
                            getStationEnd();
                            // setOutModal(false);
                            handleTapOut();
                            setCardIn(null);
                          }}>
                          <Text className="text-[#dbe7c9] bg-[#0d9276] rounded-2xl py-2 px-4 text-2xl font-bold shadow-lg shadow-black">
                            Tap Out
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </Modal>
              </View>
            </>
          ) : (
            <View className="flex items-center justify-center">
              <Text className="text-3xl">Camera Inactive</Text>
            </View>
          )}
        </>
      )}
      {!device && NoCameraDevice}
    </>
  );
};

export default ScanPage;
