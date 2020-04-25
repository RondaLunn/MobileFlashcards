import React, { Component } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

export default class ViewDeck extends Component {

    render() {
        const { id, cards, name, count, navigation } = this.props

        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                    <Text>{count}{count === 1 ? ' Card' : ' Cards'}</Text>
                </View>
                {count > 0
                ? <Button title="Start a Quiz" onPress={() => navigation.navigate('Quiz', {screen: 'Quiz', params:{cards}})} />
                : <Text>You do not have any cards in this deck. Add at least one card to take a quiz.</Text>}
                
                <Button title="Add Card" onPress={() => navigation.navigate('Add a Card', id)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    text: {
      fontSize: 20,
    }
  });