import storage from '@react-native-firebase/storage';

export default async function uploadFile({
  path,
  type,
  setTransferred,
}) {
  let imageUri;
  const random = parseInt(Date.now() * Math.random(), 10);
  const reference = storage().ref(`images/${random}`);
  const task = reference.putFile(path);

  setTransferred(0);

  task.on('state_changed', (taskSnapshot) => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );

    const progress = Math.round(
      taskSnapshot.bytesTransferred / (taskSnapshot.totalBytes / 100),
    );

    setTransferred(progress);
  });

  try {
    await task;
    console.log('Image uploaded to the bucket!');
    const url = await storage().ref(reference.path).getDownloadURL();
    imageUri = url;
  } catch (error) {
    console.log(error);
  }
  return imageUri;
}
