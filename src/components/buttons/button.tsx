import { StyleSheet } from "react-native";

import { BaseButton } from "./base-button";
import type { SharedButtonProps } from "./types";

export const Button = (props: SharedButtonProps) => {
  return (
    <BaseButton
      {...props}
      activeLabelStyle={styles.label}
      activeStyle={{
        base: styles.button,
        disabled: styles.buttonDisabled,
        pressed: styles.buttonPressed,
      }}
      indicatorColor="#ffffff"
    />
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
