import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import MealList from '../component/MealList';
import HeaderButton from '../component/HeaderButton';
import DefaultText from '../component/DefaultText';


const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.mealsReducer.favoriteMeals);
  return favMeals.length > 0 ? (
    <MealList
      listData={favMeals}
      navigation={props.navigation}
    />
  ) :
    <View style={styles.emptyContainer}>
      <DefaultText>
        No Favorite meals yet. Start add some!
      </DefaultText>
    </View>;
};
FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'My Favorites',
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

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

export default FavoritesScreen;