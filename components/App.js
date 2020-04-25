import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import DeckList from './DeckList'
import ViewDeck from './ViewDeck'
import AddDeck from './AddDeck'
import AddCard from './AddCard'
import Quiz from './Quiz'

import { initializeData } from '../utils/api'
import{ setLocalNotification } from '../utils/helpers'

export default class App extends Component {
  state = {
    decks: [],
  }

  getData = () => {
    initializeData()
    .then(results => {
      const data = JSON.parse(results)
      const decks = results ? Object.keys(data).map(key => (
        data[key]
      )) : []
      this.setState(() => ({
        decks
      }))
    })
  }

  componentDidMount() {
    setLocalNotification()

    this.getData()
  }

  render() {
    const { decks } = this.state
    const Stack = createStackNavigator()

    const Home = ({ navigation }) => {
      return (
            <View style={styles.container}>
              <DeckList decks={decks} navigation={navigation} viewDeck={(params) => navigation.navigate('Deck', params)}/>
            </View>
      )
    }

    const DeckView = ({ navigation, route }) => {
      const { id } = route.params
      const deck = decks.filter(deck => (deck.id === id))[0]
      const cards = deck ? deck.cards : []
      const name = deck ? deck.name : route.params.name
      const count = cards.length

      return (
        <View style={styles.container}>
          <ViewDeck id={id} deck={deck} cards={cards} name={name} count={count} navigation={navigation}/>
        </View>
      )
    }

    const QuizView = ({ navigation, route }) => {
      const { cards } = route.params.params
      return (
          <Quiz cards={cards} navigation={navigation} />
      )
    }

    const AddDeckView = ({ navigation }) => {
      return (
        <View style={styles.container}>
          <AddDeck navigation={navigation} update={this.getData} viewDeck={(params) => navigation.navigate('Deck', params)}/>
        </View>
      )
    }

    const AddCardView = ({ navigation, route }) => {
      return (
        <View style={styles.container}>
          <AddCard deckID={route.params} navigation={navigation} update={this.getData}/>
        </View>
      )
    }

     return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name='Deck' component={DeckView} />
          <Stack.Screen name='Quiz' component={QuizView} />
          <Stack.Screen name="Add a Deck" component={AddDeckView} />
          <Stack.Screen name="Add a Card" component={AddCardView} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
