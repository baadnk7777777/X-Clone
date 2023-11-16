import { database, db } from 'boot/firebase';
import { get, query, ref, set } from 'firebase/database';
// import { getDatabase, onValue, ref } from 'firebase/database';

import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { Content } from 'src/data/models/contentModel';
import { onUnmounted } from 'vue';

const createTimestamp = (): Date => {
  const timestamp = new Date();
  return timestamp;
};

// CRUD

// CREATE Function.

export const createContent = async (userId: number, newContent: string) => {
  try {
    const timestampValue = createTimestamp();
    const colRef = collection(db, 'contents');
    const contentObject = {
      userId: userId,
      content: newContent,
      date: timestampValue,
      liked: false,
    };
    const docRef = await addDoc(colRef, contentObject);
    console.log('Document was created with ID:', docRef.id);
  } catch (error) {
    console.log('Failed to Create Content.' + error);
  }
};

// READ Function.

export const readAllContent = async (): Promise<Content[]> => {
  try {
    const colRef = collection(db, 'contents');
    const querySnapshot = await getDocs(colRef);
    const contentArray: Content[] = [];
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const contentData: Content = doc.data() as Content;
      contentArray.push(contentData);
    });
    const ascendingSortedContents = contentArray.slice().sort((a, b) => {
      return b.date.toMillis() - a.date.toMillis();
    });

    return ascendingSortedContents;
  } catch (error) {
    console.log('Error reading content:', error);
    return [];
  }
};

// UPDATE Function.

// DELETE Function.

const updateUserData = (snapshot: any) => {
  if (snapshot.exists()) {
    console.log('User data updated:', snapshot.val());
  } else {
    console.log('No user data found.');
  }
};
export const createUserRealtime = async (name: string) => {
  try {
    const usersRef = ref(database, 'users');
    await set(usersRef, {
      firstName: name,
      lastName: 'Doe',
      dob: '1990',
    });
    console.log('User data written successfully!');
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
export const readUserData = async () => {
  try {
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      const userData = snapshot.val();
      console.log('User data retrieved successfully:', userData);

      return userData;
    } else {
      console.log('No user data found.');
    }
  } catch (error) {
    console.error('Error reading user data:', error);
  }
};
