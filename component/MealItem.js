import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, ImageBackground } from 'react-native';


const MealItem = props => {
  let Touchable = (Platform.OS === 'android' && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <View style={styles.mealItem}>
      <Touchable onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
            <Text>{props.duration} minutes</Text>
            <Text>{props.complexity.toUpperCase()}</Text>
            <Text>{props.affordability}</Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealHeader: {
    height: "85%"
  },
  mealDetails: {
    height: "15%",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: 'white',
    textAlign: 'center'
  }
});

export default MealItem;