import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';
import ButtonOutline from '../components/ButtonOutline';
import { Colors } from '../constants/Colors';

export default function ImageDetails({route, navigation}) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(true);
  const {id, title, imageUri} = route.params;

  const deleteHandler = () => {
    Alert.alert('Delete image', 'Are you sure?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deletePost(id)},
    ]);
  };

  const deletePost = (postId) => {
    setDeleteLoading(true);
    setDeleteButtonVisible(false);

    firestore()
      .collection('pictures')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
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
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('pictures')
      .doc(postId)
      .delete()
      .then(() => {
        setDeleteLoading(false);
        Alert.alert(
          'Image deleted!',
          'Your image has been deleted successfully!',
          [{text: 'Ok', onPress: () => navigation.navigate('Home')}],
        );
      })
      .catch((e) => {
        setDeleteButtonVisible(true);
        console.log('Error deleting image.', e);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text> 
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUri}} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        {deleteLoading && <ActivityIndicator size="large" color={Colors.primary200} />}{deleteButtonVisible && <ButtonOutline onPress={deleteHandler} color="red" title="Remove" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    color: Colors.primary200,
    paddingVertical: 16,
  },
  imageContainer: {
    height: 300,
    marginBottom: 16,
  },
  image: {
    borderRadius: 4,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {},
});
