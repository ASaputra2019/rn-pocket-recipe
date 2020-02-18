import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux'

import MealList from '../component/MealList';
import HeaderButton from '../component/HeaderButton';


const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.mealsReducer.favoriteMeals);
  return (
    <MealList 
      listData={favMeals}
      navigation={props.navigation}
    />
  );
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

export default FavoritesScreen;