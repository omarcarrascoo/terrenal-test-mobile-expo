import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing, Fonts } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>
          Bienvenido
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Descubre tu próxima aventura con nosotros. ¡Estamos aquí para guiarte!
        </ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            Explora Categorías
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            Sumérgete en un mundo de posibilidades. Encuentra desde gastronomía local hasta emocionantes deportes al aire libre.
          </ThemedText>
          <Link href="/explore" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Ver todas las categorías</ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            Crea Tu Propia Aventura
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            ¿Tienes una idea? Personaliza tu viaje, elige tus destinos y actividades favoritas para una experiencia única.
          </ThemedText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Aventura Personalizada', '¡Pronto podrás crear tus propias aventuras!')}
          >
            <ThemedText style={styles.buttonText}>Empezar a crear</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            Novedades y Eventos
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            Mantente al día con los últimos eventos y las experiencias más populares cerca de ti.
          </ThemedText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Novedades', '¡Descubre lo nuevo y emocionante!')}
          >
            <ThemedText style={styles.buttonText}>Ver novedades</ThemedText>
          </TouchableOpacity>
        </ThemedView>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.large,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.small,
    marginTop: Spacing.xl,
    textAlign: 'center',
    fontFamily: Fonts.rounded, 
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: Spacing.xxl,
    textAlign: 'center',
    maxWidth: '90%',
    lineHeight: 28,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.medium,
    padding: Spacing.large,
    marginBottom: Spacing.xl,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset for more depth
    shadowOpacity: 0.15,
    shadowRadius: 8, // Increased shadow radius for a softer look
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    color: Colors.primary,
    marginBottom: Spacing.small,
  },
  cardDescription: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: Spacing.medium,
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.tint,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.large,
    borderRadius: Spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.small,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
