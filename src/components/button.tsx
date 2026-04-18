import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type ButtonVariant = "primary" | "header";

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: ButtonVariant;
  onPress: () => void;
}

export const Button = ({
  children,
  disabled = false,
  isLoading = false,
  variant = "primary",
  onPress,
}: ButtonProps) => {
  const isInactive = disabled || isLoading;
  const isHeaderVariant = variant === "header";
  const indicatorColor = isHeaderVariant ? "#0f6cbd" : "#ffffff";
  const labelStyle = isHeaderVariant ? styles.headerLabel : styles.label;

  const getButtonStyle = (pressed: boolean) => {
    const baseStyle = isHeaderVariant ? styles.headerButton : styles.button;

    const disabledStyle = isHeaderVariant
      ? styles.headerButtonDisabled
      : styles.buttonDisabled;
      
    const pressedStyle = isHeaderVariant
      ? styles.headerButtonPressed
      : styles.buttonPressed;

    return [
      baseStyle,
      isInactive ? disabledStyle : null,
      pressed && !isInactive ? pressedStyle : null,
    ];
  };

  return (
    <Pressable
      disabled={isInactive}
      onPress={onPress}
      style={({ pressed }) => getButtonStyle(pressed)}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text style={labelStyle}>{children}</Text>
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
  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerButtonDisabled: {
    opacity: 0.5,
  },
  headerButtonPressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  headerLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f6cbd",
    textAlign: "right",
    writingDirection: "rtl",
  },
});
