import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage-keys';
import type { Appointment } from '../types/appointment';

export async function saveActiveAppointment(appointment: Appointment) {
  await AsyncStorage.setItem(
    STORAGE_KEYS.ACTIVE_APPOINTMENT,
    JSON.stringify(appointment),
  );
}

export async function getActiveAppointment(): Promise<Appointment | null> {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_APPOINTMENT);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

export async function removeActiveAppointment() {
  await AsyncStorage.removeItem(STORAGE_KEYS.ACTIVE_APPOINTMENT);
}
