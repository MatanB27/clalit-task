import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage-keys';
import type { User } from '../types/auth';

export async function saveAuthToken(token: string) {
  await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);
}

export async function getAuthToken() {
  return SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
}

export async function removeAuthToken() {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
}

export async function saveAuthUser(user: User) {
  await AsyncStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
}

export async function getAuthUser(): Promise<User | null> {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_USER);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

export async function removeAuthUser() {
  await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_USER);
}

export async function clearAuthStorage() {
  await Promise.all([removeAuthToken(), removeAuthUser()]);
}
