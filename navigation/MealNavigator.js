import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import CategoriesScreen from '../screens/CategoriesScreen';
import MealsScreen from '../screens/MealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';
import FiltersScreen from '../screens/FiltersScreen';


const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android'
      ? Colors.primary
      : 'white'
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
    fontSize: 15
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: MealsScreen
  },
  MealDetail: {
    screen: MealDetailScreen
  }
}, {
  // mode: 'modal', // only for iOS
  // initialRouteName: 'Categories', // by default
  defaultNavigationOptions,
  // transitionConfig: getSlideFromRightTransition // deprecated
});

const FavNavigator = createStackNavigator({
  Favorites: {
    screen: FavoritesScreen
  },
  MealDetail: {
    screen: MealDetailScreen,
  }
}, {
  defaultNavigationOptions,
    // transitionConfig: getSlideFromRightTransition // deprecated
});


const tabScreenConfig = {
  Meals: { // default label name become Meals
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo =>
        <Ionicons
          name='ios-restaurant'
          size={25}
          color={tabInfo.tintColor}
        />,
      tabBarColor: Colors.primary, //only works with shifting
      tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans' }}>Meals</Text> : 'Meals'
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo =>
        <Ionicons
          name='ios-star'
          size={25}
          color={tabInfo.tintColor}
        />,
      tabBarColor: Colors.accent, //only works with shifting, and plain text of tabBarLabel
      tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans' }}>Favorites</Text> : 'Favorites'
    }
  }
};

const MealsFavTabNavigator = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: 'white',
    shifting: true,
    barStyle: { // alternative to shifting: true
      backgroundColor: Colors.primary
    }
  })
  : createBottomTabNavigator(
    tabScreenConfig, {
    labelStyle: {
      fontFamily: 'open-sans-bold',
      fontSize: 15  
    },
    tabBarOptions: {
      activeTintColor: Colors.primary,
    }
  });



const FilterNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  navigationOptions: {
  },
  defaultNavigationOptions
});

const mainNavigation = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FilterNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accent,
    labelStyle: {
      fontFamily: 'open-sans-semibold'
    }
  }
});

export default createAppContainer(mainNavigation);