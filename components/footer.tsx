import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export function Footer() {
  const backgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={[styles.footerContainer, { backgroundColor }]}>
      <ThemedText style={[styles.footerText, { color: textColor }]}>
        © {new Date().getFullYear()} Terrenal. Todos los derechos reservados.
      </ThemedText>
      <View style={styles.linksContainer}>
        <ThemedText style={[styles.footerLink, { color: Colors.light.tint }]}>Privacidad</ThemedText>
        <ThemedText style={[styles.footerLink, { color: Colors.light.tint }]}>Términos</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)', // Subtle border for light/dark theme
    width: '100%',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: Spacing.small,
  },
  linksContainer: {
    flexDirection: 'row',
    gap: Spacing.large,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '500',
  },
});
