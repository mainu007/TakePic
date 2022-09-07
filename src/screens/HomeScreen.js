import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import ImageList from '../components/ImageList';
import {Colors} from '../constants/Colors';
import {setAllPosts} from '../app/postSlice';

export default function Home() {
  const posts = useSelector(({post}) => post.allPosts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // const isFocused = useIsFocused();

  const fetchAllPosts = useCallback(() => {
    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        const dataModify = [];
        querySnapshot.forEach(documentSnapshot => {
          const {title, imageUri, createdAt} = documentSnapshot.data();
          dataModify.push({
            id: documentSnapshot.id,
            title,
            imageUri,
          });
        });
        setLoading(false);
        dispatch(setAllPosts(dataModify));
      });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    fetchAllPosts();
  }, [fetchAllPosts]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color={Colors.primary200} />
        </View>
      ) : (
        <ImageList data={posts} />
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
