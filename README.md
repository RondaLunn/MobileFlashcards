# Mobile Flashcards Project

Mobile Flashcards is a React Native App for creating flashcards and taking quizzes on the content. The project was bootstrapped with create-react-native-app. 

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `expo start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
└── components
│   ├── AddCard.js # This is the code for adding a new flash card to a deck.
│   ├── AddDeck.js # This is the code for adding a new deck.
│   ├── App.js # This is the root of your app. 
│   ├── Deck.js # This is the component containing the rendering code for each deck. 
│   ├── DeckList.js # This is the component containing rendering the list of decks.
│   ├── Quiz.js # This is the component for taking a quiz with the existing cards.
|   |-- ViewDeck.js # This is the component for displaying an individual deck and the quiz and new card options.
└── utils
│   ├── api.js # This contains methods for saving data to local storage. 
│   ├── helpers.js # This contains an id gennerator for deck and card creation and setter for local notifications.
└── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app). 
