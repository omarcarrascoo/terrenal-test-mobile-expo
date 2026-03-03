import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors, Spacing } from './theme';

const exploreCategories = [
  { id: '1', name: 'Adventure' },
  { id: '2', name: 'Food & Drink' },
  { id: '3', name: 'Art & Culture' },
  { id: '4', name: 'Nature & Outdoors' },
  { id: '5', name: 'Technology' },
  { id: '6', name: 'Health & Wellness' },
  { id: '7', name: 'Education' },
  { id: '8', name: 'Sports' },
  { id: '9', name: 'Music' },
  { id: '10', name: 'Fashion' },
  { id: '11', name: 'Gaming' },
  { id: '12', name: 'Travel' },
];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (categoryName) => {
    Alert.alert('Explore', `You selected: ${categoryName}`);
    // En una aplicación real, navegarías a una pantalla de detalles de categoría o filtrarías resultados
  };

  const filteredCategories = exploreCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Explora</Text>
        <Text style={styles.subtitle}>Descubre nuevas experiencias</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar categorías..."
          placeholderTextColor={Colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />

        <ScrollView contentContainerStyle={styles.categoriesGrid}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.name)}
              >
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>No se encontraron categorías para "{searchQuery}"</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    paddingTop: Spacing.large,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  searchInput: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.small,
    paddingHorizontal: Spacing.medium,
    color: Colors.text,
    marginBottom: Spacing.large,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.background, // Match input border to its background
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: Spacing.large,
  },
  categoryCard: {
    width: '48%', // Para dos columnas con espacio entre ellas
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.small,
    padding: Spacing.medium,
    marginBottom: Spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    minHeight: 100,
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noResultsText: {
    color: Colors.text,
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    marginTop: Spacing.large,
  },
});

export default App;