import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, View, Text, StyleSheet, Platform } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';


const CategoryGridTile = props => {
  let Touchable = (Platform.OS === 'android' && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity
  return (
    <View style={styles.gridItem}>
      <Touchable
        onPress={props.onSelect}
        style={{ flex: 1 }}
      >
        <View style={{ ...styles.container, backgroundColor: props.color }}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: Platform.OS === 'android' && Platform.Version >= 21 
      ? 'hidden'
      : 'visible',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'open-sans-semibold',
    fontSize: 18,
    textAlign: 'right'
  }
});

export default CategoryGridTile;