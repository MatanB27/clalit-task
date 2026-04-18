import { StyleSheet, Text, View } from "react-native";

interface SummaryDetailProps {
  label: string;
  value: string;
}

export const SummaryDetail = ({ label, value }: SummaryDetailProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: "#5b6475",
    textAlign: "right",
    writingDirection: "rtl",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1b1f29",
    textAlign: "right",
    writingDirection: "rtl",
  },
});
