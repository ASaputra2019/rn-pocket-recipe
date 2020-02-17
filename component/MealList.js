import React from 'react';
import { FlatList, View, SafeAreaView, StyleSheet } from 'react-native';

import MealItem from './MealItem';

const MealList = props => {
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
              mealId: itemData.item.id
            }
          })
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.list}>
      <FlatList
        keyExtractor={(item, idx) => item.id}
        data={props.listData}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default MealList;