import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from './constants/routes';
import { useAuthStore } from './store/auth-store';
import { CalendarScreen } from './screens/calendar-screen';
import { HomeScreen } from './screens/home-screen';
import { LoginScreen } from './screens/login-screen';
import { SummaryScreen } from './screens/summary-screen';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Calendar: undefined;
  Summary: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
            <Stack.Screen name={ROUTES.CALENDAR} component={CalendarScreen} />
            <Stack.Screen name={ROUTES.SUMMARY} component={SummaryScreen} />
          </>
        ) : (
          <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
