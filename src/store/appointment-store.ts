import { create } from "zustand";
import {
  getActiveAppointment,
  removeActiveAppointment,
  saveActiveAppointment,
} from "../storage/appointment-storage";
import type {
  Appointment,
  AppointmentSlot,
  BookingMode,
  SpecialtyId,
} from "../types/appointment";


interface AppointmentStore {
  isInitialized: boolean;
  selectedSpecialtyId: SpecialtyId | null;
  selectedSlot: AppointmentSlot | null;
  activeAppointment: Appointment | null;
  bookingMode: BookingMode;
  initializeAppointment: () => Promise<void>;
  selectSpecialty: (specialtyId: SpecialtyId) => void;
  selectSlot: (slot: AppointmentSlot) => void;
  bookAppointment: (appointment: Appointment) => Promise<void>;
  cancelAppointment: () => Promise<void>;
  startReschedule: () => void;
  clearBookingState: () => void;
  resetAppointmentState: () => void;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  isInitialized: false,
  selectedSpecialtyId: null,
  selectedSlot: null,
  activeAppointment: null,
  bookingMode: "create",
  initializeAppointment: async () => {
    const activeAppointment = await getActiveAppointment();

    set({
      isInitialized: true,
      activeAppointment,
    });
  },
  selectSpecialty: (specialtyId) => {
    set({
      selectedSpecialtyId: specialtyId,
      selectedSlot: null,
    });
  },
  selectSlot: (slot) => {
    set({
      selectedSlot: slot,
    });
  },
  bookAppointment: async (appointment) => {
    await saveActiveAppointment(appointment);

    set({
      activeAppointment: appointment,
      selectedSpecialtyId: null,
      selectedSlot: null,
      bookingMode: "create",
    });
  },
  cancelAppointment: async () => {
    await removeActiveAppointment();

    set({
      activeAppointment: null,
      selectedSpecialtyId: null,
      selectedSlot: null,
      bookingMode: "create",
    });
  },
  startReschedule: () => {
    set({
      bookingMode: "update",
      selectedSlot: null,
    });
  },
  clearBookingState: () => {
    set({
      selectedSpecialtyId: null,
      selectedSlot: null,
      bookingMode: "create",
    });
  },
  resetAppointmentState: () => {
    set({
      isInitialized: true,
      selectedSpecialtyId: null,
      selectedSlot: null,
      activeAppointment: null,
      bookingMode: "create",
    });
  },
}));
