import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../component/MealItem';


const MealScreen = props => {
  const renderMealItem = itemData => {
    return (
      <MealItem 
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
              
            }
          })
        }}
      />
    );
  }
  const catId = props.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => 
    cat.id === catId
  );
  const displayMeals = MEALS.filter(meal => 
    meal.categoryIds.includes(catId)
  );

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item, idx) => item.id}
        data={displayMeals}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};
MealScreen.navigationOptions = (props) => {
  const catId = props.navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)
  return {
    headerTitle: selectedCategory.title,
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default MealScreen;