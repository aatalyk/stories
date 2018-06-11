import * as firebase from 'firebase'
import * as constants from './constants'

const config = {
    apiKey: constants.FIREBASE_API_KEY,
    authDomain: constants.FIREBASE_AUTH_DOMAIN,
    databaseURL: constants.FIREBASE_DATABASE_URL,
    projectId: constants.FIREBASE_PROJECT_ID,
    storageBucket: constants.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: constants.FIREBASE_MESSAGING_SENDER_ID,
}

firebase.initializeApp(config)

export const database = firebase.database()