import firestore from '@react-native-firebase/firestore';

const postData = async data => {
  const result = await firestore()
    .collection('posts')
    .add({...data, createdAt: firestore.FieldValue.serverTimestamp()});
  return {id: result.id, ...data};
};

export default postData;
