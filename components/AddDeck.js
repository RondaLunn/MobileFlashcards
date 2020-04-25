import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView, Button, StyleSheet, View } from 'react-native'
import { submitDeck } from '../utils/api'
import { generateKey } from '../utils/helpers'

export default class AddDeck extends Component {
    state = {
        input: ''
    }

    handleChange = (input) => {
        this.setState(() => ({
            input
        }))
    }

    handleSubmit = () => {
        const name = this.state.input

        if (name !== '') {
            const key = generateKey()
            const deck = {
                key,
                id: key,
                name,
                cards: []
            }
        
            submitDeck(deck)
            .then(() => {
                this.setState(() => ({
                input: ''
                }))
                this.props.update()
            })
            .then(
                this.props.viewDeck({ id: key, name, count: 0 })
            )
        } else {
            alert('Please enter a deck name')
        }
    }

    render() {
        const { input } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={styles.textContainer}>
                <Text style={styles.text}>Name Your Deck</Text>
                <TextInput 
                value={input}
                onChangeText={this.handleChange}
                placeholder="Deck Name"
                />
                </View>
                <Button title="Create Deck" onPress={this.handleSubmit} />

                <Button title="Cancel" onPress={() => this.props.navigation.goBack()} />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
      },
    text: {
      fontSize: 20,
    }
  });