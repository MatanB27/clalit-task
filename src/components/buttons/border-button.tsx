import { StyleSheet } from "react-native";

import { BaseButton } from "./base-button";
import type { SharedButtonProps } from "./types";

interface BorderButtonProps extends SharedButtonProps {
  selected?: boolean;
}

export const BorderButton = ({
  selected = false,
  ...props
}: BorderButtonProps) => {
  return (
    <BaseButton
      {...props}
      activeLabelStyle={[
        styles.borderLabel,
        selected ? styles.borderLabelSelected : null,
      ]}
      activeStyle={{
        base: [styles.borderButton, selected ? styles.borderButtonSelected : null],
        disabled: styles.subtleButtonDisabled,
        pressed: styles.subtleButtonPressed,
      }}
      indicatorColor="#0f6cbd"
    />
  );
};

const styles = StyleSheet.create({
  borderButton: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#d3dae6",
    borderRadius: 16,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  borderButtonSelected: {
    borderColor: "#0f6cbd",
    backgroundColor: "#eaf4ff",
  },
  subtleButtonDisabled: {
    opacity: 0.5,
  },
  subtleButtonPressed: {
    opacity: 0.7,
  },
  borderLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1b1f29",
    textAlign: "right",
    writingDirection: "rtl",
  },
  borderLabelSelected: {
    color: "#0f6cbd",
  },
});
