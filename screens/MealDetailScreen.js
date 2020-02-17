import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../component/HeaderButton';
import DefaultText from '../component/DefaultText';



const ListItem = props => {
  return (
    <View>
      <DefaultText style={styles.listItem}>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const selectedMeals = MEALS.find(meal => meal.id === mealId)

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeals.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeals.duration} minutes</DefaultText>
        <DefaultText>{selectedMeals.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeals.affordability}</DefaultText>
      </View>
      <DefaultText style={styles.title}>Ingredients</DefaultText>
      {selectedMeals.ingredients.map((ingredient) => <ListItem style={styles.content} key={ingredient}>{ingredient}</ListItem>)}
      <DefaultText style={styles.title}>Steps</DefaultText>
      {selectedMeals.steps.map((step) => <ListItem style={styles.content} key={step}>{step}</ListItem>)}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  const mealId = navData.navigation.getParam('mealId');
  const selectedMeals = MEALS.find(meal => meal.id === mealId);

  return {
    headerTitle: selectedMeals.title,
    headerTitleStyle: {
      fontFamily: 'open-sans-bold',
      maxWidth: Dimensions.get('window').width * 0.6
    },
    headerRight: () => <HeaderButtons
      HeaderButtonComponent={HeaderButton}
    >
      <Item
        title="Favorite"
        iconName="ios-star"
        onPress={() => { console.log('Mark as Fav') }}
      />
    </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-semibold',
    fontSize: 20,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;