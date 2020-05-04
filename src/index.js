import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';
import * as serviceWorker from './serviceWorker';
import './index.css'

const firebaseConfig = {
	apiKey: "AIzaSyAbxWCNCtF7lm-fmwg00zbAY11aMWPomz0",
	authDomain: "unpacked-dev.firebaseapp.com",
	databaseURL: "https://unpacked-dev.firebaseio.com",
	projectId: "unpacked-dev",
	storageBucket: "unpacked-dev.appspot.com",
	messagingSenderId: "1063122406998",
	appId: "1:1063122406998:web:615fd045afd6407f"
};
firebase.initializeApp(firebaseConfig)
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
