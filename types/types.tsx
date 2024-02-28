import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Card: undefined;
  Scan: undefined;
  Transaction: undefined;
  Main: undefined;
  App: undefined;
  MainTabs: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type CardProps = NativeStackScreenProps<RootStackParamList, 'Card'>;
export type ScanProps = NativeStackScreenProps<RootStackParamList, 'Scan'>;
export type TransactionProps = NativeStackScreenProps<
  RootStackParamList,
  'Transaction'
>;
export type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;
export type AppProps = NativeStackScreenProps<RootStackParamList, 'App'>;
export type MainTabsProps = NativeStackScreenProps<
  RootStackParamList,
  'MainTabs'
>;
