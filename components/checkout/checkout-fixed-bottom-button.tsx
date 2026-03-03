import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Spacing, Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CheckoutFixedBottomButtonProps {
  label: string;
  onPress: () => void;
}

export function CheckoutFixedBottomButton({ label, onPress }: CheckoutFixedBottomButtonProps) {
  const insets = useSafeAreaInsets();
  const borderColor = useThemeColor({}, 'border'); // Figma border is light gray
  const shadowColor = useThemeColor({}, 'shadow'); // For button shadow

  // For the specific black button with white text from Figma
  const actualButtonBg = Colors.dark.background; // Black
  const actualButtonText = Colors.dark.text; // White

  return (
    <View style={[styles.outerContainer, { paddingBottom: insets.bottom }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: actualButtonBg, shadowColor: shadowColor }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <ThemedText style={[styles.buttonText, { color: actualButtonText }]}>
          {label}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    paddingHorizontal: Spacing.large, // 16px to align with other content
  },
  button: {
    width: '100%', // Figma width: 343, which is 375 - (16*2)
    height: 52, // Figma height
    borderRadius: Spacing.small, // Figma cornerRadius: 8
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 }, // Figma offset y: 1
    shadowOpacity: 0.05, // Figma opacity: 0.05
    shadowRadius: 2, // Figma radius: 2
    elevation: 3, // Android shadow
  },
  buttonText: {
    fontSize: 16, // Figma fontSize: 16
    fontWeight: '500', // Figma fontWeight: 500 (Medium)
    lineHeight: 24, // Figma lineHeight: 24
  },
});
