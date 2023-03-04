import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsvmNlI9E2Q2Nd6AKyt9R9Qu4Br5rcnvE",
    authDomain: "nextjs-todo-4714d.firebaseapp.com",
    projectId: "nextjs-todo-4714d",
    storageBucket: "nextjs-todo-4714d.appspot.com",
    messagingSenderId: "788797435161",
    appId: "1:788797435161:web:ebd7529d30e4306ecbe988"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)