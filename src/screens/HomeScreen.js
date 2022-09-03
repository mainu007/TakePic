import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ImageList from '../components/ImageList';
import { Colors } from '../constants/Colors';

export default function Home() {
  const [docs, setDocs] = useState();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection('pictures')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        const dataModify = [];
        querySnapshot.forEach((documentSnapshot) => {
          const {title, imageUri, createdAt} = documentSnapshot.data();
          dataModify.push({
            id: documentSnapshot.id,
            title,
            imageUri,
            createdAt,
          });
        });
        setLoading(false);
        setDocs([...dataModify]);
      });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color={Colors.primary200} />
        </View>
      ) : (
        <ImageList data={docs} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
