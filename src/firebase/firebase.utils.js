import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBswXNahyydOz-6i9GVmgPlPlDk79KSJ-w',
  authDomain: 'koftov-store.firebaseapp.com',
  databaseURL: 'https://koftov-store.firebaseio.com',
  projectId: 'koftov-store',
  storageBucket: 'koftov-store.appspot.com',
  messagingSenderId: '408790990039',
  appId: '1:408790990039:web:33f16427e755399c91c492',
  measurementId: 'G-806MMM0FKP'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
