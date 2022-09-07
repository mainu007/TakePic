import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, Image, Modal, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {deletePost} from '../app/postSlice';
import ButtonOutline from '../components/ButtonOutline';
import {Colors} from '../constants/Colors';

export default function ImageDetails({route, navigation}) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {id, title, imageUri} = route.params;
  const dispatch = useDispatch();

  const deleteHandler = () => {
    Alert.alert('Delete image', 'Are you sure?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deleteData(id)},
    ]);
  };

  const deleteData = postId => {
    setDeleteLoading(true);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {imageUri: dbImageUri} = documentSnapshot.data();

          if (dbImageUri != null) {
            const storageRef = storage().refFromURL(dbImageUri);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${dbImageUri} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        dispatch(deletePost(postId));
        Alert.alert('Image deleted!', 'Your image has been deleted successfully!', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      })
      .catch(e => {
        console.log('Error deleting image.', e);
      });
  };

  return (
    <View style={[styles.container, {opacity: deleteLoading ? 0.25 : 1}]}>
      <Modal visible={deleteLoading} transparent={true}>
        <View style={styles.modelContainer}>
          <ActivityIndicator size="large" color={Colors.primary200} />
        </View>
      </Modal>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUri}} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonOutline onPress={deleteHandler} color="red" title="Remove" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  modelContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    color: Colors.primary200,
    paddingVertical: 16,
  },
  imageContainer: {
    height: 320,
    marginBottom: 16,
  },
  image: {
    borderRadius: 4,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {},
});
