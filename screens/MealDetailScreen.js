import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../component/HeaderButton';
import DefaultText from '../component/DefaultText';
import { toggleFavorite } from '../store/actions/meals';


const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = ({ navigation }) => {
  const availableMeals = useSelector(state => state.mealsReducer.meals);
  const mealId = navigation.getParam('mealId');
  const currentIsFavorite = useSelector(state =>
    state.mealsReducer.favoriteMeals.some(meal => meal.id === mealId)
  );
  const selectedMeals = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({ toggleFav: toggleFavHandler });
  }, [toggleFavHandler]);

  useEffect(() => {
    navigation.setParams({ isFav: currentIsFavorite });
  }, [currentIsFavorite])

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeals.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeals.duration} minutes</DefaultText>
        <DefaultText>{selectedMeals.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeals.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeals.ingredients.map((ingredient) => (
        <ListItem style={styles.content} key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeals.steps.map((step) => (
        <ListItem style={styles.content} key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  const mealTitle = navData.navigation.getParam('mealTitle');
  const toggleFav = navData.navigation.getParam('toggleFav');
  const isFavorite = navData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerTitleStyle: {
      fontFamily: 'open-sans-bold',
      maxWidth: Dimensions.get('window').width * 0.6
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item
          title="Favorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFav}
        />
      </HeaderButtons>
    )
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