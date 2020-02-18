import React from 'react';
import { useSelector } from 'react-redux'; // the hook of redux

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../component/MealList';


const MealScreen = (props) => {
  const catId = props.navigation.getParam('categoryId');
  const availableMeals = useSelector(state => state.mealsReducer.filteredMeals);
  const displayMeals = availableMeals.filter((meal) => 
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