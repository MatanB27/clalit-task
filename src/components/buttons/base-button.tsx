import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { ActivityIndicator, Pressable, Text } from "react-native";
import type { SharedButtonProps } from "./types";

interface BaseButtonProps extends SharedButtonProps {
  activeStyle: {
    base: StyleProp<ViewStyle>;
    disabled: StyleProp<ViewStyle>;
    pressed: StyleProp<ViewStyle>;
  };
  activeLabelStyle: StyleProp<TextStyle>;
  indicatorColor: string;
}

export const BaseButton = ({
  children,
  disabled = false,
  isLoading = false,
  onPress,
  style,
  textStyle,
  activeStyle,
  activeLabelStyle,
  indicatorColor,
}: BaseButtonProps) => {
  const isInactive = disabled || isLoading;

  return (
    <Pressable
      disabled={isInactive}
      onPress={onPress}
      style={({ pressed }) => [
        activeStyle.base,
        isInactive ? activeStyle.disabled : null,
        pressed && !isInactive ? activeStyle.pressed : null,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text style={[activeLabelStyle, textStyle]}>{children}</Text>
      )}
    </Pressable>
  );
};
