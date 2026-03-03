import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '../themed-text'; // ThemedText not actually used in this component

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void; // If the search bar acts as a button to navigate
}

export function SearchBar({ placeholder = 'Buscar', value, onChangeText, onPress }: SearchBarProps) {
  const backgroundColor = useThemeColor({}, 'lightNeutral'); // Using the new lightNeutral color
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'placeholder');
  const iconColor = useThemeColor({}, 'placeholder'); // Search icon color is the same as placeholder text color

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress && !onChangeText} // Disable if neither onPress nor onChangeText is provided
    >
      <IconSymbol name="search" size={24} color={iconColor} />
      <TextInput
        style={[styles.input, { color: textColor }]

        }
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChangeText}
        editable={!onPress} // Make it not editable if onPress is provided, implying it's a "button"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Spacing.small, // Figma border radius is 8
    paddingLeft: Spacing.medium, // Figma paddingLeft: 12
    paddingRight: Spacing.large, // Figma paddingRight: 16
    paddingVertical: Spacing.small, // Figma paddingVertical: 8
    marginHorizontal: Spacing.large,
    height: 40, // Figma height: 40
    gap: Spacing.medium, // Figma itemSpacing: 12
  },
  input: {
    flex: 1,
    fontSize: 16, // Figma fontSize: 16
    lineHeight: 24, // Figma lineHeight: 24
  },
});
