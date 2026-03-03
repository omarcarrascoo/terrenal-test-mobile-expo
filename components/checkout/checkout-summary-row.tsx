import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CheckoutSummaryRowProps {
  label: string;
  value: string;
  isTotal?: boolean;
}

export function CheckoutSummaryRow({ label, value, isTotal = false }: CheckoutSummaryRowProps) {
  const textColor = useThemeColor({}, 'text');
  const fontWeight = isTotal ? '500' : '400'; // Figma uses Medium for Total

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.label, { color: textColor, fontWeight }]}>
        {label}
      </ThemedText>
      <ThemedText style={[styles.value, { color: textColor, fontWeight }]}>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.large, // 16px from Figma
    height: 20, // Figma height for each row
  },
  label: {
    fontSize: 14, // Figma fontSize: 14
    lineHeight: 19.6, // Figma lineHeight: 19.6
  },
  value: {
    fontSize: 14, // Figma fontSize: 14
    lineHeight: 19.6, // Figma lineHeight: 19.6
    textAlign: 'right',
  },
});
