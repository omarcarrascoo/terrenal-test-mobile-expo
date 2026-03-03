import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CheckoutInfoRowProps {
  category: string;
  infoText: string;
  subInfoText?: string; // For delivery option
  onPress: () => void;
}

export function CheckoutInfoRow({ category, infoText, subInfoText, onPress }: CheckoutInfoRowProps) {
  const borderColor = useThemeColor({}, 'border');
  const categoryTextColor = useThemeColor({}, 'text');
  const infoTextColor = useThemeColor({ light: 'rgba(0,0,0,0.5)', dark: 'rgba(255,255,255,0.5)' }, 'text');
  const subInfoTextColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({ light: 'rgba(0,0,0,0.5)', dark: 'rgba(255,255,255,0.5)' }, 'text');

  return (
    <TouchableOpacity style={[styles.container, { borderBottomColor: borderColor }]} onPress={onPress} activeOpacity={0.7}>
      <ThemedText style={[styles.category, { color: categoryTextColor }]}>
        {category}
      </ThemedText>
      <View style={styles.infoWrapper}>
        <View style={styles.textColumn}>
          <ThemedText style={[styles.infoText, { color: infoTextColor }]}>
            {infoText}
          </ThemedText>
          {subInfoText && (
            <ThemedText style={[styles.subInfoText, { color: subInfoTextColor }]}>
              {subInfoText}
            </ThemedText>
          )}
        </View>
        <IconSymbol name="chevron.right" size={20} color={iconColor} /> {/* Figma icon container is 20x20, opacity 0.5 for icon */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.large, // 16px from Figma
    paddingVertical: Spacing.large, // 16px from Figma
    borderBottomWidth: 0.5, // Figma stroke 0.5
  },
  category: {
    fontSize: 12, // Figma fontSize: 12
    fontWeight: '500', // Figma fontWeight: 500 (Medium)
    lineHeight: 20, // Figma lineHeight: 20
    textTransform: 'uppercase',
    minWidth: 100, // Ensure enough space for category title
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.medium, // Figma itemSpacing: 12
    flex: 1, // Allows info section to take remaining space
    justifyContent: 'flex-end', // Aligns info to the right
  },
  textColumn: {
    alignItems: 'flex-end',
    flex: 1, // Allows text to wrap if needed
  },
  infoText: {
    fontSize: 14, // Figma fontSize: 14
    fontWeight: '400', // Figma fontWeight: 400 (Regular)
    lineHeight: 19.6, // Figma lineHeight: 19.6
    textAlign: 'right',
  },
  subInfoText: {
    fontSize: 14, // Figma fontSize: 14
    fontWeight: '400', // Figma fontWeight: 400 (Regular)
    lineHeight: 19.6, // Figma lineHeight: 19.6
    textAlign: 'right',
    marginTop: 2, // Small gap if subInfoText exists
  },
});
