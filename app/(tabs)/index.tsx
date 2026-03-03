import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { SearchBar } from '@/components/home/search-bar';
import { Pill } from '@/components/home/pill';
import { HomeBanner } from '@/components/home/home-banner';
import { SectionHeader } from '@/components/home/section-header';
import { CategoryHorizontalCard } from '@/components/home/category-horizontal-card';
import { ProductVerticalCard } from '@/components/home/product-vertical-card';
import { ImageHorizontalCard } from '@/components/home/image-horizontal-card';
import { IconSymbolName } from '@/components/ui/icon-symbol'; // Import IconSymbolName type

// Dummy data for the UI components
const pillsData: { id: string; label: string; icon: IconSymbolName }[] = [
  { id: '1', label: 'Favoritos', icon: 'heart.fill' },
  { id: '2', label: 'Historial', icon: 'clock.fill' },
  { id: '3', label: 'Seguidos', icon: 'person.3.fill' },
  { id: '4', label: 'Pedidos', icon: 'bag.fill' },
];

const categoriesData = [
  { id: '1', title: 'Comida', imageUrl: 'https://picsum.photos/id/1040/76/76' },
  { id: '2', title: 'Ropa', imageUrl: 'https://picsum.photos/id/1041/76/76' },
  { id: '3', title: 'Hogar', imageUrl: 'https://picsum.photos/id/1042/76/76' },
  { id: '4', title: 'Electrónica', imageUrl: 'https://picsum.photos/id/1043/76/76' },
  { id: '5', title: 'Libros', imageUrl: 'https://picsum.photos/id/1044/76/76' },
  { id: '6', title: 'Deportes', imageUrl: 'https://picsum.photos/id/1045/76/76' },
];

const productsData = [
  { id: '1', brand: 'Nike', name: 'Zapatillas Deportivas Air Max', price: '$120.00', imageUrl: 'https://picsum.photos/id/1015/148/148' },
  { id: '2', brand: 'Adidas', name: 'Pantalones de Chándal', price: '$50.00', imageUrl: 'https://picsum.photos/id/1016/148/148' },
  { id: '3', brand: 'Zara', name: 'Camiseta Básica Algodón', price: '$25.00', imageUrl: 'https://picsum.photos/id/1018/148/148' },
  { id: '4', brand: 'Apple', name: 'Auriculares Inalámbricos Pro', price: '$200.00', imageUrl: 'https://picsum.photos/id/1025/148/148' },
];

const largeImageData = [
  { id: '1', imageUrl: 'https://picsum.photos/id/1000/96/96' },
  { id: '2', imageUrl: 'https://picsum.photos/id/1001/96/96' },
  { id: '3', imageUrl: 'https://picsum.photos/id/1002/96/96' },
  { id: '4', imageUrl: 'https://picsum.photos/id/1003/96/96' },
  { id: '5', imageUrl: 'https://picsum.photos/id/1004/96/96' },
];

export default function HomeScreen() {
  const [activePill, setActivePill] = useState(pillsData[0].id);

  const handlePillPress = (id: string) => {
    setActivePill(id);
    Alert.alert('Pill Seleccionada', `Has seleccionado la píldora con ID: ${id}`);
  };

  const handleSearchPress = () => {
    Alert.alert('Buscar', 'Has presionado la barra de búsqueda!');
    // In a real app, navigate to a search screen or open a search modal
  };

  const handleBannerPress = () => {
    Alert.alert('Banner', 'Has presionado el banner!');
  };

  const handleCategoryPress = (title: string) => {
    Alert.alert('Categoría', `Has seleccionado la categoría: ${title}`);
    // In a real app, navigate to category details
  };

  const handleProductPress = (name: string) => {
    Alert.alert('Producto', `Has seleccionado el producto: ${name}`);
    // In a real app, navigate to product details
  };

  const handleLargeImagePress = (id: string) => {
    Alert.alert('Imagen', `Has seleccionado la imagen con ID: ${id}`);
    // In a real app, navigate to image gallery or details
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Search Bar */}
        <SearchBar placeholder="Buscar productos..." onPress={handleSearchPress} />

        {/* Pills (Horizontal Scroll) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsContainer}
        >
          {pillsData.map((pill) => (
            <Pill
              key={pill.id}
              iconName={pill.icon}
              label={pill.label}
              onPress={() => handlePillPress(pill.id)}
              isActive={pill.id === activePill}
            />
          ))}
        </ScrollView>

        {/* Main Banner */}
        <HomeBanner
          title="Título del banner"
          imageUrl="https://picsum.photos/id/10/343/136" // Placeholder image
          onPress={handleBannerPress}
        />

        {/* Categories Section */}
        <SectionHeader title="Explorar Categorías" onPressViewAll={() => Alert.alert('Ver Todo', 'Ver todas las categorías')} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCarouselContainer}
        >
          {categoriesData.map((category) => (
            <CategoryHorizontalCard
              key={category.id}
              title={category.title}
              imageUrl={category.imageUrl}
              onPress={() => handleCategoryPress(category.title)}
            />
          ))}
        </ScrollView>

        {/* Products Section */}
        <SectionHeader title="Productos Populares" onPressViewAll={() => Alert.alert('Ver Todo', 'Ver todos los productos')} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCarouselContainer}
        >
          {productsData.map((product) => (
            <ProductVerticalCard
              key={product.id}
              brand={product.brand}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              onPress={() => handleProductPress(product.name)}
            />
          ))}
        </ScrollView>

        {/* Large Images Section */}
        <SectionHeader title="Novedades Destacadas" onPressViewAll={() => Alert.alert('Ver Todo', 'Ver todas las novedades')} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCarouselContainer}
        >
          {largeImageData.map((imageItem) => (
            <ImageHorizontalCard
              key={imageItem.id}
              imageUrl={imageItem.imageUrl}
              onPress={() => handleLargeImagePress(imageItem.id)}
            />
          ))}
        </ScrollView>

        {/* Padding for the bottom of the scroll view so content doesn't get hidden by the tab bar and footer */}
        <View style={{ height: Spacing.xxxl * 2 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ThemedView already handles background color based on theme
  },
  scrollContent: {
    paddingTop: Spacing.large, // Initial padding at the top
  },
  pillsContainer: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.medium,
    gap: Spacing.small, // Figma itemSpacing: 8
  },
  horizontalCarouselContainer: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small, // Vertical padding for carousel row
    // The individual card components handle their right margin to create itemSpacing
  },
});
