import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { RootNavigator } from "./navigator";
import { useAuthStore } from "./store/auth-store";
import { useAppointmentStore } from "./store/appointment-store";

export default function App() {
  const isAuthInitialized = useAuthStore((state) => state.isInitialized);
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
          <ActivityIndicator color="#0f6cbd" size="large" />
          <Text style={styles.title}>טוען...</Text>
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
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1b1f29",
    textAlign: "right",
    writingDirection: "rtl",
  },
});
