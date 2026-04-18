import {
  NavigationContainer,
  type ParamListBase,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { ROUTES } from './constants/routes';
import { Calendar } from './screens/calendar';
import { Home } from './screens/home';
import { Login } from './screens/login';
import { Summary } from './screens/summary';
import { useAuthStore } from './store/auth-store';

export interface RootStackParamList extends ParamListBase {
  Login: undefined;
  Home: undefined;
  Calendar: undefined;
  Summary: undefined;
}

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name={ROUTES.HOME} component={Home} />
            <Stack.Screen name={ROUTES.CALENDAR} component={Calendar} />
            <Stack.Screen name={ROUTES.SUMMARY} component={Summary} />
          </>
        ) : (
          <Stack.Screen name={ROUTES.LOGIN} component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
