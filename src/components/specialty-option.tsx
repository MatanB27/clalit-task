import { Pressable, StyleSheet, Text } from 'react-native';

import type { Specialty } from '../types/appointment';

interface SpecialtyOptionProps {
  isSelected: boolean;
  specialty: Specialty;
  onPress: () => void;
}

export const SpecialtyOption = ({
  isSelected,
  onPress,
  specialty,
}: SpecialtyOptionProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        isSelected ? styles.optionSelected : null,
      ]}
    >
      <Text
        style={[
          styles.label,
          isSelected ? styles.labelSelected : null,
        ]}
      >
        {specialty.label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  option: {
    borderWidth: 1,
    borderColor: '#d3dae6',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  optionSelected: {
    borderColor: '#0f6cbd',
    backgroundColor: '#eaf4ff',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1b1f29',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  labelSelected: {
    color: '#0f6cbd',
  },
});
