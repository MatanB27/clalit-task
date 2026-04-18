import { StyleSheet } from "react-native";

import { BaseButton } from "./base-button";
import type { SharedButtonProps } from "./types";

export const TransparentButton = (props: SharedButtonProps) => {
  return (
    <BaseButton
      {...props}
      activeLabelStyle={styles.transparentLabel}
      activeStyle={{
        base: styles.transparentButton,
        disabled: styles.subtleButtonDisabled,
        pressed: styles.subtleButtonPressed,
      }}
      indicatorColor="#0f6cbd"
    />
  );
};

const styles = StyleSheet.create({
  transparentButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  subtleButtonDisabled: {
    opacity: 0.5,
  },
  subtleButtonPressed: {
    opacity: 0.7,
  },
  transparentLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f6cbd",
    textAlign: "right",
    writingDirection: "rtl",
  },
});
