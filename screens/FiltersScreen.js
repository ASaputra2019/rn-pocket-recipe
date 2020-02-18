import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../component/HeaderButton';
import Colors from '../constants/Colors';


const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primary }}
        // thumbColor={Platform.OS === 'android' ? Colors.primary : ''}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  )
};

const FiltersScreen = ({ navigation }) => {
  const [ isGluttenFree, setIsGluttenFree ] = useState(false);
  const [ isLactoseFree, setIsLactoseFree ] = useState(false);
  const [ isVegan, setIsVegan ] = useState(false);
  const [ isVegetarian, setIsVegetarian ] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGluttenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegetarian,
      vegetarian: isVegetarian
    };
    console.log(appliedFilters);
  }, [isGluttenFree, isLactoseFree, isVegetarian, isVegan]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters
    });
  }, [ saveFilters ]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch 
        label='Glutten-free'
        state={isGluttenFree}
        onChange={(newV) => setIsGluttenFree(newV)}
      />
      <FilterSwitch 
        label='Lactose-free'
        state={isLactoseFree}
        onChange={(newV) => setIsLactoseFree(newV)}
      />
      <FilterSwitch 
        label='Vegan'
        state={isVegan}
        onChange={(newV) => setIsVegan(newV)}
      />
      <FilterSwitch 
        label='Vegetarian'
        state={isVegetarian}
        onChange={(newV) => setIsVegetarian(newV)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => (<HeaderButtons
      HeaderButtonComponent={HeaderButton}
    >
      <Item
        title="Menu"
        iconName='ios-menu'
        onPress={() => {
          navData.navigation.toggleDrawer()
        }}
      />
    </HeaderButtons>),
    headerRight: () => (<HeaderButtons
      HeaderButtonComponent={HeaderButton}
    >
      <Item
        title="Menu"
        iconName='ios-save'
        onPress={navData.navigation.getParam('save')}
      />
    </HeaderButtons>)
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-semibold',
    fontSize: 20,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20
  },
});

export default FiltersScreen;