import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface SectionHeaderProps {
  title: string;
  onPressViewAll?: () => void;
}

export function SectionHeader({ title, onPressViewAll }: SectionHeaderProps) {
  const textColor = useThemeColor({}, 'text'); // Title color is black in Figma
  const iconBackgroundColor = useThemeColor({}, 'lightNeutral'); // Chevron background is #F5F5F5 in Figma
  const iconColor = useThemeColor({}, 'text'); // Chevron icon color is black in Figma

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.title, { color: textColor }]}>
        {title}
      </ThemedText>
      {onPressViewAll && (
        <TouchableOpacity style={styles.chevronButton} onPress={onPressViewAll} activeOpacity={0.7}>
          <View style={[styles.chevronBackground, { backgroundColor: iconBackgroundColor }]}>
            <IconSymbol name="chevron.right" size={14} color={iconColor} /> {/* Figma chevron size is smaller inside the 20x20 container */}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.large, // Figma padding 16px
    paddingVertical: Spacing.small, // Figma padding 8px
    marginTop: Spacing.large, // Add some top margin for separation
  },
  title: {
    fontSize: 16, // Figma fontSize: 16
    fontWeight: '600', // Figma fontWeight: 600 (Semi Bold)
    letterSpacing: -0.32, // Figma letterSpacing: -0.32
    lineHeight: 22, // Figma lineHeight: 22.399999618530273
  },
  chevronButton: {
    // Just the touchable area
    padding: Spacing.xsmall, // To make the touchable area a bit larger than the icon
  },
  chevronBackground: {
    width: 20, // Figma width: 20
    height: 20, // Figma height: 20
    borderRadius: 10, // Circular background
    alignItems: 'center',
    justifyContent: 'center',
  },
});
