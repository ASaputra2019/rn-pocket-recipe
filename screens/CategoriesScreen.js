import React from 'react';
import { SafeAreaView, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../component/CategoryGridTile';
import HeaderButton from '../component/HeaderButton';

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    )
  };

  return (
    <FlatList
      keyExtractor={(item, idx) => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGridItem}
    />
  );
};
CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meal Categories',
    headerTitleStyle: {
      fontFamily: 'open-sans-bold',
    },
    headerLeft: () => <HeaderButtons
      HeaderButtonComponent={HeaderButton}
    >
      <Item
        title="Menu"
        iconName='ios-menu'
        onPress={() => {
          navData.navigation.toggleDrawer()
        }}
      />
    </HeaderButtons>
  };
};

export default CategoriesScreen;