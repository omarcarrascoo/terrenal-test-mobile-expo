import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ProductVerticalCardProps {
  brand: string;
  name: string;
  price: string;
  imageUrl: string;
  onPress: () => void;
}

export function ProductVerticalCard({ brand, name, price, imageUrl, onPress }: ProductVerticalCardProps) {
  const imageBackgroundColor = useThemeColor({}, 'lightNeutral'); // Image background is #F5F5F5
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = useThemeColor({ light: 'rgba(0,0,0,0.5)', dark: 'rgba(255,255,255,0.5)' }, 'text'); // For 'Marca'

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.imageWrapper, { backgroundColor: imageBackgroundColor }]}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.infoContainer}>
        <ThemedText style={[styles.brand, { color: mutedTextColor }]} numberOfLines={1}>
          {brand}
        </ThemedText>
        <ThemedText style={[styles.name, { color: textColor }]} numberOfLines={2}>
          {name}
        </ThemedText>
        <ThemedText style={[styles.price, { color: textColor }]} numberOfLines={1}>
          {price}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 148, // Figma width: 148
    alignItems: 'flex-start', // Figma layoutMode: VERTICAL, primaryAxisAlignItems: CENTER, but Info is STRETCH, text left aligned
    marginRight: Spacing.medium, // Figma itemSpacing: 12, applied as marginRight in the ScrollView
    gap: Spacing.medium, // Figma itemSpacing: 12 between image and info
  },
  imageWrapper: {
    width: 148, // Figma width: 148
    height: 148, // Figma height: 148
    borderRadius: Spacing.small, // Figma cornerRadius: 8
    overflow: 'hidden', // Clip image to bounds
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    width: '100%', // Figma layoutAlign: STRETCH for Info
    gap: 2, // Figma itemSpacing: 2 between text elements, updated from Spacing.xsmall (4)
  },
  brand: {
    fontSize: 12, // Figma fontSize: 12
    fontWeight: '400', // Figma fontWeight: 400 (Regular)
    lineHeight: 17, // Figma lineHeight: 16.79px (closest to 17)
    textAlign: 'left', // Figma textAlignHorizontal: LEFT
  },
  name: {
    fontSize: 14, // Figma fontSize: 14
    fontWeight: '400', // Figma fontWeight: 400 (Regular)
    lineHeight: 20, // Figma lineHeight: 19.6px (closest to 20)
    textAlign: 'left', // Figma textAlignHorizontal: LEFT
  },
  price: {
    fontSize: 16, // Figma fontSize: 16
    fontWeight: '500', // Figma fontWeight: 500 (Medium)
    lineHeight: 22, // Figma lineHeight: 22.39px (closest to 22)
    textAlign: 'left', // Figma textAlignHorizontal: LEFT
  },
});
