import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constants/Colors';
import ImageItem from './ImageItem';

export default function ImageList({data}) {
  if (!data || data?.length <= 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No image added yet - start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={data}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      keyExtractor={({id}) => id}
      renderItem={({item}) => (
        <ImageItem imageUri={item.imageUri} title={item.title} id={item.id} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  fallbackText: {
    color: Colors.gray700,
    fontSize: 16,
  },
});
