import type { AppointmentSlot, Specialty } from "../types/appointment";

export const SPECIALTIES: Specialty[] = [
  {
    id: "family-medicine",
    label: "רפואה משפחה",
  },
  {
    id: "dermatology",
    label: "רופא עור",
  },
  {
    id: "gynecology",
    label: "רופאת נשים",
  },
];

export const APPOINTMENT_SLOTS: AppointmentSlot[] = [
  { specialtyId: "family-medicine", date: "15/07/2025", time: "09:00" },
  { specialtyId: "family-medicine", date: "15/07/2025", time: "10:30" },
  { specialtyId: "family-medicine", date: "15/07/2025", time: "14:00" },
  { specialtyId: "family-medicine", date: "16/07/2025", time: "08:30" },
  { specialtyId: "family-medicine", date: "16/07/2025", time: "11:00" },
  { specialtyId: "family-medicine", date: "16/07/2025", time: "15:30" },

  { specialtyId: "dermatology", date: "17/07/2025", time: "10:00" },
  { specialtyId: "dermatology", date: "17/07/2025", time: "13:30" },
  { specialtyId: "dermatology", date: "17/07/2025", time: "16:00" },
  { specialtyId: "dermatology", date: "18/07/2025", time: "09:30" },
  { specialtyId: "dermatology", date: "18/07/2025", time: "12:00" },
  { specialtyId: "dermatology", date: "18/07/2025", time: "17:00" },

  { specialtyId: "gynecology", date: "19/07/2025", time: "08:00" },
  { specialtyId: "gynecology", date: "19/07/2025", time: "11:30" },
  { specialtyId: "gynecology", date: "19/07/2025", time: "14:30" },
  { specialtyId: "gynecology", date: "20/07/2025", time: "09:00" },
  { specialtyId: "gynecology", date: "20/07/2025", time: "13:00" },
  { specialtyId: "gynecology", date: "20/07/2025", time: "16:30" },
];
