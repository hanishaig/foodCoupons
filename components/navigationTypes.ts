import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  TransactionDetails: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
