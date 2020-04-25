import { AsyncStorage } from 'react-native' 

const FLASHCARD_STORAGE_KEY = 'MobileFlashcards:deck'

export function submitDeck(deck) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deck.key]: deck
    }))
}

export function submitCard(card) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(results => {
        const deckID = card.deckID
        const data = JSON.parse(results)
        data[deckID].cards.push(card)
        AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
}

export function removeDeck(key) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(results => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
        })
}

export function initializeData() {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
}