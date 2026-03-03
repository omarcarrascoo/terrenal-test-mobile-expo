import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CheckoutItemCardProps {
  imageUrl: string;
  brand: string;
  name: string;
  description: string;
  quantity: number;
  price: string;
}

export function CheckoutItemCard({ imageUrl, brand, name, description, quantity, price }: CheckoutItemCardProps) {
  const imageBackgroundColor = useThemeColor({}, 'lightNeutral');
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = useThemeColor({ light: 'rgba(0,0,0,0.5)', dark: 'rgba(255,255,255,0.5)' }, 'text');

  return (
    <View style={styles.container}>
      <View style={[styles.imageWrapper, { backgroundColor: imageBackgroundColor }]}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.infoContainer}>
        <ThemedText style={[styles.brand, { color: mutedTextColor }]} numberOfLines={1}>
          {brand}
        </ThemedText>
        <ThemedText style={[styles.name, { color: textColor }]} numberOfLines={1}>
          {name}
        </ThemedText>
        <ThemedText style={[styles.description, { color: textColor }]} numberOfLines={1}>
          {description}
        </ThemedText>
        <ThemedText style={[styles.quantity, { color: textColor }]} numberOfLines={1}>
          Cantidad: {quantity}
        </ThemedText>
      </View>
      <ThemedText style={[styles.price, { color: textColor }]} numberOfLines={1}>
        {price}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top
    paddingHorizontal: Spacing.large,
    width: '100%', // Takes full width of parent
    height: 84, // Figma height
    gap: Spacing.medium, // 12px between image and info
  },
  imageWrapper: {
    width: 84, // Figma width
    height: 84, // Figma height
    borderRadius: Spacing.small, // Figma cornerRadius: 8
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1, // Takes available space
    gap: 2, // Figma itemSpacing: 2
    justifyContent: 'center', // Center content vertically
  },
  brand: {
    fontSize: 12, // Figma fontSize: 12
    fontWeight: '400', // Figma fontWeight: 400 (Regular)
    lineHeight: 18, // Figma lineHeight: 18
  },
  name: {
    fontSize: 14, // Figma fontSize: 14
    fontWeight: '400', // Figma fontWeight: 400 (Regular)
    lineHeight: 19.6, // Figma lineHeight: 19.6
  },
  description: {
    fontSize: 14, // Figma fontSize: 14
    fontWeight: '400', // Figma fontWeight: 400 (Regular)
    lineHeight: 19.6, // Figma lineHeight: 19.6
  },
  quantity: {
    fontSize: 14, // Figma fontSize: 14
    fontWeight: '400', // Figma fontWeight: 400 (Regular)
    lineHeight: 19.6, // Figma lineHeight: 19.6
  },
  price: {
    fontSize: 14, // Figma fontSize: 14
    fontWeight: '400', // Figma fontWeight: 400 (Regular)
    lineHeight: 19.6, // Figma lineHeight: 19.6
    textAlign: 'right', // Figma textAlignHorizontal: RIGHT
    marginLeft: Spacing.small, // Add some margin to separate from info
  },
});
