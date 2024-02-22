import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Card: undefined;
  Scan: undefined;
  Transaction: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type CardProps = NativeStackScreenProps<RootStackParamList, 'Card'>;
export type ScanProps = NativeStackScreenProps<RootStackParamList, 'Scan'>;
export type TransactionProps = NativeStackScreenProps<
  RootStackParamList,
  'Transaction'
>;

// export type PinProps = NativeStackScreenProps<RootStackParamList, 'Pin'> & {
//   onPinSuccess: () => void;
// };

// export type TestProps = NativeStackScreenProps<RootStackParamList, 'Test'>;
