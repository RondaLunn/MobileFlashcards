import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView, Button, StyleSheet, View } from 'react-native'

import { submitCard } from '../utils/api'
import { generateKey } from '../utils/helpers'

export default class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    handleChange = (text, name) => {
        this.setState(() => ({
            [name]: text
        }))
    }

    handleSubmit = () => {
        const { question, answer } = this.state
        if (question !== '' && answer !== '') {
            const key = generateKey()
            const { deckID } = this.props
            const card = {
                key,
                id: key,
                question, 
                answer,
                deckID
            }
            
            submitCard(card).then(() => {
                this.setState(() => ({
                input: ''
                }))
                this.props.update()
                this.props.navigation.goBack()
            })

            this.setState(() => ({
                question: '',
                answer: ''
            }))
        } else {
            alert('Please enter a question and an answer')
        }
    }

    render() {
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={styles.textContainer}>
                <Text style={styles.text}>Add a New Card</Text>
                <Text style={styles.text}>Question:</Text>
                <TextInput 
                name='question'
                value={question}
                placeholder="Question"
                onChangeText={text => this.handleChange(text, 'question')}
                />

                <Text style={styles.text}>Answer:</Text>
                <TextInput 
                name='answer'
                value={answer}
                placeholder='Answer'
                onChangeText={text => this.handleChange(text, 'answer')}
                />
                </View>

                <Button style={styles.button} title="Submit" onPress={this.handleSubmit} />
                <Button style={styles.button} title="Cancel" onPress={() => this.props.navigation.goBack()} />
                
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

