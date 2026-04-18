import type { PropsWithChildren } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
}

export const Button = ({
  children,
  disabled = false,
  isLoading = false,
  onPress,
}: ButtonProps) => {
  const isInactive = disabled || isLoading;

  return (
    <Pressable
      disabled={isInactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isInactive ? styles.buttonDisabled : null,
        pressed && !isInactive ? styles.buttonPressed : null,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={styles.label}>{children}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f6cbd",
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    backgroundColor: "#9eb8d0",
  },
  buttonPressed: {
    opacity: 0.9,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
