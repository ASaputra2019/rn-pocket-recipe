import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MEALS } from '../data/dummy-data';


const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const selectedMeals= MEALS.find(meal => meal.id === mealId)
  
  return (
    <View style={styles.screen}>
      <Text>{selectedMeals.title}</Text>
    </View>
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  const mealId = navData.navigation.getParam('mealId');
  const selectedMeals= MEALS.find(meal => meal.id === mealId);
  
  return {
    headerTitle: selectedMeals.title
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealDetailScreen;