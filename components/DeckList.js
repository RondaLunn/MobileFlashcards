import React, { Component } from 'react';
import { FlatList, View, Text, Button } from 'react-native';

import Deck from './Deck'

export default class DeckList extends Component {

render() {
    const { decks } = this.props
    const count = decks.length
    return (
      <View>
        <Button title="Add a Deck" onPress={() => this.props.navigation.navigate('Add a Deck')} />
        {count > 0
        ?  <FlatList 
          data={decks}
          renderItem={({ item }) => <Deck name={item.name} count={item.cards.length} id={item.id} viewDeck={this.props.viewDeck}/>}
          />
          : <Text>You do not have any decks.</Text>}

        </View>
          )
  }
}
