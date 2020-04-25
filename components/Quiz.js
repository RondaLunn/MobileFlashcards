import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

export default class Quiz extends Component {
    state = {
        remaining: 0,
        score: 0
    }

    reset = () => {
        const { cards } = this.props

        this.setState(() => ({
            remaining: cards.length,
            score: 0
        }))
        this.props.navigation.navigate('Quiz')
    }

    handleCorrect = () => {
        const remaining = this.state.remaining - 1
        const score = this.state.score + 1
        const { cards } = this.props
        const index = cards.length - remaining
        this.setState(() => ({
            remaining,
            score
        }))
        if (remaining > 0) {
        this.props.navigation.navigate(cards[index].question)
        }
    }

    handleIncorrect = () => {
        const remaining = this.state.remaining - 1
        const { cards } = this.props
        const index = cards.length - remaining
        this.setState(() => ({
            remaining
        }))
        if (remaining > 0 ){
        this.props.navigation.navigate(cards[index].question)
        }
    }

    componentDidMount() {
        const { cards } = this.props

        this.setState(() => ({
            remaining: cards.length
        }))
    }

    render() {
        const { cards } = this.props
        const Stack = createStackNavigator()

        const Question = (props) => {
            return(
                <View style ={styles.container}>
                    <Text style={styles.text}>{props.card.question}</Text>
                    <Button title="Show Answer" onPress={() => this.props.navigation.navigate(cards[props.index].answer)} />
                </View>
            )
        }

        const Answer = (props) => {
            return (
                <View style ={styles.container}>
                    <Text style={styles.text}>{props.card.answer}</Text>
                    <Text style={styles.text}>Did you answer correctly?</Text>
                    <Button title="Correct" onPress={this.handleCorrect} />
                    <Button title="Incorrect" onPress={this.handleIncorrect} />
                </View>
            )
        }

        const Quiz = () => {
            const index = this.props.cards.length - this.state.remaining
            const card = this.props.cards[index]
            return (
            <View style={styles.container}>
                <Question key={card.id} card={card} index={index}/>
                <Text style={styles.text}>Questions left: {this.state.remaining}</Text>
            </View>
            )
        }

        const QuizAnswer = () => {
            const index = this.props.cards.length - this.state.remaining
            const card = this.props.cards[index]
            return (
            <View style={styles.container}>
                <Answer key={card.id} card={card} index={index}/>
                <Text style={styles.text}>Questions left: {this.state.remaining}</Text>
            </View>
            )
        }

        const Results = () => {
            clearLocalNotification()
            .then(setLocalNotification())
            
            return (
            <View style={styles.container}>
                <Text style={styles.text}>You got {this.state.score} out of {cards.length} correct</Text>

                <Button title="Start Over" onPress={this.reset} />

                <Button title="Back to Deck" onPress={() => this.props.navigation.goBack()} />
            </View>
            )
        }

        if (this.state.remaining === 0) {
            return <Results />
        }

        return (
                <Stack.Navigator>
                    {cards.map(card => (
                        <Fragment key={card.id}>
                            <Stack.Screen name={card.question} component={Quiz} params={cards} />
                            <Stack.Screen name={card.answer} component={QuizAnswer} />
                        </Fragment>
                    ))}
                </Stack.Navigator>
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