import React from 'react';
import { CATEGORIES, MEALS } from '../data/dummy-data';

import MealList from '../component/MealList';
import { Dimensions, Platform } from 'react-native';


const MealScreen = (props) => {
  const catId = props.navigation.getParam('categoryId');
  const displayMeals = MEALS.filter((meal) => 
    meal.categoryIds.indexOf(catId) >= 0
  );

  return (
    <MealList
      listData={displayMeals}
      navigation={props.navigation}
    />
  );
};
MealScreen.navigationOptions = (props) => {
  const catId = props.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
    headerTitleStyle: {
      fontFamily: 'open-sans-bold',
    },
  };
};

export default MealScreen;