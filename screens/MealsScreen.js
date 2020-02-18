import React from 'react';
import { useSelector } from 'react-redux'; // the hook of redux
import { View, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../component/MealList';
import DefaultText from '../component/DefaultText';


const MealScreen = (props) => {
  const catId = props.navigation.getParam('categoryId');
  const availableMeals = useSelector(state => state.mealsReducer.filteredMeals);
  const displayMeals = availableMeals.filter((meal) =>
    meal.categoryIds.indexOf(catId) >= 0
  );

  return displayMeals.length === 0 ?
    <View style={styles.emptyContainer}>
      <DefaultText>No meals found, check your filters.</DefaultText>
    </View> :
    <MealList
      listData={displayMeals}
      navigation={props.navigation}
    />;
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

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MealScreen;