import {
  NavigationContainer,
  type ParamListBase,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Button } from "./components/button";
import { ROUTES } from "./constants/routes";
import { Calendar } from "./screens/calendar";
import { Home } from "./screens/home";
import { Login } from "./screens/login";
import { Summary } from "./screens/summary";
import { useAuthStore } from "./store/auth-store";

export interface RootStackParamList extends ParamListBase {
  Login: undefined;
  Home: undefined;
  Calendar: undefined;
  Summary: undefined;
}

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const SCREEN_TITLES: Record<keyof RootStackParamList, string> = {
  Login: "התחברות",
  Home: "זימון תור",
  Calendar: "יומן רופא",
  Summary: "סיכום זימון",
};

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const sharedScreenOptions: NativeStackNavigationOptions = {
    headerTitleAlign: "center",
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: "#ffffff",
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: "700",
    },
  };

  const getTitle = (routeName: keyof RootStackParamList) => {
    return SCREEN_TITLES[routeName];
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={sharedScreenOptions}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name={ROUTES.HOME}
              component={Home}
              options={{
                title: getTitle(ROUTES.HOME),
                headerLeft: () => (
                  <Button onPress={logout} variant="header">
                    התנתקות
                  </Button>
                ),
              }}
            />
            <Stack.Screen
              name={ROUTES.CALENDAR}
              component={Calendar}
              options={{
                title: getTitle(ROUTES.CALENDAR),
              }}
            />
            <Stack.Screen
              name={ROUTES.SUMMARY}
              component={Summary}
              options={{
                title: getTitle(ROUTES.SUMMARY),
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name={ROUTES.LOGIN}
            component={Login}
            options={{
              title: getTitle(ROUTES.LOGIN),
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
