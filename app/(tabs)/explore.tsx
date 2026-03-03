import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing, Fonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

const exploreCategories = [
  { id: '1', name: 'Aventura' },
  { id: '2', name: 'Comida y Bebida' },
  { id: '3', name: 'Arte y Cultura' },
  { id: '4', name: 'Naturaleza y Aire Libre' },
  { id: '5', name: 'Tecnología' },
  { id: '6', name: 'Salud y Bienestar' },
  { id: '7', name: 'Educación' },
  { id: '8', name: 'Deportes' },
  { id: '9', name: 'Música' },
  { id: '10', name: 'Moda' },
  { id: '11', name: 'Gaming' },
  { id: '12', name: 'Viajes' },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'placeholder');
  const shadowColor = useThemeColor({}, 'shadow');
  const primaryColor = useThemeColor({}, 'primary');

  const handleCategoryPress = (categoryName: string) => {
    Alert.alert('Explora', `Has seleccionado: ${categoryName}`);
    // En una aplicación real, navegarías a una pantalla de detalles de categoría o filtrarías resultados
  };

  const filteredCategories = exploreCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>Explora</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>Descubre nuevas experiencias</ThemedText>

        <TextInput
          style={[
            styles.searchInput,
            { backgroundColor: cardBackgroundColor, color: textColor, borderColor: shadowColor }
          ]}
          placeholder="Buscar categorías..."
          placeholderTextColor={placeholderColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />

        <View style={styles.categoriesGrid}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  { backgroundColor: cardBackgroundColor, shadowColor: shadowColor }
                ]}
                onPress={() => handleCategoryPress(category.name)}
              >
                <ThemedText style={[styles.categoryText, { color: primaryColor }]}>{category.name}</ThemedText>
              </TouchableOpacity>
            ))
          ) : (
            <ThemedText style={[styles.noResultsText, { color: textColor }]}>No se encontraron categorías para "{searchQuery}"</ThemedText>
          )}
        </View>
        {/* Added a padding at the bottom of ScrollView to avoid tab bar overlap */}
        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ThemedView already handles background, no need to set here unless overriding
  },
  scrollContent: {
    paddingHorizontal: Spacing.large,
    paddingTop: Spacing.large,
    paddingBottom: Spacing.large, // Ensure scroll view has some padding at bottom
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    // ThemedText type='title' will handle color dynamically based on theme. If specific branding color is needed, pass it explicitly.
    marginBottom: Spacing.small,
    textAlign: 'center',
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    fontSize: 16,
    // ThemedText type='subtitle' will handle color dynamically.
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  searchInput: {
    width: '100%',
    height: 50,
    borderRadius: Spacing.small,
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.large,
    fontSize: 16,
    borderWidth: 1,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%', // Para dos columnas con espacio entre ellas
    borderRadius: Spacing.small,
    padding: Spacing.medium,
    marginBottom: Spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    minHeight: 100,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    marginTop: Spacing.large,
  },
});
