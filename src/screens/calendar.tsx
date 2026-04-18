import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BorderButton } from '../components/buttons/border-button';
import { Button } from '../components/buttons/button';
import { ScreenContainer } from '../components/screen-container';
import { ROUTES } from '../constants/routes';
import { APPOINTMENT_SLOTS, SPECIALTIES } from '../data/appointments';
import type { RootNavigationProp } from '../navigator';
import { useAuthStore } from '../store/auth-store';
import { useAppointmentStore } from '../store/appointment-store';
import { groupSlotsByDate } from '../utils/appointments';

export const Calendar = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const user = useAuthStore((state) => state.user);

  const bookingMode = useAppointmentStore((state) => state.bookingMode);
  const selectedSpecialtyId = useAppointmentStore(
    (state) => state.selectedSpecialtyId,
  );
  const selectedSlot = useAppointmentStore((state) => state.selectedSlot);
  const selectSlot = useAppointmentStore((state) => state.selectSlot);
  const bookAppointment = useAppointmentStore((state) => state.bookAppointment);

  const selectedSpecialty = SPECIALTIES.find(
    (specialty) => specialty.id === selectedSpecialtyId,
  );
  const availableSlots = APPOINTMENT_SLOTS.filter(
    (slot) => slot.specialtyId === selectedSpecialtyId,
  );
  const groupedSlots = groupSlotsByDate(availableSlots);

  const handleBookAppointment = async () => {
    if (!selectedSpecialty || !selectedSlot || !user) {
      return;
    }

    await bookAppointment({
      specialtyId: selectedSpecialty.id,
      specialtyLabel: selectedSpecialty.label,
      date: selectedSlot.date,
      time: selectedSlot.time,
      patientName: user.username,
    });

    navigation.navigate(ROUTES.SUMMARY);
  };

  if (!selectedSpecialty) {
    return (
      <ScreenContainer
        title="יומן רופא"
        subtitle="לא נבחר מקצוע רפואי. יש לחזור למסך הראשי ולבחור מקצוע."
      >
        <View style={styles.emptyState}>
          <Button onPress={() => navigation.navigate(ROUTES.HOME)}>
            חזרה למסך הראשי
          </Button>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      title={selectedSpecialty.label}
      subtitle={
        bookingMode === 'update'
          ? 'יש לבחור מועד חדש לתור הקיים.'
          : 'יש לבחור תאריך ושעה פנויים מהרשימה.'
      }
    >
      <View style={styles.content}>
        <View style={styles.sectionList}>
          {groupedSlots.map((group) => (
            <View key={group.date} style={styles.section}>
              <Text style={styles.sectionTitle}>{group.date}</Text>
              <View style={styles.slotList}>
                {group.slots.map((slot) => {
                  const isSelected =
                    selectedSlot?.date === slot.date &&
                    selectedSlot.time === slot.time;

                  return (
                    <BorderButton
                      key={`${slot.date}-${slot.time}`}
                      onPress={() => selectSlot(slot)}
                      selected={isSelected}
                    >
                      {slot.time}
                    </BorderButton>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        <Button disabled={!selectedSlot} onPress={handleBookAppointment}>
          {bookingMode === 'update' ? 'עדכון תור' : 'זימון תור'}
        </Button>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sectionList: {
    gap: 16,
  },
  section: {
    gap: 12,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    padding: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1b1f29',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  slotList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
