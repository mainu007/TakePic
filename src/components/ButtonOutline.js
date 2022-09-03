import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../constants/Colors';

export default function ButtonOutline({title, onPress, disabled, color}) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        disabled && styles.buttonDisabled,
        pressed && styles.pressed,
        color && {borderColor: color},
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <AntDesign name="save" size={24} color={color || Colors.primary700} />
      <Text style={[styles.text, color && {color: color}]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonDisabled: {
    opacity: 0.2,
  },
  container: {
    alignItems: 'center',
    borderColor: Colors.primary700,
    borderRadius: 4,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: Colors.gray800,
  },
  text: {
    color: Colors.primary700,
    fontSize: 16,
    marginLeft: 4,
    paddingVertical: 8,
    textAlign: 'center',
  },
});
