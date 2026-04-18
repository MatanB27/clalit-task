import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/buttons/button";
import { ScreenContainer } from "../components/screen-container";
import { SummaryDetail } from "../components/summary-detail";
import { ROUTES } from "../constants/routes";
import type { RootNavigationProp } from "../navigator";
import { useAppointmentStore } from "../store/appointment-store";

export const Summary = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const activeAppointment = useAppointmentStore(
    (state) => state.activeAppointment,
  );
  const clearBookingState = useAppointmentStore(
    (state) => state.clearBookingState,
  );

  const handleBackHome = () => {
    clearBookingState();
    navigation.navigate(ROUTES.HOME);
  };

  if (!activeAppointment) {
    return (
      <ScreenContainer
        title="סיכום זימון"
        subtitle="לא קיים תור פעיל להצגה. ניתן לחזור למסך הראשי ולהתחיל זימון חדש."
      >
        <View style={styles.emptyState}>
          <Button onPress={handleBackHome}>חזרה למסך הראשי</Button>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      title="סיכום זימון"
      subtitle="התור נקבע בהצלחה. ניתן לחזור למסך הראשי לניהול התור."
    >
      <View style={styles.content}>
        <View style={styles.confirmationCard}>
          <Text style={styles.confirmationTitle}>האישור הושלם</Text>
          <Text style={styles.confirmationText}>פרטי התור שנשמרו במערכת:</Text>
        </View>
        <View style={styles.detailsCard}>
          <SummaryDetail
            label="מקצוע רפואי"
            value={activeAppointment.specialtyLabel}
          />
          <SummaryDetail label="תאריך" value={activeAppointment.date} />
          <SummaryDetail label="שעה" value={activeAppointment.time} />
          <SummaryDetail
            label="שם המטופל"
            value={activeAppointment.patientName}
          />
        </View>
        <Button onPress={handleBackHome}>חזרה למסך הראשי</Button>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  emptyState: {
    flex: 1,
    justifyContent: "flex-end",
  },
  confirmationCard: {
    gap: 8,
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: "#eaf4ff",
    padding: 20,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f6cbd",
    textAlign: "right",
    writingDirection: "rtl",
  },
  confirmationText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#1b1f29",
    textAlign: "right",
    writingDirection: "rtl",
  },
  detailsCard: {
    gap: 16,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    padding: 20,
  },
});
