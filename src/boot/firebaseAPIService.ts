import { database, db } from 'boot/firebase';
import { get, onValue, ref, set } from 'firebase/database';
// import { getDatabase, onValue, ref } from 'firebase/database';

import { addDoc, collection } from 'firebase/firestore';
export const setupRealtimeListener = () => {
  const usersRef = ref(database, 'users');
  onValue(usersRef, updateUserData);
};

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

export const createUser = async () => {
  // 'users' collection reference
  const colRef = collection(db, 'users');

  // data to send
  const dataObj = {
    firstName: 'John2',
    lastName: 'Doe',
    dob: '1990',
  };

  // create document and return reference to it
  const docRef = await addDoc(colRef, dataObj);

  // access auto-generated ID with '.id'
  console.log('Document was created with ID:', docRef.id);
};
// export const fetchUsers = async () => {
//   try {
//     try {
//       // // console.log(database);
//       // const countRef = ref(database, 'users');
//       // // console.log(countRef);

//       // onValue(countRef, (snapshot) => {
//       //   console.log('snapshot' + snapshot);
//       //   const data = snapshot.val();
//       //   console.log(data);
//       // });
//       const database = getDatabase(firebaseApp);
//       const itemsRef = ref(database, 'users');
//       onValue(itemsRef, (snapshot) => {
//         const data = snapshot.val();
//         const itemList = [];
//         console.log(data);
//         // for (let key in data) {
//         //   itemList.push({ id: key, name: data[key].name });
//         // }
//       });
//     } catch (error) {
//       // Handle database error
//       console.error('Error fetching users:', error);
//     }
//   } catch (error) {
//     // Handle database error
//     console.error('Error fetching users:', error);
//   }
// };
