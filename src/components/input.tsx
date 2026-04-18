import type { ComponentProps } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface InputProps extends ComponentProps<typeof TextInput> {
  errorMessage?: string;
  label: string;
}

export const Input = ({
  errorMessage,
  label,
  ...rest
}: InputProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#8a94a6"
        style={[styles.input, errorMessage ? styles.inputError : null]}
        {...rest}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1b1f29',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#d3dae6',
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#1b1f29',
    backgroundColor: '#ffffff',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  inputError: {
    borderColor: '#c63d2f',
  },
  error: {
    fontSize: 13,
    color: '#c63d2f',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
