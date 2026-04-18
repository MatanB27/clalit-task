import { Alert, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BorderButton } from '../components/buttons/border-button';
import { Button } from '../components/buttons/button';
import { ScreenContainer } from '../components/screen-container';
import { ROUTES } from '../constants/routes';
import { SPECIALTIES } from '../data/appointments';
import type { RootNavigationProp } from '../navigator';
import { useAppointmentStore } from '../store/appointment-store';

export const Home = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const activeAppointment = useAppointmentStore((state) => state.activeAppointment);
  const selectedSpecialtyId = useAppointmentStore(
    (state) => state.selectedSpecialtyId,
  );
  const selectSpecialty = useAppointmentStore((state) => state.selectSpecialty);
  const cancelAppointment = useAppointmentStore((state) => state.cancelAppointment);
  const startReschedule = useAppointmentStore((state) => state.startReschedule);

  const handleSearchCalendars = () => {
    navigation.navigate(ROUTES.CALENDAR);
  };

  const handleUpdateAppointment = () => {
    if (!activeAppointment) {
      return;
    }

    selectSpecialty(activeAppointment.specialtyId);
    startReschedule();
    navigation.navigate(ROUTES.CALENDAR);
  };

  const handleCancelAppointment = () => {
    Alert.alert('ביטול תור', 'האם לבטל את התור הקיים?', [
      {
        text: 'לא',
        style: 'cancel',
      },
      {
        text: 'כן',
        style: 'destructive',
        onPress: async () => {
          await cancelAppointment();
          Alert.alert('הצלחה', 'התור בוטל בהצלחה');
        },
      },
    ]);
  };

  if (activeAppointment) {
    return (
      <ScreenContainer
        title="התור הקיים שלי"
        subtitle="נמצא תור פעיל במערכת. ניתן לעדכן את מועד התור או לבטל אותו."
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>מקצוע רפואי</Text>
            <Text style={styles.cardValue}>{activeAppointment.specialtyLabel}</Text>

            <Text style={styles.cardLabel}>מועד התור</Text>
            <Text style={styles.cardValue}>
              {activeAppointment.date} | {activeAppointment.time}
            </Text>

            <Text style={styles.cardLabel}>שם המטופל</Text>
            <Text style={styles.cardValue}>{activeAppointment.patientName}</Text>
          </View>

          <View style={styles.actions}>
            <Button onPress={handleUpdateAppointment}>עדכון תור</Button>
            <Button onPress={handleCancelAppointment}>ביטול תור</Button>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      title="זימון תור רפואי"
      subtitle="אנא בחרו מקצוע רפואי."
    >
      <View style={styles.content}>
        <View style={styles.selectionList}>
          {SPECIALTIES.map((specialty) => {
            return (
              <BorderButton
                key={specialty.id}
                onPress={() => selectSpecialty(specialty.id)}
                selected={specialty.id === selectedSpecialtyId}
              >
                {specialty.label}
              </BorderButton>
            );
          })}
        </View>

        <Button disabled={!selectedSpecialtyId} onPress={handleSearchCalendars}>
          חיפוש יומנים
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
  card: {
    gap: 8,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  cardLabel: {
    fontSize: 14,
    color: '#5b6475',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  cardValue: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#1b1f29',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  actions: {
    gap: 12,
  },
  selectionList: {
    gap: 12,
  },
});
