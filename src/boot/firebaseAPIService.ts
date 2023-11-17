import { db } from 'boot/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { Content } from 'src/data/models/contentModel';

const createTimestamp = (): Date => {
  const timestamp = new Date();
  return timestamp;
};

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
      contentData.documentId = doc.id;
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

// DELETE Function.

export const deleteContent = async (contentId: string) => {
  try {
    const colRef = collection(db, 'contents');
    const docRef = doc(colRef, contentId);

    await deleteDoc(docRef);
    console.log('Document was deleted successfully.');
  } catch (error) {
    console.log('Failed to delete content. Error:', error);
  }
};
