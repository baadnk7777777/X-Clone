const createTimestamp = (): Date => {
  const timestamp = new Date();
  return timestamp;
};

// CREATE Function.

export const createContent = async (userId: number, newContent: string) => {
  // Create function to create Content To firebase.
};

// READ Function.

export const readAllContent = async (): Promise<Content[]> => {
  // Create function to readAllContent from firebase.
};

// DELETE Function.

export const deleteContent = async (contentId: string) => {
  // Create function to delete Content in firebase.
};
