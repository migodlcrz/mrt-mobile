import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, StyleSheet, Text, View} from 'react-native';
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

const ScanPage: React.FC<ScanProps> = ({navigation}) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [active, setActive] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();

  const isFocused = useIsFocused();
  const appState = useAppState();

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
      console.log(`Scanned: `, codes[0].value);
      storage.set('qr-scanned', String(codes[0].value));
      setActive(false);

      DeviceEventEmitter.emit('card');
      return navigation.navigate('Card');
    },
  });

  const BoxOverlay = () => (
    <View className="flex w-full h-full items-center justify-center">
      <View className="border-4 border-[#0d9276] w-48 h-48 rounded-md" />
    </View>
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
