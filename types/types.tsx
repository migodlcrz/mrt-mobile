import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Settings: undefined;
  Card: undefined;
  Scan: undefined;
  Transaction: undefined;
  Main: undefined;
  App: undefined;
  MainTabs: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SettingsProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;
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
