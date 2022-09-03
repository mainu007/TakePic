import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Colors} from '../constants/Colors';

export default function TitleInput({title, setTitle}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Please enter title"
        placeholderTextColor="#666666"
        value={title}
        onChangeText={setTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    backgroundColor: Colors.primary100,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    borderRadius: 4,
    fontSize: 16,
    marginVertical: 12,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
});
