import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'

export default class Deck extends Component {

    render() {
      const { name, count, id } = this.props
      let bounceValue = new Animated.Value(1)

    return (
      <TouchableOpacity onPress={() => {
        Animated.sequence([
          Animated.timing(bounceValue, { duration: 200, toValue: 1.4}),
          Animated.spring(bounceValue, { toValue: 1, friction: 4})
        ]).start()
        this.props.viewDeck({ id, name, count })}}>
        <View style={styles.container}>
        <Animated.Text
            style={[{fontSize: 30}, {transform: [{scale: bounceValue}]}]}>
              {name}
          </Animated.Text>
          <Text style={styles.text}>{count}{count === 1 ? ' Card' : ' Cards'}</Text>
        </View>
      </TouchableOpacity>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 150,
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
  }
});