import { create } from "zustand";

import { useAppointmentStore } from "./appointment-store";
import {
  clearAuthStorage,
  getAuthToken,
  getAuthUser,
  saveAuthToken,
  saveAuthUser,
} from "../storage/auth-storage";
import { removeActiveAppointment } from "../storage/appointment-storage";
import type { User } from "../types/auth";
import { createMockToken, isMockTokenExpired } from "../utils/auth";

interface AuthStore {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  initializeAuth: () => Promise<void>;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  token: null,
  initializeAuth: async () => {
    const token = await getAuthToken();
    const user = await getAuthUser();

    if (!token || !user || isMockTokenExpired(token)) {
      await clearAuthStorage();
      await removeActiveAppointment();

      set({
        isInitialized: true,
        isAuthenticated: false,
        user: null,
        token: null,
      });

      return;
    }

    set({
      isInitialized: true,
      isAuthenticated: true,
      user,
      token,
    });
  },
  login: async (user) => {
    const token = createMockToken(user.username);

    await saveAuthToken(token);
    await saveAuthUser(user);

    set({
      isAuthenticated: true,
      user,
      token,
    });
  },
  logout: async () => {
    await clearAuthStorage();
    await removeActiveAppointment();

    useAppointmentStore.getState().resetAppointmentState();

    set({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  },
}));
