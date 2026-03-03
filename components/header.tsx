import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Colors, Spacing, Fonts } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface HeaderProps {
  onMenuPress: () => void;
  title?: string;
}

export function Header({ onMenuPress, title = 'Terrenal' }: HeaderProps) {
  // El encabezado siempre será negro y moderno, como se solicitó, sobrescribiendo el tema general.
  const headerBackgroundColor = Colors.dark.background;
  const headerTextColor = Colors.dark.text;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: headerBackgroundColor }]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <IconSymbol name="line.horizontal.3" size={28} color={headerTextColor} />
        </TouchableOpacity>
        <Text style={[styles.logoTitle, { color: headerTextColor }]}>
          {title}
        </Text>
        {/* Espacio reservado para contenido del lado derecho, si lo hubiera, para equilibrar el diseño */}
        <View style={styles.rightPlaceholder} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    // Agregamos un padding específico para Android para considerar la altura de la barra de estado
    paddingTop: Platform.OS === 'android' ? Spacing.xl : 0,
    shadowColor: Colors.dark.shadow, // Sutil sombra para dar profundidad al encabezado
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8, // Elevación para Android
    zIndex: 10, // Asegura que el encabezado esté por encima de otros contenidos
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, // Aumentado para un aspecto más amplio y menos rígido
    paddingVertical: Spacing.large, // Aumentado para un aspecto más amplio y menos rígido
    // borderBottomWidth: StyleSheet.hairlineWidth, // Ya no es necesario con la sombra
    // borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuButton: {
    padding: Spacing.small,
  },
  logoTitle: {
    fontSize: 26, // Tamaño de fuente ligeramente mayor para enfatizar el logo
    fontWeight: 'bold',
    fontFamily: Fonts.rounded, // Aplicamos la fuente redondeada para el estilo de logo
  },
  rightPlaceholder: {
    // Esto crea un espacio vacío para empujar el título al centro,
    // igualando el ancho aproximado del botón del menú de hamburguesa.
    width: 28 + Spacing.small * 2, // Ajustado al nuevo tamaño del icono
  },
});
