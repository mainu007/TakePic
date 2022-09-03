import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import { Colors } from '../constants/Colors';

export default function ImageItem({id, imageUri, title}) {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate('ImageDetails', {id, title, imageUri});
  };

  return (
    <Pressable onPress={pressHandler} style={styles.container}>
      <Image source={{uri: imageUri}} style={styles.image}   indicator={ProgressBar} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '49%',
    height: 170,
    marginBottom: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  titleText: {
    paddingVertical: 2,
    color: Colors.primary50,
    textAlign: 'center',
    backgroundColor: '#00000021',
    fontWeight: 'bold',
  },
});
