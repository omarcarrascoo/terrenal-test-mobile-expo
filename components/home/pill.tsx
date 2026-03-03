import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, Colors } from '@/constants/theme';
import { IconSymbol, IconSymbolName } from '@/components/ui/icon-symbol'; // Using the exported type IconSymbolName
import { ThemedText } from '../themed-text';

interface PillProps {
  iconName: IconSymbolName;
  label: string;
  onPress: () => void;
  isActive?: boolean;
}

export function Pill({ iconName, label, onPress, isActive = false }: PillProps) {
  const borderColor = useThemeColor({}, 'border'); // Using the new border color
  const textColor = useThemeColor({}, 'text');
  const activeBackgroundColor = useThemeColor({}, 'primary');
  const activeTextColor = useThemeColor({}, 'background'); // White text on accent background

  const pillStyle = isActive
    ? { backgroundColor: activeBackgroundColor, borderColor: activeBackgroundColor }
    : { backgroundColor: 'transparent', borderColor };

  const iconAndLabelColor = isActive ? activeTextColor : textColor;

  return (
    <TouchableOpacity
      style={[styles.container, pillStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconSymbol name={iconName} size={18} color={iconAndLabelColor} /> {/* Figma icon size is 18 */}
      <ThemedText style={[styles.label, { color: iconAndLabelColor }]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6, // Changed from Spacing.small (8) to match Figma 6
    borderWidth: 1, // Figma strokeWeight is 1
    paddingHorizontal: Spacing.small + 2, // Figma paddingLeft/Right: 10 (Spacing.small is 8, so 10 is 8+2)
    paddingVertical: Spacing.xsmall + 1, // Figma paddingTop/Bottom: 5 (Spacing.xsmall is 4, so 5 is 4+1)
    gap: Spacing.xsmall, // Figma itemSpacing: 4
  },
  label: {
    fontSize: 14, // Figma fontSize: 14
    fontWeight: '500', // Figma fontWeight: 500 (Medium)
    lineHeight: 22, // Figma lineHeight: 22px
    opacity: 0.9, // Figma text opacity 0.899
  },
});
