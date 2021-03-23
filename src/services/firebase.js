import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB_gNM-Sq_N1WT-codtDE_WtOBg0q3GIZ0",
    authDomain: "tweeter-19786.firebaseapp.com",
    databaseURL: "https://tweeter-19786-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();