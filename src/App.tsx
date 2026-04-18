import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from './store/auth-store';
import { useAppointmentStore } from './store/appointment-store';

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
    <View style={styles.container}>
      <Text style={styles.title}>
        {isAppInitialized
          ? isAuthenticated
            ? 'Session restored'
            : 'Ready for login'
          : 'Loading app...'}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});
