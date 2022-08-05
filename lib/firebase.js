import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDqgpe3z_HrU8oWQIw3i10YGxkfPhc-c4U",
  authDomain: "next-fire-900d9.firebaseapp.com",
  projectId: "next-fire-900d9",
  storageBucket: "next-fire-900d9.appspot.com",
  messagingSenderId: "199252423985",
  appId: "1:199252423985:web:178a9ca71298afde6f6c10",
};

// Initialize Firebase
// if (typeof window !== 'undefined' && !firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment


export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}


