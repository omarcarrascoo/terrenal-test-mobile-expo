import React from 'react';
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

// Custom components for checkout screen
import { CheckoutHeader } from '@/components/checkout/checkout-header';
import { CheckoutInfoRow } from '@/components/checkout/checkout-info-row';
import { CheckoutItemCard } from '@/components/checkout/checkout-item-card';
import { CheckoutSummaryRow } from '@/components/checkout/checkout-summary-row';
import { CheckoutFixedBottomButton } from '@/components/checkout/checkout-fixed-bottom-button';

// Dummy data
const dummyCheckoutItems = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/id/1015/84/84',
    brand: 'Marca',
    name: 'Nombre del producto',
    description: 'Descripción',
    quantity: 1,
    price: '$10,99',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/id/1016/84/84',
    brand: 'Marca',
    name: 'Nombre del producto',
    description: 'Descripción',
    quantity: 1,
    price: '$8,99',
  },
];

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const screenBackgroundColor = useThemeColor({}, 'cardBackground'); // Set root background to pure white as per Figma
  const fixedBottomAreaBackgroundColor = useThemeColor({}, 'cardBackground'); // Also pure white for fixed bottom area
  const sectionHeaderColor = useThemeColor({}, 'text'); // For "ARTÍCULOS" headers
  const sectionHeaderBorderColor = useThemeColor({}, 'border'); // Border under section headers

  const handlePressPlaceholder = (section: string) => {
    Alert.alert('Navegar', `Navegar a la pantalla de ${section}`);
  };

  const handlePlaceOrder = () => {
    Alert.alert('Pedido Realizado', 'Tu pedido ha sido procesado con éxito!');
  };

  // Calculate total height of fixed bottom elements for ScrollView padding
  // 4 summary rows (20px each) = 80px
  // Gap between summary and button (Spacing.small) = 8px
  // Button height = 52px
  // Padding above fixed bottom section (Spacing.large) = 16px
  const fixedBottomContentHeight = 80 + Spacing.small + 52 + Spacing.large;
  const scrollPaddingBottom = fixedBottomContentHeight + insets.bottom; // Add insets for scrollable area to clear home indicator

  return (
    <ThemedView style={[styles.fullScreenContainer, { backgroundColor: screenBackgroundColor }]}>
      <CheckoutHeader title="Pantalla de pago" />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: scrollPaddingBottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Checkout Info Sections */}
        <View style={styles.infoSectionContainer}>
          <CheckoutInfoRow
            category="ENVÍO"
            infoText="Agregar dirección de envío"
            onPress={() => handlePressPlaceholder('dirección de envío')}
          />
          <CheckoutInfoRow
            category="ENTREGA"
            infoText="Gratis"
            subInfoText="Estándar | 3-4 días"
            onPress={() => handlePressPlaceholder('opciones de entrega')}
          />
          <CheckoutInfoRow
            category="PAGO"
            infoText="Visa *1234"
            onPress={() => handlePressPlaceholder('método de pago')}
          />
          <CheckoutInfoRow
            category="PROMOCIONES"
            infoText="Aplicar código de promoción"
            onPress={() => handlePressPlaceholder('promociones')}
          />
        </View>

        {/* Items Section */}
        <View style={[styles.itemsSection, { borderBottomColor: sectionHeaderBorderColor }]}>
          <View style={[styles.itemsHeader, { borderBottomColor: sectionHeaderBorderColor }]}>
            <ThemedText style={[styles.itemsHeaderText, { color: sectionHeaderColor }]}>ARTÍCULOS</ThemedText>
            <ThemedText style={[styles.itemsHeaderText, { color: sectionHeaderColor, flex: 1, textAlign: 'left', marginLeft: Spacing.medium }]}>DESCRIPCIÓN</ThemedText>
            <ThemedText style={[styles.itemsHeaderText, { color: sectionHeaderColor, textAlign: 'right' }]}>PRECIO</ThemedText>
          </View>
          <View style={styles.itemList}>
            {dummyCheckoutItems.map((item) => (
              <CheckoutItemCard key={item.id} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Summary and Button */}
      <View style={[styles.fixedBottomContainer, { backgroundColor: fixedBottomAreaBackgroundColor }]}>
        <View style={styles.summaryContainer}>
          <CheckoutSummaryRow label="Subtotal (2)" value="$19,98" />
          <CheckoutSummaryRow label="Total de envío" value="Gratis" />
          <CheckoutSummaryRow label="Impuestos" value="$2,00" />
          <CheckoutSummaryRow label="Total" value="$21,98" isTotal />
        </View>
        <CheckoutFixedBottomButton label="Hacer pedido" onPress={handlePlaceOrder} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.small, // Add a little space if the header is snug
  },
  infoSectionContainer: {
    marginBottom: Spacing.large,
  },
  itemsSection: {
    paddingBottom: Spacing.large, // Space from the last item to the next section (the fixed bottom)
    borderBottomWidth: 0.5,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    marginBottom: Spacing.small, // Gap between header and first item
    borderBottomWidth: 0.5,
  },
  itemsHeaderText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  itemList: {
    gap: Spacing.large, // Figma itemSpacing: 16 between items
  },
  fixedBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: Spacing.large, // Space between scrollable content and fixed bottom part
  },
  summaryContainer: {
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },
});
