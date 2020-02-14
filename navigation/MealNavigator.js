import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import MealsScreen from '../screens/MealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors'



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
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,

  }
});

export default createAppContainer(MealsNavigator);
