import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RootNavigator } from "./navigator";
import { useAuthStore } from "./store/auth-store";
import { useAppointmentStore } from "./store/appointment-store";

export default function App() {
  const isAuthInitialized = useAuthStore((state) => state.isInitialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  const isAppointmentInitialized = useAppointmentStore(
    (state) => state.isInitialized,
  );
  const initializeAppointment = useAppointmentStore(
    (state) => state.initializeAppointment,
  );

  useEffect(() => {
    const initializeApp = async () => {
      await initializeAuth();
      await initializeAppointment();
    };

    initializeApp();
  }, [initializeAppointment, initializeAuth]);

  const isAppInitialized = isAuthInitialized && isAppointmentInitialized;

  return (
    <>
      {isAppInitialized ? (
        <RootNavigator />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Loading app...</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});
