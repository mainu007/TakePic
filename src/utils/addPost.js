import firestore from '@react-native-firebase/firestore';

const addPost = async (data) => {
  await firestore()
    .collection('pictures')
    .add({...data, createdAt: firestore.FieldValue.serverTimestamp()});
  return true;
};

export default addPost;
