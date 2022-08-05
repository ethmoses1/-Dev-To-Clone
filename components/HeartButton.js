import { firestore, auth, increment } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

// Allows user to heart or like a post
export default function Heart({ postRef }) {
    const [count, setCount] = useState(0)
  // Listen to heart document for currently logged in user
  const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  // Create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });
    setCount(1)

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);
    setCount(0)

    await batch.commit();
  };

  return heartDoc?.exists > 0 ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>💗 Heart</button>
  );
}