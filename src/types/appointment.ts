export type SpecialtyId = "family-medicine" | "dermatology" | "gynecology";
export type BookingMode = "create" | "update";

export interface Specialty {
  id: SpecialtyId;
  label: string;
}

export interface AppointmentSlot {
  specialtyId: SpecialtyId;
  date: string;
  time: string;
}

export interface Appointment {
  specialtyId: SpecialtyId;
  specialtyLabel: string;
  date: string;
  time: string;
  patientName: string;
}
