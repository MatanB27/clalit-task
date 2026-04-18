import type { AppointmentSlot } from '../types/appointment';

export interface SlotsByDate {
  date: string;
  slots: AppointmentSlot[];
}

export const groupSlotsByDate = (
  slots: AppointmentSlot[],
): SlotsByDate[] => {
  const groups = new Map<string, AppointmentSlot[]>();

  slots.forEach((slot) => {
    const currentSlots = groups.get(slot.date) ?? [];
    groups.set(slot.date, [...currentSlots, slot]);
  });

  return Array.from(groups.entries()).map(([date, groupedSlots]) => ({
    date,
    slots: groupedSlots,
  }));
};
