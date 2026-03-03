import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CheckoutHeaderProps {
  title: string;
}

export function CheckoutHeader({ title }: CheckoutHeaderProps) {
  const navigation = useNavigation();
  const headerBackgroundColor = useThemeColor({}, 'cardBackground'); // White for light, dark gray for dark
  const headerTextColor = useThemeColor({}, 'text'); // Black for light, white for dark
  const iconColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border'); // For the bottom border

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: headerBackgroundColor, borderBottomColor: borderColor }]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: headerTextColor }]}>
          {title}
        </Text>
        {/* Placeholder for right side to center the title */}
        <View style={styles.rightPlaceholder} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    // The Figma header height is 42px below status bar.
    paddingTop: Platform.OS === 'android' ? Spacing.small * 0.5 : 0, // A small adjustment for Android status bar
    borderBottomWidth: 0.5,
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.large, // 16px from Figma
    height: 42, // Figma header height
  },
  backButton: {
    padding: Spacing.xsmall, // To make touchable area larger than the icon
  },
  title: {
    fontSize: 17, // Figma fontSize: 17
    fontWeight: '600', // Figma fontWeight: 600 (Semi Bold)
    letterSpacing: -0.34, // Figma letterSpacing: -0.34
  },
  rightPlaceholder: {
    width: 24 + Spacing.xsmall * 2, // Match back button width including padding to center title
  },
});
