import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/Colors';
import IconButton from './IconButton';

export default function TakePhoto({imageUri, onOpenCamera}) {
  return (
    <View style={styles.takeContainer}>
      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.image} />
      ) : (
        <>
          <View style={styles.iconContainer}>
            <IconButton
              Icon={MaterialCommunityIcons}
              name="camera-plus-outline"
              size={70}
              color={Colors.primary200}
              onPress={onOpenCamera}
            />
          </View>
          <Text style={styles.iconText}>Take a photo</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: 'center',
  },
  iconText: {
    color: Colors.primary200,
    fontSize: 16,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  takeContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.gray600,
    borderRadius: 6,
    height: 300,
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
    width: '100%',
  },
});
